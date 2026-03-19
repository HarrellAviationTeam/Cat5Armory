/**
 * Cat-5 Armory - Products Netlify Function
 * Proxies product requests to configured wholesaler APIs.
 * API keys are stored in Netlify environment variables (never in client code).
 *
 * POST /.netlify/functions/products
 * Body: { category, brand, caliber, featured, deals, search, limit, sort, page }
 *
 * To add a wholesaler API key:
 *   Netlify Dashboard > Site Settings > Environment Variables > Add variable
 */

const https = require('https');

// ===== WHOLESALER ADAPTERS =====
// Each adapter fetches and normalizes products from one wholesaler.

async function fetchSportsSouth(params) {
  const apiKey = process.env.SPORTS_SOUTH_API_KEY;
  const accountId = process.env.SPORTS_SOUTH_ACCOUNT_ID;
  if (!apiKey || !accountId) return null;

  // Sports South API: https://www.sportssouth.biz/api
  // This is a placeholder — implement with actual Sports South API docs
  const url = `https://www.sportssouth.biz/api/v1/items?apikey=${apiKey}&account=${accountId}&department=${params.category || ''}&limit=${params.limit || 20}`;
  const raw = await httpGet(url, { 'Authorization': `Bearer ${apiKey}` });
  if (!raw) return null;

  const data = JSON.parse(raw);
  return (data.items || data || []).map(item => normalizeProduct(item, {
    id: item.ItemNumber,
    sku: item.ItemNumber,
    upc: item.UPC,
    name: item.Description,
    brand: item.Manufacturer,
    price: parseFloat(item.DealerCost),
    retailPrice: parseFloat(item.MSRP),
    qty: parseInt(item.Quantity),
    category: mapCategory(item.Category),
    description: item.FullDescription || '',
    image: item.ImageURL || null,
  }, 'Sports South'));
}

async function fetchRSRGroup(params) {
  const username = process.env.RSR_USERNAME;
  const password = process.env.RSR_PASSWORD;
  if (!username || !password) return null;

  // RSR Group uses FTP/file-based system or REST API depending on account type
  // Implement with RSR's actual API documentation
  const auth = Buffer.from(`${username}:${password}`).toString('base64');
  const url = `https://www.rsrgroup.com/api/products?category=${params.category || ''}&limit=${params.limit || 20}`;
  const raw = await httpGet(url, { 'Authorization': `Basic ${auth}` });
  if (!raw) return null;

  const data = JSON.parse(raw);
  return (data.products || data || []).map(item => normalizeProduct(item, {
    id: item.itemNo,
    sku: item.itemNo,
    upc: item.upc,
    name: item.description,
    brand: item.manufacturer,
    price: parseFloat(item.dealerCost),
    retailPrice: parseFloat(item.msrp),
    qty: parseInt(item.qty),
    category: mapCategory(item.category),
    description: item.longDescription || '',
    image: item.imageUrl || null,
  }, 'RSR Group'));
}

async function fetchDavidsons(params) {
  const apiKey = process.env.DAVIDSONS_API_KEY;
  const account = process.env.DAVIDSONS_ACCOUNT;
  if (!apiKey || !account) return null;

  const url = `https://www.davidsonsinc.com/api/v2/products?apiKey=${apiKey}&account=${account}&category=${params.category || ''}`;
  const raw = await httpGet(url, { 'X-API-Key': apiKey });
  if (!raw) return null;

  const data = JSON.parse(raw);
  return (data.Products || data || []).map(item => normalizeProduct(item, {
    id: item.StyleID || item.PartNumber,
    sku: item.PartNumber,
    upc: item.UPC,
    name: item.ProductName,
    brand: item.Brand,
    price: parseFloat(item.PricingInfo?.YourCost || 0),
    retailPrice: parseFloat(item.PricingInfo?.SuggestedRetail || 0),
    qty: parseInt(item.InventoryInfo?.Available || 0),
    category: mapCategory(item.CategoryName),
    description: item.ProductDescription || '',
    image: item.PrimaryImageURL || null,
  }, "Davidson's"));
}

async function fetchLipseys(params) {
  const username = process.env.LIPSEYS_USERNAME;
  const password = process.env.LIPSEYS_PASSWORD;
  if (!username || !password) return null;

  const authRes = await httpPost('https://api.lipseysgun.com/api/token', {
    Username: username, Password: password
  });
  if (!authRes) return null;

  const token = JSON.parse(authRes).access_token;
  const url = `https://api.lipseysgun.com/api/inventory?category=${params.category || ''}&limit=${params.limit || 20}`;
  const raw = await httpGet(url, { 'Authorization': `Bearer ${token}` });
  if (!raw) return null;

  const data = JSON.parse(raw);
  return (data || []).map(item => normalizeProduct(item, {
    id: item.id,
    sku: item.sku,
    upc: item.upc,
    name: item.description,
    brand: item.manufacturer,
    price: parseFloat(item.price),
    retailPrice: parseFloat(item.msrp),
    qty: parseInt(item.qtyOnHand),
    category: mapCategory(item.categoryCode),
    description: item.longDescription || '',
    image: item.imageUrl || null,
  }, "Lipsey's"));
}

