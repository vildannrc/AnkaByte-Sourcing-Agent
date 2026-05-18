const db = require('./db.js');

const suppliers = [
  // === ELECTRONICS - NORMAL PRICES ===
  { name: "TechParts Pro", category: "electronics", location: "Istanbul", price_score: 8.5, quality_score: 9.0, price_tl: 1250, contact: "info@techpartspro.com" },
  { name: "MegaElektronik", category: "electronics", location: "Ankara", price_score: 9.2, quality_score: 7.5, price_tl: 980, contact: "sales@megaelektronik.com" },
  { name: "QualityTech", category: "electronics", location: "Izmir", price_score: 7.0, quality_score: 9.5, price_tl: 1450, contact: "contact@qualitytech.com" },
  { name: "FastSupply Co", category: "electronics", location: "Bursa", price_score: 8.8, quality_score: 8.0, price_tl: 1100, contact: "info@fastsupply.com" },
  { name: "ElectroHub", category: "electronics", location: "Antalya", price_score: 7.5, quality_score: 8.5, price_tl: 1350, contact: "hub@electrohub.com" },
  { name: "NordTech", category: "electronics", location: "Istanbul", price_score: 8.0, quality_score: 9.2, price_tl: 1300, contact: "nord@nordtech.com" },
  { name: "PrimeParts", category: "electronics", location: "Ankara", price_score: 9.0, quality_score: 8.8, price_tl: 1050, contact: "prime@primeparts.com" },
  { name: "TurboElektro", category: "electronics", location: "Izmir", price_score: 8.3, quality_score: 7.8, price_tl: 1150, contact: "info@turboelektro.com" },
  { name: "AlphaSupply", category: "electronics", location: "Kayseri", price_score: 7.8, quality_score: 8.3, price_tl: 1200, contact: "alpha@alphasupply.com" },
  { name: "BetaTech", category: "electronics", location: "Konya", price_score: 8.6, quality_score: 8.6, price_tl: 1080, contact: "beta@betatech.com" },

  // === ELECTRONICS - OVERPRICED (MONOPOLY RISK) ===
  { name: "MonoTech TR", category: "electronics", location: "Istanbul", price_score: 2.1, quality_score: 6.0, price_tl: 8500, contact: "sales@monotech.com" },
  { name: "PriceKing Elektronik", category: "electronics", location: "Ankara", price_score: 1.8, quality_score: 5.5, price_tl: 9200, contact: "info@priceking.com" },
  { name: "ExpensiveParts AS", category: "electronics", location: "Istanbul", price_score: 1.5, quality_score: 7.0, price_tl: 11000, contact: "contact@expensiveparts.com" },
  { name: "OverCharge Ltd", category: "electronics", location: "Izmir", price_score: 1.2, quality_score: 6.5, price_tl: 12500, contact: "sales@overcharge.com" },
  { name: "GoldPrice Tech", category: "electronics", location: "Bursa", price_score: 1.9, quality_score: 5.0, price_tl: 7800, contact: "gold@goldprice.com" },

  // === COMPUTERS - NORMAL ===
  { name: "CompSource TR", category: "computers", location: "Istanbul", price_score: 8.7, quality_score: 9.1, price_tl: 15000, contact: "info@compsource.com" },
  { name: "PCWorld Supply", category: "computers", location: "Ankara", price_score: 9.0, quality_score: 8.5, price_tl: 13500, contact: "sales@pcworld.com" },
  { name: "LaptopDirect", category: "computers", location: "Izmir", price_score: 8.2, quality_score: 9.3, price_tl: 16000, contact: "direct@laptopdirect.com" },
  { name: "HardwarePro", category: "computers", location: "Bursa", price_score: 7.9, quality_score: 8.7, price_tl: 17500, contact: "pro@hardwarepro.com" },
  { name: "ServerNet", category: "computers", location: "Antalya", price_score: 8.5, quality_score: 9.0, price_tl: 14800, contact: "net@servernet.com" },
  { name: "CoreSupply", category: "computers", location: "Kayseri", price_score: 9.1, quality_score: 8.2, price_tl: 13000, contact: "core@coresupply.com" },
  { name: "ByteSource", category: "computers", location: "Istanbul", price_score: 8.4, quality_score: 8.9, price_tl: 15500, contact: "byte@bytesource.com" },
  { name: "DataParts Co", category: "computers", location: "Ankara", price_score: 7.6, quality_score: 9.4, price_tl: 18000, contact: "data@dataparts.com" },
  { name: "TechBase TR", category: "computers", location: "Izmir", price_score: 8.8, quality_score: 8.1, price_tl: 14000, contact: "base@techbase.com" },
  { name: "DigitalSupply", category: "computers", location: "Konya", price_score: 9.3, quality_score: 7.9, price_tl: 12500, contact: "digital@digitalsupply.com" },

  // === COMPUTERS - OVERPRICED ===
  { name: "MonoPC Istanbul", category: "computers", location: "Istanbul", price_score: 1.7, quality_score: 6.8, price_tl: 65000, contact: "mono@monopc.com" },
  { name: "ExpensivePC Ltd", category: "computers", location: "Ankara", price_score: 1.4, quality_score: 7.2, price_tl: 72000, contact: "info@expensivepc.com" },
  { name: "OverPricedComp", category: "computers", location: "Izmir", price_score: 1.6, quality_score: 5.8, price_tl: 58000, contact: "sales@overpricedcomp.com" },

  // === MOBILE PHONES - NORMAL ===
  { name: "MobileHub TR", category: "mobile", location: "Istanbul", price_score: 8.9, quality_score: 9.2, price_tl: 8500, contact: "hub@mobilehub.com" },
  { name: "PhoneDirect", category: "mobile", location: "Ankara", price_score: 9.1, quality_score: 8.6, price_tl: 7800, contact: "direct@phonedirect.com" },
  { name: "SmartSupply", category: "mobile", location: "Izmir", price_score: 8.3, quality_score: 9.0, price_tl: 9200, contact: "smart@smartsupply.com" },
  { name: "CellSource", category: "mobile", location: "Bursa", price_score: 7.7, quality_score: 8.8, price_tl: 10500, contact: "cell@cellsource.com" },
  { name: "MobilePro", category: "mobile", location: "Antalya", price_score: 8.6, quality_score: 8.4, price_tl: 8900, contact: "pro@mobilepro.com" },
  { name: "PhoneWorld", category: "mobile", location: "Kayseri", price_score: 9.2, quality_score: 8.0, price_tl: 7500, contact: "world@phoneworld.com" },
  { name: "TechPhone TR", category: "mobile", location: "Istanbul", price_score: 8.1, quality_score: 9.1, price_tl: 9800, contact: "tech@techphone.com" },
  { name: "SmartDeal Co", category: "mobile", location: "Ankara", price_score: 8.7, quality_score: 8.5, price_tl: 8200, contact: "deal@smartdeal.com" },
  { name: "MobileBase", category: "mobile", location: "Izmir", price_score: 7.5, quality_score: 9.3, price_tl: 11000, contact: "base@mobilebase.com" },
  { name: "CellTech", category: "mobile", location: "Konya", price_score: 9.0, quality_score: 7.8, price_tl: 7200, contact: "tech@celltech.com" },

  // === MOBILE - OVERPRICED ===
  { name: "MonoMobile TR", category: "mobile", location: "Istanbul", price_score: 1.3, quality_score: 6.2, price_tl: 45000, contact: "mono@monomobile.com" },
  { name: "PriceyPhone", category: "mobile", location: "Ankara", price_score: 1.6, quality_score: 7.0, price_tl: 38000, contact: "info@priceyphone.com" },
  { name: "ExpensiveCell", category: "mobile", location: "Izmir", price_score: 1.1, quality_score: 5.5, price_tl: 52000, contact: "sales@expensivecell.com" },

  // === NETWORKING - NORMAL ===
  { name: "NetSupply Pro", category: "networking", location: "Istanbul", price_score: 8.8, quality_score: 9.0, price_tl: 3200, contact: "pro@netsupply.com" },
  { name: "RouterDirect", category: "networking", location: "Ankara", price_score: 9.0, quality_score: 8.7, price_tl: 2900, contact: "direct@routerdirect.com" },
  { name: "NetworkBase", category: "networking", location: "Izmir", price_score: 8.2, quality_score: 9.2, price_tl: 3500, contact: "base@networkbase.com" },
  { name: "SwitchSource", category: "networking", location: "Bursa", price_score: 7.8, quality_score: 8.9, price_tl: 3800, contact: "switch@switchsource.com" },
  { name: "CableHub TR", category: "networking", location: "Antalya", price_score: 8.5, quality_score: 8.3, price_tl: 3100, contact: "hub@cablehub.com" },
  { name: "FiberTech", category: "networking", location: "Kayseri", price_score: 9.1, quality_score: 8.5, price_tl: 2750, contact: "fiber@fibertech.com" },
  { name: "WifiPro TR", category: "networking", location: "Istanbul", price_score: 8.3, quality_score: 8.8, price_tl: 3300, contact: "wifi@wifipro.com" },
  { name: "NetDeal Co", category: "networking", location: "Ankara", price_score: 8.7, quality_score: 8.1, price_tl: 2850, contact: "deal@netdeal.com" },
  { name: "InfraSource", category: "networking", location: "Izmir", price_score: 7.6, quality_score: 9.1, price_tl: 4000, contact: "infra@infrasource.com" },
  { name: "CloudNet TR", category: "networking", location: "Konya", price_score: 9.2, quality_score: 7.7, price_tl: 2600, contact: "cloud@cloudnet.com" },

  // === NETWORKING - OVERPRICED ===
  { name: "MonoNet Istanbul", category: "networking", location: "Istanbul", price_score: 1.8, quality_score: 6.5, price_tl: 18000, contact: "mono@mononet.com" },
  { name: "PriceyRouter", category: "networking", location: "Ankara", price_score: 1.4, quality_score: 7.1, price_tl: 22000, contact: "info@priceyrouter.com" },

  // === ACCESSORIES - NORMAL ===
  { name: "AccesPro TR", category: "accessories", location: "Istanbul", price_score: 9.0, quality_score: 8.8, price_tl: 450, contact: "pro@accespro.com" },
  { name: "GadgetSource", category: "accessories", location: "Ankara", price_score: 8.6, quality_score: 9.1, price_tl: 520, contact: "source@gadgetsource.com" },
  { name: "PeripheralHub", category: "accessories", location: "Izmir", price_score: 8.3, quality_score: 8.6, price_tl: 580, contact: "hub@peripheralhub.com" },
  { name: "AccessDirect", category: "accessories", location: "Bursa", price_score: 7.9, quality_score: 9.0, price_tl: 650, contact: "direct@accessdirect.com" },
  { name: "TechGadget Co", category: "accessories", location: "Antalya", price_score: 8.7, quality_score: 8.3, price_tl: 480, contact: "tech@techgadget.com" },
  { name: "SmartAccess", category: "accessories", location: "Kayseri", price_score: 9.1, quality_score: 8.0, price_tl: 420, contact: "smart@smartaccess.com" },
  { name: "GadgetBase", category: "accessories", location: "Istanbul", price_score: 8.4, quality_score: 8.9, price_tl: 550, contact: "base@gadgetbase.com" },
  { name: "PeripheralPro", category: "accessories", location: "Ankara", price_score: 7.7, quality_score: 9.2, price_tl: 680, contact: "pro@peripheralpro.com" },
  { name: "AccessHub TR", category: "accessories", location: "Izmir", price_score: 8.8, quality_score: 8.4, price_tl: 490, contact: "hub@accesshub.com" },
  { name: "TechAccess", category: "accessories", location: "Konya", price_score: 9.2, quality_score: 7.9, price_tl: 410, contact: "tech@techaccess.com" },

  // === ACCESSORIES - OVERPRICED ===
  { name: "MonoAccess TR", category: "accessories", location: "Istanbul", price_score: 1.5, quality_score: 6.3, price_tl: 4500, contact: "mono@monoaccess.com" },
  { name: "PriceyGadget", category: "accessories", location: "Ankara", price_score: 1.2, quality_score: 6.9, price_tl: 5200, contact: "info@priceygadget.com" },
  { name: "ExpensiveAccess", category: "accessories", location: "Izmir", price_score: 1.7, quality_score: 5.7, price_tl: 3800, contact: "sales@expensiveaccess.com" },

  // === SOFTWARE - NORMAL ===
  { name: "SoftSource TR", category: "software", location: "Istanbul", price_score: 8.9, quality_score: 9.3, price_tl: 2800, contact: "source@softsource.com" },
  { name: "LicenseDirect", category: "software", location: "Ankara", price_score: 9.2, quality_score: 8.8, price_tl: 2400, contact: "direct@licensedirect.com" },
  { name: "SoftwarePro", category: "software", location: "Izmir", price_score: 8.4, quality_score: 9.0, price_tl: 3100, contact: "pro@softwarepro.com" },
  { name: "CodeSupply", category: "software", location: "Bursa", price_score: 7.8, quality_score: 9.4, price_tl: 3500, contact: "code@codesupply.com" },
  { name: "AppSource Co", category: "software", location: "Antalya", price_score: 8.6, quality_score: 8.6, price_tl: 2900, contact: "app@appsource.com" },
  { name: "TechLicense", category: "software", location: "Kayseri", price_score: 9.0, quality_score: 8.2, price_tl: 2500, contact: "tech@techlicense.com" },
  { name: "SoftBase TR", category: "software", location: "Istanbul", price_score: 8.2, quality_score: 9.1, price_tl: 3200, contact: "base@softbase.com" },
  { name: "LicenseHub", category: "software", location: "Ankara", price_score: 8.7, quality_score: 8.5, price_tl: 2700, contact: "hub@licensehub.com" },
  { name: "SoftDeal", category: "software", location: "Izmir", price_score: 7.5, quality_score: 9.2, price_tl: 3800, contact: "deal@softdeal.com" },
  { name: "AppDirect TR", category: "software", location: "Konya", price_score: 9.3, quality_score: 7.8, price_tl: 2200, contact: "app@appdirect.com" },

  // === SOFTWARE - OVERPRICED ===
  { name: "MonoSoft TR", category: "software", location: "Istanbul", price_score: 1.6, quality_score: 6.7, price_tl: 18000, contact: "mono@monosoft.com" },
  { name: "PriceySoft", category: "software", location: "Ankara", price_score: 1.3, quality_score: 7.3, price_tl: 22000, contact: "info@priceysoft.com" },
  { name: "ExpensiveLicense", category: "software", location: "Izmir", price_score: 1.0, quality_score: 6.0, price_tl: 28000, contact: "sales@expensivelicense.com" },

  // === SERVERS - NORMAL ===
  { name: "ServerPro TR", category: "servers", location: "Istanbul", price_score: 8.7, quality_score: 9.2, price_tl: 45000, contact: "pro@serverpro.com" },
  { name: "HardwareSource", category: "servers", location: "Ankara", price_score: 9.1, quality_score: 8.6, price_tl: 38000, contact: "source@hardwaresource.com" },
  { name: "ServerDirect", category: "servers", location: "Izmir", price_score: 8.3, quality_score: 9.0, price_tl: 48000, contact: "direct@serverdirect.com" },
  { name: "RackSupply Co", category: "servers", location: "Bursa", price_score: 7.9, quality_score: 8.8, price_tl: 52000, contact: "rack@racksupply.com" },
  { name: "DataCenterTR", category: "servers", location: "Antalya", price_score: 8.5, quality_score: 9.1, price_tl: 42000, contact: "dc@datacentertr.com" },
  { name: "ServerBase", category: "servers", location: "Kayseri", price_score: 9.0, quality_score: 8.3, price_tl: 36000, contact: "base@serverbase.com" },
  { name: "HardwarePro TR", category: "servers", location: "Istanbul", price_score: 8.1, quality_score: 9.0, price_tl: 50000, contact: "pro@hardwarepro.com" },
  { name: "RackDirect", category: "servers", location: "Ankara", price_score: 8.6, quality_score: 8.4, price_tl: 41000, contact: "rack@rackdirect.com" },
  { name: "ServerHub TR", category: "servers", location: "Izmir", price_score: 7.6, quality_score: 9.3, price_tl: 55000, contact: "hub@serverhub.com" },
  { name: "DataSupply", category: "servers", location: "Konya", price_score: 9.2, quality_score: 7.7, price_tl: 34000, contact: "data@datasupply.com" },

  // === SERVERS - OVERPRICED ===
  { name: "MonoServer TR", category: "servers", location: "Istanbul", price_score: 1.9, quality_score: 6.4, price_tl: 250000, contact: "mono@monoserver.com" },
  { name: "PriceyServer", category: "servers", location: "Ankara", price_score: 1.5, quality_score: 7.0, price_tl: 320000, contact: "info@priceyserver.com" },
  { name: "ExpensiveRack", category: "servers", location: "Izmir", price_score: 1.2, quality_score: 5.9, price_tl: 280000, contact: "sales@expensiverack.com" },
];

