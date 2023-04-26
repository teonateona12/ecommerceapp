import fs from "fs";

const catalogPath = "catalog.json";

let catalog = [];
if (fs.existsSync(catalogPath)) {
  const catalogData = fs.readFileSync(catalogPath, "utf8");
  if (catalogData) {
    catalog = JSON.parse(catalogData);
  }
}

const [product_id, product_name, product_price] = process.argv.slice(2);
if (!product_id || !product_name || !product_price) {
  console.error(
    "Usage: node save_product.js <product_id> <product_name> <product_price>"
  );
  process.exit(1);
}

const existingProduct = catalog.find((p) => p.product_id === product_id);
if (existingProduct) {
  existingProduct.product_name = product_name;
  existingProduct.product_price = product_price;
} else {
  catalog.push({
    product_id,
    product_name,
    product_price,
  });
}

fs.writeFileSync(catalogPath, JSON.stringify(catalog));
console.log("Product saved!");
