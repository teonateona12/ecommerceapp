import fs from "fs";

const catalogPath = "catalog.json";
const salesPath = "sales.json";

let catalog = [];
if (fs.existsSync(catalogPath)) {
  const catalogData = fs.readFileSync(catalogPath, "utf8");
  if (catalogData) {
    catalog = JSON.parse(catalogData);
  }
}

let sales = {};
if (fs.existsSync(salesPath)) {
  const salesData = fs.readFileSync(salesPath, "utf8");
  if (salesData) {
    sales = JSON.parse(salesData);
  }
}

const [command, ...args] = process.argv.slice(2);

if (command === "save_product") {
  const [product_id, product_name, product_price] = args;
  if (!product_id || !product_name || !product_price) {
    console.error(
      "Usage: node index.js save_product <product_id> <product_name> <product_price>"
    );
    process.exit(1);
  }

  const existingProductIndex = catalog.findIndex(
    (p) => p.product_id === product_id
  );
  if (existingProductIndex !== -1) {
    catalog[existingProductIndex].product_name = product_name;
    catalog[existingProductIndex].product_price = parseFloat(product_price);
  } else {
    catalog.push({
      product_id,
      product_name,
      product_price: parseFloat(product_price),
    });
  }

  fs.writeFileSync(catalogPath, JSON.stringify(catalog));
  console.log(`Product ${product_id} saved or updated successfully.`);
} else if (command === "purchase_product") {
  const [product_id, quantity, price] = args;
  if (!product_id || !quantity || !price) {
    console.error(
      "Usage: node index.js purchase_product <product_id> <quantity> <price>"
    );
    process.exit(1);
  }

  const product = catalog.find((p) => p.product_id === product_id);
  if (!product) {
    console.error(`Product with ID ${product_id} not found`);
    process.exit(1);
  }

  const totalCost = parseFloat(quantity) * parseFloat(price);

  if (product.product_id in sales) {
    sales[product.product_id].sales_quantity += parseFloat(quantity);
    sales[product.product_id].sales_revenue += totalCost;
  } else {
    sales[product.product_id] = {
      sales_quantity: parseFloat(quantity),
      sales_revenue: totalCost,
    };
  }

  fs.writeFileSync(catalogPath, JSON.stringify(catalog));
  fs.writeFileSync(salesPath, JSON.stringify(sales));
}
