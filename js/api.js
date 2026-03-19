/**
 * Cat-5 Armory - Wholesaler API Client
 * Fetches products from Netlify Functions which proxy to configured wholesalers.
 * Falls back to demo data when no API keys are configured.
 */

const API = (() => {

  // Demo product data (shown when no wholesaler APIs are configured)
  const DEMO_PRODUCTS = [
    { id:'d1', sku:'GLK-G17G5', upc:'764503037573', name:'Glock 17 Gen5 9mm Pistol – 17+1 Round', brand:'Glock', category:'handguns', price:599.99, image:'assets/handguns.jpeg', inStock:true, qty:5, featured:true, caliber:'9mm', description:'The Glock 17 Gen5 features the MARKSMAN BARREL, front slide serrations, and ambidextrous slide stop lever.', specs:{ Caliber:'9mm', Capacity:'17+1', 'Barrel Length':'4.49"', Weight:'24.69 oz', Action:'Safe Action' } },
    { id:'d2', sku:'SIG-P320-CA', upc:'798681538423', name:'Sig Sauer P320 Compact 9mm – 15+1', brand:'Sig Sauer', category:'handguns', price:679.99, salePrice:629.99, image:'assets/handguns.jpeg', inStock:true, qty:3, featured:true, caliber:'9mm', description:'The P320 COMPACT features a modular design allowing it to be converted to any caliber.', specs:{ Caliber:'9mm', Capacity:'15+1', 'Barrel Length':'3.9"', Weight:'25.8 oz', Action:'Striker-Fired' } },
    { id:'d3', sku:'SW-MP9-2-0', upc:'022188869200', name:'Smith & Wesson M&P9 M2.0 Compact 9mm', brand:'Smith & Wesson', category:'handguns', price:569.99, image:'assets/handguns.jpeg', inStock:true, qty:7, featured:false, caliber:'9mm', description:'Features an Armornite-finished stainless steel barrel and improved trigger.', specs:{ Caliber:'9mm', Capacity:'15+1', 'Barrel Length':'4.0"', Weight:'26.6 oz', Action:'Striker-Fired' } },
    { id:'d4', sku:'SPR-HELLCAT', upc:'706397929848', name:'Springfield Armory Hellcat RDP 9mm', brand:'Springfield Armory', category:'handguns', price:699.99, image:'assets/handguns.jpeg', inStock:false, qty:0, featured:true, caliber:'9mm', description:'Optic-ready micro-compact with HEX Wasp red dot optic included.', specs:{ Caliber:'9mm', Capacity:'13+1', 'Barrel Length':'3.8"', Weight:'18.3 oz', Action:'Striker-Fired' } },
    { id:'d5', sku:'PSA-AR15-16', upc:'123456789001', name:'PSA 16" Mid-Length Nitride Rifle – 5.56', brand:'Palmetto State', category:'rifles', price:549.99, image:'assets/rifles.jpg', inStock:true, qty:2, featured:true, caliber:'5.56/.223', description:'PSA 16" carbine featuring a mid-length gas system and nitride-treated barrel.', specs:{ Caliber:'5.56 NATO', 'Barrel Length':'16"', Weight:'6.5 lbs', 'Gas System':'Mid-Length', Action:'Semi-Auto' } },
    { id:'d6', sku:'DD-MK18-9', upc:'847013000234', name:'Daniel Defense DDM4 MK18 5.56mm', brand:'Daniel Defense', category:'rifles', price:1849.99, image:'assets/rifles.jpg', inStock:true, qty:1, featured:true, caliber:'5.56/.223', description:'The MK18 features Daniel Defense Slim Rail Mk18, a 10.3" government-profile barrel.', specs:{ Caliber:'5.56 NATO', 'Barrel Length':'10.3"', Weight:'5.9 lbs', 'Gas System':'Pistol', Action:'Semi-Auto' } },
    { id:'d7', sku:'REM-870-12', upc:'047700254746', name:'Remington 870 Express 12 Gauge Shotgun', brand:'Remington', category:'shotguns', price:429.99, image:'assets/shotguns.jpg', inStock:true, qty:4, featured:false, caliber:'12 Gauge', description:'The 870 Express features a twin action bars for smooth, reliable action.', specs:{ Caliber:'12 Gauge', Capacity:'4+1', 'Barrel Length':'28"', Weight:'7.5 lbs', Action:'Pump' } },
    { id:'d8', sku:'MOSS-500-12', upc:'015813001007', name:'Mossberg 500 ATI Tactical 12 Gauge', brand:'Mossberg', category:'shotguns', price:489.99, image:'assets/shotguns.jpg', inStock:true, qty:3, featured:false, caliber:'12 Gauge', description:'Features a fully adjustable, collapsible buttstock.', specs:{ Caliber:'12 Gauge', Capacity:'5+1', 'Barrel Length':'18.5"', Weight:'7.0 lbs', Action:'Pump' } },
    { id:'d9', sku:'FED-9MM-50', upc:'604544600520', name:'Federal American Eagle 9mm 115gr FMJ – 50 Rounds', brand:'Federal', category:'ammunition', price:19.99, image:'assets/ammunition.jpg', inStock:true, qty:200, featured:true, caliber:'9mm', description:'American Eagle 9mm 115gr Full Metal Jacket ammunition.', specs:{ Caliber:'9mm', 'Bullet Weight':'115gr', 'Bullet Type':'FMJ', 'Muzzle Velocity':'1180 fps', Rounds:'50' } },
    { id:'d10', sku:'WIN-45-50', upc:'020892202276', name:'Winchester USA .45 ACP 230gr FMJ – 50 Rounds', brand:'Winchester', category:'ammunition', price:26.99, image:'assets/ammunition.jpg', inStock:true, qty:150, featured:false, caliber:'.45 ACP', description:'Winchester USA .45 ACP 230 grain Full Metal Jacket.', specs:{ Caliber:'.45 ACP', 'Bullet Weight':'230gr', 'Bullet Type':'FMJ', 'Muzzle Velocity':'830 fps', Rounds:'50' } },
    { id:'d11', sku:'HRNDY-223-20', upc:'090255482614', name:'Hornady SUPERFORMANCE 5.56 NATO 55gr – 20 Rounds', brand:'Hornady', category:'ammunition', price:21.99, image:'assets/ammunition.jpg', inStock:true, qty:80, featured:true, caliber:'5.56/.223', description:'Superformance ammunition delivers 100-200 fps faster muzzle velocities.', specs:{ Caliber:'5.56 NATO', 'Bullet Weight':'55gr', 'Bullet Type':'GMX', 'Muzzle Velocity':'3240 fps', Rounds:'20' } },
    { id:'d12', sku:'EOT-EXPS3-0', upc:'672294600302', name:'EOTech EXPS3-0 Holographic Weapon Sight', brand:'EOTech', category:'optics', price:649.99, image:'assets/optics.jpg', inStock:true, qty:2, featured:true, caliber:null, description:'The EXPS3 uses a single 123 Lithium battery and features side-button controls.', specs:{ Reticle:'68MOA Circle/1MOA Dot', Battery:'CR123', 'Eye Relief':'Unlimited', Mount:'QD Lever', Weight:'11.2 oz' } },
    { id:'d13', sku:'LEUP-VX3HD', upc:'030317025862', name:'Leupold VX-3HD 3.5-10x40mm Rifle Scope', brand:'Leupold', category:'optics', price:599.99, salePrice:499.99, image:'assets/optics.jpg', inStock:true, qty:3, featured:false, caliber:null, description:'Twilight Max HD Light Management System delivers exceptional low-light performance.', specs:{ Magnification:'3.5-10x', 'Objective Lens':'40mm', Reticle:'Duplex', 'Eye Relief':'4.0"', Finish:'Matte Black' } },
    { id:'d14', sku:'MAG-PMAG-30', upc:'873750000086', name:'Magpul PMAG 30 AR/M4 Gen M3 – 30 Round', brand:'Magpul', category:'accessories', price:14.99, image:'assets/accessories.png', inStock:true, qty:50, featured:false, caliber:'5.56/.223', description:'The M3 PMAG features a constant-curve body that improves feeding.', specs:{ Caliber:'5.56 NATO', Capacity:'30 Rounds', Material:'Polymer', Compatible:'AR-15/M4' } },
    { id:'d15', sku:'SBR-CQC-7378', upc:'798304529552', name:'Safariland 7378 ALS Paddle Holster – Glock 17', brand:'Safariland', category:'accessories', price:69.99, image:'assets/accessories.png', inStock:true, qty:8, featured:false, caliber:null, description:'The 7378 features the ALS Automatic Locking System for secure retention.', specs:{ 'Fits':'Glock 17/22', Retention:'Level I', Draw:'ALS Push-Down', Hand:'Right Hand' } },
    { id:'d16', sku:'SUREFIRE-X300', upc:'084871319429', name:'Surefire X300U-B Ultra Scout Light – 1000 Lumens', brand:'Surefire', category:'accessories', price:319.99, image:'assets/accessories.png', inStock:true, qty:4, featured:true, caliber:null, description:'Produces a powerful 1,000-lumen beam that devastates threats and preserves the user\'s night vision.', specs:{ Output:'1000 Lumens', 'Runtime':'1.5 hrs', Battery:'2x CR123A', Mount:'Universal Rail', Weight:'4.2 oz' } },
  ];

  function getCategoryImage(cat) {
    const map = { handguns:'assets/handguns.jpeg', rifles:'assets/rifles.jpg', shotguns:'assets/shotguns.jpg', ammunition:'assets/ammunition.jpg', optics:'assets/optics.jpg', accessories:'assets/accessories.png' };
    return map[cat] || 'assets/accessories.png';
  }

  async function getProducts(params = {}) {
    try {
      // Try Netlify Function first
      const res = await fetch('/.netlify/functions/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.products && data.products.length > 0) {
          data.products._source = 'live';
          data.products._wholesaler = data.wholesaler;
          return data.products;
        }
      }
    } catch (e) {
      // Netlify function not available – use demo data
    }
    return filterDemoProducts(params);
  }

  function filterDemoProducts(params) {
    let results = [...DEMO_PRODUCTS];
    if (params.category) results = results.filter(p => p.category === params.category);
    if (params.brand) results = results.filter(p => p.brand.toLowerCase().includes(params.brand.toLowerCase()));
    if (params.caliber) results = results.filter(p => p.caliber && p.caliber.toLowerCase().includes(params.caliber.toLowerCase()));
    if (params.featured) results = results.filter(p => p.featured);
    if (params.deals) results = results.filter(p => p.salePrice);
    if (params.inStock) results = results.filter(p => p.inStock);
    if (params.search) {
      const q = params.search.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || (p.caliber && p.caliber.toLowerCase().includes(q)));
    }
    if (params.minPrice) results = results.filter(p => (p.salePrice || p.price) >= params.minPrice);
    if (params.maxPrice) results = results.filter(p => (p.salePrice || p.price) <= params.maxPrice);
    if (params.sort) {
      switch (params.sort) {
        case 'price-asc': results.sort((a,b) => (a.salePrice||a.price) - (b.salePrice||b.price)); break;
        case 'price-desc': results.sort((a,b) => (b.salePrice||b.price) - (a.salePrice||a.price)); break;
        case 'name': results.sort((a,b) => a.name.localeCompare(b.name)); break;
        default: break;
      }
    }
    if (params.limit) results = results.slice(0, params.limit);
    return results;
  }

  async function getProduct(id) {
    const products = await getProducts({});
    return products.find(p => p.id === id || p.sku === id) || null;
  }

  async function searchProducts(query) {
    return getProducts({ search: query, limit: 6 });
  }

  return { getProducts, getProduct, searchProducts, DEMO_PRODUCTS };
})();

