#!/usr/bin/env node
import fs from "fs";
const product_id = process.argv.slice(2)[0];
const product_quantity = process.argv.slice(2)[1];
const product_price = process.argv.slice(2)[2];

function purchaseProduct(product_id, quantity, price) {
  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  const existingProductIndex = catalog.findIndex(
    (product) => product.product_id === product_id
  );

  if (existingProductIndex === -1) {
    console.error(`Error: Product with ID ${product_id} not found in catalog.`);
    return;
  }

  const purchase = JSON.parse(fs.readFileSync("purchase.json"));
  if (!product_id || !quantity || !price) {
    console.error("Error: productId, quantity, or productPrice is undefined.");
    return;
  }
  const purchasedProduct = {
    product_id: product_id,
    quantity: quantity,
    price: price,
  };
  purchase.push(purchasedProduct);
  fs.writeFileSync("purchase.json", JSON.stringify(purchase, null, 2));
}

purchaseProduct(product_id, product_quantity, product_price);