// Clear and re-seed
db.exec('DELETE FROM suppliers');

const stmt = db.prepare(`
  INSERT INTO suppliers (name, category, location, price_score, quality_score, price_tl, contact)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((suppliers) => {
  for (const s of suppliers) {
    stmt.run(s.name, s.category, s.location, s.price_score, s.quality_score, s.price_tl, s.contact);
  }
});

insertMany(suppliers);
console.log(`✅ Seeded ${suppliers.length} suppliers!`);

// === SEED PRODUCTS ===
db.exec('DELETE FROM products');

const productStmt = db.prepare(`
  INSERT INTO products (supplier_id, name, brand, price_tl, stock)
  VALUES (?, ?, ?, ?, ?)
`);

const products = [
  // TechParts Pro (id:1) - normal fiyat
  { supplier_id: 1, name: "iPhone 15 Pro", brand: "Apple", price_tl: 42000, stock: 50 },
  { supplier_id: 1, name: "Samsung Galaxy S24", brand: "Samsung", price_tl: 38000, stock: 30 },
  { supplier_id: 1, name: "MacBook Pro M3", brand: "Apple", price_tl: 85000, stock: 15 },

  // MonoTech TR (id:11) - fahiş fiyat
  { supplier_id: 11, name: "iPhone 15 Pro", brand: "Apple", price_tl: 98000, stock: 10 },
  { supplier_id: 11, name: "Samsung Galaxy S24", brand: "Samsung", price_tl: 87000, stock: 5 },
  { supplier_id: 11, name: "MacBook Pro M3", brand: "Apple", price_tl: 195000, stock: 3 },

  // CompSource TR (id:16) - normal fiyat
  { supplier_id: 16, name: "Dell XPS 15", brand: "Dell", price_tl: 55000, stock: 20 },
  { supplier_id: 16, name: "HP Pavilion", brand: "HP", price_tl: 28000, stock: 40 },
  { supplier_id: 16, name: "Lenovo ThinkPad", brand: "Lenovo", price_tl: 45000, stock: 25 },

  // MonoPC Istanbul (id:26) - fahiş fiyat
  { supplier_id: 26, name: "Dell XPS 15", brand: "Dell", price_tl: 145000, stock: 3 },
  { supplier_id: 26, name: "HP Pavilion", brand: "HP", price_tl: 78000, stock: 2 },
  { supplier_id: 26, name: "Lenovo ThinkPad", brand: "Lenovo", price_tl: 120000, stock: 1 },

  // MobileHub TR (id:29) - normal fiyat
  { supplier_id: 29, name: "iPhone 15", brand: "Apple", price_tl: 35000, stock: 60 },
  { supplier_id: 29, name: "Xiaomi 14", brand: "Xiaomi", price_tl: 18000, stock: 45 },
  { supplier_id: 29, name: "Samsung A54", brand: "Samsung", price_tl: 12000, stock: 80 },

  // MonoMobile TR (id:39) - fahiş fiyat
  { supplier_id: 39, name: "iPhone 15", brand: "Apple", price_tl: 85000, stock: 5 },
  { supplier_id: 39, name: "Xiaomi 14", brand: "Xiaomi", price_tl: 45000, stock: 3 },
  { supplier_id: 39, name: "Samsung A54", brand: "Samsung", price_tl: 35000, stock: 2 },
];

const insertProducts = db.transaction((products) => {
  for (const p of products) {
    productStmt.run(p.supplier_id, p.name, p.brand, p.price_tl, p.stock);
  }
});

insertProducts(products);
console.log(`✅ Seeded ${products.length} products!`);

// === SEED REVIEWS ===
db.exec('DELETE FROM reviews');

const reviewStmt = db.prepare(`
  INSERT INTO reviews (supplier_id, rating, comment)
  VALUES (?, ?, ?)
`);

const reviews = [
  // TechParts Pro - iyi yorumlar
  { supplier_id: 1, rating: 4.8, comment: "Very fast delivery, great prices" },
  { supplier_id: 1, rating: 4.9, comment: "Best supplier we have worked with" },
  { supplier_id: 1, rating: 4.7, comment: "Quality products, fair pricing" },

  // MonoTech TR - kötü yorumlar
  { supplier_id: 11, rating: 1.2, comment: "Extremely overpriced, avoid!" },
  { supplier_id: 11, rating: 1.5, comment: "Same products 3x the market price" },
  { supplier_id: 11, rating: 1.0, comment: "Monopoly behavior, prices are unfair" },

  // CompSource TR - iyi yorumlar
  { supplier_id: 16, rating: 4.7, comment: "Reliable and affordable" },
  { supplier_id: 16, rating: 4.8, comment: "Great stock, fast shipping" },

  // MonoPC Istanbul - kötü yorumlar
  { supplier_id: 26, rating: 1.3, comment: "Way too expensive compared to alternatives" },
  { supplier_id: 26, rating: 1.1, comment: "Tried to charge us 3x market rate" },

  // MobileHub TR - iyi yorumlar
  { supplier_id: 29, rating: 4.9, comment: "Excellent mobile supplier" },
  { supplier_id: 29, rating: 4.8, comment: "Always has stock, great prices" },

  // MonoMobile TR - kötü yorumlar
  { supplier_id: 39, rating: 1.4, comment: "Prices are outrageous" },
  { supplier_id: 39, rating: 1.2, comment: "Do not recommend, use alternatives" },
];

const insertReviews = db.transaction((reviews) => {
  for (const r of reviews) {
    reviewStmt.run(r.supplier_id, r.rating, r.comment);
  }
});

insertReviews(reviews);
console.log(`✅ Seeded ${reviews.length} reviews!`);

// === SEED RISK ANALYSIS (arkadaşının yaklaşımı) ===
db.exec('DELETE FROM risk_analizi_db');

const riskStmt = db.prepare(`
  INSERT INTO risk_analizi_db (supplier_id, supplier_name, category, risk_level, risk_reason, recommendation, analyzed_price, price_score, quality_score)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const riskAnalysis = [
  // Normal tedarikçiler - low risk
  { supplier_id: 1, supplier_name: "TechParts Pro", category: "electronics", risk_level: "low", risk_reason: "Fiyat skoru yüksek (8.5/10), piyasa ortalaması", recommendation: "Güvenli tedarikçi, tercih edilebilir", analyzed_price: 1250, price_score: 8.5, quality_score: 9.0 },
  { supplier_id: 16, supplier_name: "CompSource TR", category: "computers", risk_level: "low", risk_reason: "Rekabetçi fiyatlar, iyi performans", recommendation: "Önerilen tedarikçi", analyzed_price: 15000, price_score: 8.7, quality_score: 9.1 },
  { supplier_id: 29, supplier_name: "MobileHub TR", category: "mobile", risk_level: "low", risk_reason: "Piyasa fiyatlarinda kalite ürünleri", recommendation: "Güvenilir seçenek", analyzed_price: 8500, price_score: 8.9, quality_score: 9.2 },

  // Orta riskli tedarikçiler - medium risk
  { supplier_id: 5, supplier_name: "ElectroHub", category: "electronics", risk_level: "medium", risk_reason: "Fiyat skoru orta seviyede (7.5/10)", recommendation: "Alternatifleri karşılaştırın", analyzed_price: 1350, price_score: 7.5, quality_score: 8.5 },
  { supplier_id: 20, supplier_name: "HardwarePro", category: "computers", risk_level: "medium", risk_reason: "Kalite iyi ama fiyat biraz yüksek", recommendation: "İyi kalite, fiyat kontrolü yapın", analyzed_price: 17500, price_score: 7.9, quality_score: 8.7 },

  // Yüksek riskli tedarikçiler - high risk (fahiş fiyat)
  { supplier_id: 11, supplier_name: "MonoTech TR", category: "electronics", risk_level: "high", risk_reason: "Çok yüksek fiyat skoru (2.1/10), piyasa fiyatinin çok üstünde", recommendation: "Bu tedarikçiden kaçının, alternatif arayın", analyzed_price: 8500, price_score: 2.1, quality_score: 6.0 },
  { supplier_id: 26, supplier_name: "MonoPC Istanbul", category: "computers", risk_level: "high", risk_reason: "Fahiş fiyatlar, monopol davranişi", recommendation: "Kesinlikle kaçının", analyzed_price: 65000, price_score: 1.7, quality_score: 6.8 },
  { supplier_id: 39, supplier_name: "MonoMobile TR", category: "mobile", risk_level: "high", risk_reason: "Piyasa fiyatinin 2-3 kati", recommendation: "Alternatif tedarikçileri kullanın", analyzed_price: 45000, price_score: 1.3, quality_score: 6.2 },
];

const insertRiskAnalysis = db.transaction((riskAnalysis) => {
  for (const r of riskAnalysis) {
    riskStmt.run(r.supplier_id, r.supplier_name, r.category, r.risk_level, r.risk_reason, r.recommendation, r.analyzed_price, r.price_score, r.quality_score);
  }
});

insertRiskAnalysis(riskAnalysis);
console.log(`✅ Seeded ${riskAnalysis.length} risk analysis records!`);

db.close();
