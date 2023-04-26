import readline from "readline";
import fs from "fs";

function getCommand() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "save_product":
      const productId = args[1];
      const productName = args[2];
      const productPrice = args[3];
      saveProduct(productId, productName, productPrice);
      return `Product saved to catalog.json: {product_id: "${productId}", product_name: "${productName}", product_price: "${productPrice}"}`;
    case "purchase_product":
      const purchaseProductId = args[1];
      const purchaseQuantity = parseInt(args[2]);
      const purchasePrice = parseInt(args[3]);
      purchaseProduct(purchaseProductId, purchaseQuantity, purchasePrice);
      return `Product purchased and balance updated in catalog.json: {product_id: "${purchaseProductId}", purchase_quantity: "${purchaseQuantity}", purchase_price: "${purchasePrice}"}`;
    default:
      return `Invalid command: ${command}`;
  }
}

function saveProduct(productId, productName, productPrice) {
  const product = {
    product_id: productId,
    product_name: productName,
    product_price: productPrice,
    balance: 0,
  };
  const catalog = JSON.parse(fs.readFileSync("catalog.json", "utf8"));
  catalog.push(product);
  fs.writeFileSync("catalog.json", JSON.stringify(catalog));
}

function purchaseProduct(productId, quantity, price) {
  const catalog = JSON.parse(fs.readFileSync("catalog.json", "utf8"));
  const productIndex = catalog.findIndex(
    (product) => product.product_id === productId
  );
  if (productIndex === -1) {
    console.log(`Product not found: ${productId}`);
    return;
  }
  const product = catalog[productIndex];
  product.balance += quantity * price;
  catalog[productIndex] = product;
  fs.writeFileSync("catalog.json", JSON.stringify(catalog));
}

console.log(getCommand());