// Global product card renderer
function renderProducts(products, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (!products || products.length === 0) {
    el.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#888;padding:24px">No products found.</p>';
    return;
  }
  el.innerHTML = products.map(p => buildProductCard(p)).join('');
}

function buildProductCard(p) {
  const price = p.salePrice || p.price;
  const isOnSale = !!p.salePrice;
  const imgSrc = p.image || 'assets/accessories.png';
  const stockClass = p.inStock ? (p.qty < 5 ? 'stock-low' : 'stock-in') : 'stock-out';
  const stockLabel = p.inStock ? (p.qty < 5 ? 'Low Stock' : 'In Stock') : 'Out of Stock';
  const stockLabelClass = p.inStock ? (p.qty < 5 ? 'stock-low-text' : 'stock-in-text') : 'stock-out-text';
  return `
    <div class="product-card">
      <div class="product-card-badges">
        ${isOnSale ? '<span class="badge badge-sale">Sale</span>' : ''}
        ${p.qty > 0 && p.qty < 5 ? '<span class="badge badge-low">Low Stock</span>' : ''}
      </div>
      <a href="product.html?id=${p.id}" class="product-card-img">
        <img src="${imgSrc}" alt="${p.name}" loading="lazy">
      </a>
      <div class="product-card-body">
        <div class="product-brand">${p.brand}</div>
        <div class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></div>
        ${p.sku ? `<div class="product-sku">SKU: ${p.sku}</div>` : ''}
        <div class="product-pricing">
          <span class="product-price ${isOnSale ? 'sale' : ''}">$${price.toFixed(2)}</span>
          ${isOnSale ? `<span class="product-was">$${p.price.toFixed(2)}</span>` : ''}
        </div>
        <div class="product-stock">
          <span class="stock-dot ${stockClass}"></span>
          <span class="${stockLabelClass}">${stockLabel}</span>
        </div>
      </div>
      <div class="product-card-footer">
        <button class="btn btn-primary btn-full btn-sm" onclick="Cart.add(${JSON.stringify(JSON.stringify(p)).slice(1,-1)})" ${!p.inStock ? 'disabled style="opacity:.5;cursor:not-allowed"' : ''}>
          ${p.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  `;
}

// Parse URL query params helper
function getQueryParams() {
  const params = {};
  new URLSearchParams(window.location.search).forEach((v, k) => params[k] = v);
  return params;
}
