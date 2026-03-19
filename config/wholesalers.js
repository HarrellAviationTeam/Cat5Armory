/**
 * Cat-5 Armory - Wholesaler API Configuration
 *
 * IMPORTANT: API keys and credentials in Netlify Functions environment variables.
 * This file configures WHICH wholesalers are enabled and their settings.
 * Actual API keys must be set in Netlify dashboard > Environment Variables.
 *
 * HOW TO ENABLE A WHOLESALER:
 * 1. Set `enabled: true` for the desired wholesaler
 * 2. In Netlify dashboard, add the corresponding environment variables
 * 3. Redeploy the site
 *
 * SUPPORTED WHOLESALERS:
 * - Sports South (sportssouth.biz) - Major distributor
 * - RSR Group (rsrgroup.com) - Major distributor
 * - Davidson's (davidsonsinc.com) - Large wholesaler
 * - Lipsey's (lipseysgun.com) - Specialty handguns
 * - Zanders Sporting Goods (zapcsports.com) - Mid-size distributor
 * - Jerry's Enterprises (jei.net) - Major distributor
 */

const WHOLESALER_CONFIG = {

  // ===== SPORTS SOUTH =====
  sportsSouth: {
    enabled: false,           // Set to true when API key is configured
    name: 'Sports South',
    apiUrl: 'https://www.sportssouth.biz/api',
    // Required Netlify env vars:
    // SPORTS_SOUTH_API_KEY = your API key
    // SPORTS_SOUTH_ACCOUNT_ID = your account/dealer number
    notes: 'Contact Sports South at 800-388-3845 to get API access.',
    fieldMap: {
      id: 'ItemNumber',
      sku: 'ItemNumber',
      upc: 'UPC',
      name: 'Description',
      brand: 'Manufacturer',
      price: 'DealerCost',
      retailPrice: 'MSRP',
      qty: 'Quantity',
      category: 'Category',
    }
  },

  // ===== RSR GROUP =====
  rsrGroup: {
    enabled: false,
    name: 'RSR Group',
    apiUrl: 'https://www.rsrgroup.com/api',
    // Required Netlify env vars:
    // RSR_USERNAME = your RSR username
    // RSR_PASSWORD = your RSR password
    notes: 'RSR Group API access requires an active dealer account. Call 800-541-6777.',
    fieldMap: {
      id: 'itemNo',
      sku: 'itemNo',
      upc: 'upc',
      name: 'description',
      brand: 'manufacturer',
      price: 'dealerCost',
      retailPrice: 'msrp',
      qty: 'qty',
      category: 'category',
    }
  },

  // ===== DAVIDSON'S =====
  davidsons: {
    enabled: false,
    name: "Davidson's",
    apiUrl: 'https://www.davidsonsinc.com/api',
    // Required Netlify env vars:
    // DAVIDSONS_API_KEY = your API key
    // DAVIDSONS_ACCOUNT = your account number
    notes: "Davidson's provides FTP and API access. Call 800-367-4867 for API access.",
    fieldMap: {
      id: 'StyleID',
      sku: 'PartNumber',
      upc: 'UPC',
      name: 'ProductName',
      brand: 'Brand',
      price: 'PricingInfo.YourCost',
      retailPrice: 'PricingInfo.SuggestedRetail',
      qty: 'InventoryInfo.Available',
    }
  },

  // ===== LIPSEY'S =====
  lipseys: {
    enabled: false,
    name: "Lipsey's",
    apiUrl: 'https://api.lipseysgun.com/api',
    // Required Netlify env vars:
    // LIPSEYS_USERNAME = your Lipsey's username
    // LIPSEYS_PASSWORD = your Lipsey's password
    notes: "Lipsey's is known for exclusive handgun models. Requires active dealer account.",
    fieldMap: {
      id: 'id',
      sku: 'sku',
      upc: 'upc',
      name: 'description',
      brand: 'manufacturer',
      price: 'price',
      retailPrice: 'msrp',
      qty: 'qtyOnHand',
    }
  },

  // ===== ZANDERS SPORTING GOODS =====
  zanders: {
    enabled: false,
    name: 'Zanders Sporting Goods',
    apiUrl: 'https://www.zapcsports.com/api',
    // Required Netlify env vars:
    // ZANDERS_API_KEY = your API key
    notes: 'Zanders Sporting Goods. Call 800-851-4867 for API access.',
    fieldMap: {
      id: 'itemNumber',
      sku: 'itemNumber',
      upc: 'upc',
      name: 'description',
      brand: 'manufacturer',
      price: 'dealerCost',
      qty: 'available',
    }
  },

  // ===== JERRY'S ENTERPRISES =====
  jerrys: {
    enabled: false,
    name: "Jerry's Enterprises",
    apiUrl: 'https://www.jei.net/api',
    // Required Netlify env vars:
    // JERRYS_API_KEY = your API key
    // JERRYS_ACCOUNT = your account number
    notes: "Jerry's is a major distributor. Contact them at 763-425-9000 for API access.",
    fieldMap: {
      id: 'ItemNo',
      sku: 'ItemNo',
      upc: 'UPC',
      name: 'ItemDescription',
      brand: 'MfrName',
      price: 'YourCost',
      qty: 'AvailQty',
    }
  },

  // ===== IRON VALLEY DISTRIBUTORS =====
  ironValley: {
    enabled: false,
    name: 'Iron Valley Distributors',
    apiUrl: 'https://www.ironvalley.com/api',
    // Required Netlify env vars:
    // IRON_VALLEY_API_KEY = your API key
    // IRON_VALLEY_ACCOUNT = your dealer account number
    notes: 'Iron Valley Distributors — contact them to set up a dealer account and obtain API credentials.',
    fieldMap: {
      id: 'ItemNumber',
      sku: 'ItemNumber',
      upc: 'UPC',
      name: 'ProductDescription',
      brand: 'ManufacturerName',
      price: 'DealerPrice',
      retailPrice: 'MSRP',
      qty: 'QuantityOnHand',
      category: 'Category',
      description: 'LongDescription',
      image: 'PrimaryImageURL',
    }
  },

};

// Product category mappings (wholesaler category names → our standard categories)
const CATEGORY_MAP = {
  // Handguns
  'HANDGUN': 'handguns', 'PISTOL': 'handguns', 'REVOLVER': 'handguns',
  'Handguns': 'handguns', 'Pistols': 'handguns', 'Revolvers': 'handguns',
  // Rifles
  'RIFLE': 'rifles', 'LONG GUN': 'rifles', 'Rifles': 'rifles', 'Long Guns': 'rifles',
  'SEMIAUTO RIFLE': 'rifles', 'BOLT RIFLE': 'rifles',
  // Shotguns
  'SHOTGUN': 'shotguns', 'Shotguns': 'shotguns',
  // Ammo
  'AMMO': 'ammunition', 'AMMUNITION': 'ammunition', 'Ammunition': 'ammunition',
  // Optics
  'OPTICS': 'optics', 'Optics': 'optics', 'SCOPE': 'optics', 'SIGHT': 'optics',
  // Accessories
  'ACCESSORY': 'accessories', 'ACCESSORIES': 'accessories', 'Accessories': 'accessories',
  'MAGAZINE': 'magazines', 'Magazines': 'magazines',
};

if (typeof module !== 'undefined') module.exports = { WHOLESALER_CONFIG, CATEGORY_MAP };