async function fetchZanders(params) {
  const apiKey = process.env.ZANDERS_API_KEY;
  if (!apiKey) return null;

  const url = `https://www.zapcsports.com/api/v1/catalog?apiKey=${apiKey}&category=${params.category || ''}&limit=${params.limit || 20}`;
  const raw = await httpGet(url, {});
  if (!raw) return null;

  const data = JSON.parse(raw);
  return (data.items || data || []).map(item => normalizeProduct(item, {
    id: item.itemNumber,
    sku: item.itemNumber,
    upc: item.upc,
    name: item.description,
    brand: item.manufacturer,
    price: parseFloat(item.dealerCost),
    retailPrice: parseFloat(item.msrp),
    qty: parseInt(item.available),
    category: mapCategory(item.category),
    description: item.longDescription || '',
    image: item.imageUrl || null,
  }, 'Zanders'));
}

// ===== NORMALIZATION =====
function normalizeProduct(raw, mapped, source) {
  return {
    id: mapped.id || 'unknown',
    sku: mapped.sku || '',
    upc: mapped.upc || '',
    name: mapped.name || 'Unknown Product',
    brand: mapped.brand || '',
    price: mapped.price || 0,
    retailPrice: mapped.retailPrice || null,
    inStock: (mapped.qty || 0) > 0,
    qty: mapped.qty || 0,
    category: mapped.category || 'accessories',
    description: mapped.description || '',
    image: mapped.image || null,
    specs: mapped.specs || {},
    source: source,
    caliber: extractCaliber(mapped.name || ''),
  };
}

function extractCaliber(name) {
  const calibers = ['9mm', '.45 ACP', '.40 S&W', '.380 ACP', '.357 Mag', '.44 Mag', '10mm', '5.56 NATO', '7.62x39', '.308', '6.5 Creedmoor', '300 Blackout', '.22 LR', '12 Gauge', '20 Gauge'];
  return calibers.find(c => name.includes(c)) || null;
}

const CATEGORY_MAP = {
  'HANDGUN': 'handguns', 'PISTOL': 'handguns', 'REVOLVER': 'handguns',
  'Handguns': 'handguns', 'Pistols': 'handguns', 'Revolvers': 'handguns',
  'RIFLE': 'rifles', 'Rifles': 'rifles', 'Long Guns': 'rifles', 'LONG GUN': 'rifles',
  'SHOTGUN': 'shotguns', 'Shotguns': 'shotguns',
  'AMMO': 'ammunition', 'AMMUNITION': 'ammunition', 'Ammunition': 'ammunition',
  'OPTICS': 'optics', 'Optics': 'optics',
  'ACCESSORY': 'accessories', 'ACCESSORIES': 'accessories', 'Accessories': 'accessories',
  'MAGAZINE': 'magazines', 'Magazines': 'magazines',
};

function mapCategory(raw) {
  if (!raw) return 'accessories';
  return CATEGORY_MAP[raw] || CATEGORY_MAP[raw.toUpperCase()] || 'accessories';
}

// ===== HTTP HELPERS =====
function httpGet(url, headers) {
  return new Promise((resolve) => {
    const opts = { ...new URL(url), headers: { 'User-Agent': 'Cat5Armory/1.0', ...headers } };
    const req = https.request(opts, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) resolve(data);
        else resolve(null);
      });
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
    req.end();
  });
}

function httpPost(url, body) {
  return new Promise((resolve) => {
    const data = JSON.stringify(body);
    const opts = { ...new URL(url), method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data), 'User-Agent': 'Cat5Armory/1.0' } };
    const req = https.request(opts, res => {
      let out = '';
      res.on('data', chunk => out += chunk);
      res.on('end', () => resolve(out));
    });
    req.on('error', () => resolve(null));
    req.setTimeout(8000, () => { req.destroy(); resolve(null); });
    req.write(data);
    req.end();
  });
}

// ===== HANDLER =====
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  let params = {};
  try { params = JSON.parse(event.body || '{}'); } catch { params = {}; }

  const limit = parseInt(params.limit) || 20;

  // Try each enabled wholesaler in order
  const fetchers = [
    { fn: fetchSportsSouth, key: 'SPORTS_SOUTH_API_KEY', name: 'Sports South' },
    { fn: fetchRSRGroup, key: 'RSR_USERNAME', name: 'RSR Group' },
    { fn: fetchDavidsons, key: 'DAVIDSONS_API_KEY', name: "Davidson's" },
    { fn: fetchLipseys, key: 'LIPSEYS_USERNAME', name: "Lipsey's" },
    { fn: fetchZanders, key: 'ZANDERS_API_KEY', name: 'Zanders' },
  ];

  for (const { fn, key, name } of fetchers) {
    if (!process.env[key]) continue;
    try {
      const products = await fn(params);
      if (products && products.length > 0) {
        // Apply filters
        let filtered = products;
        if (params.category) filtered = filtered.filter(p => p.category === params.category);
        if (params.brand) filtered = filtered.filter(p => p.brand.toLowerCase().includes(params.brand.toLowerCase()));
        if (params.search) {
          const q = params.search.toLowerCase();
          filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
        }
        if (params.inStock) filtered = filtered.filter(p => p.inStock);

        return {
          statusCode: 200,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ products: filtered.slice(0, limit), wholesaler: name, total: filtered.length })
        };
      }
    } catch (err) {
      console.error(`Error fetching from ${name}:`, err.message);
    }
  }

  // No wholesalers configured — return empty to trigger frontend demo fallback
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ products: [], wholesaler: null, message: 'No wholesalers configured. Add API keys to Netlify environment variables.' })
  };
};
