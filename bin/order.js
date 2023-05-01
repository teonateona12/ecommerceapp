#!/usr/bin/env node
import fs from "fs";

const product_id = process.argv.slice(2)[0];
const quantity = process.argv.slice(2)[1];

function orderProduct(product_id, quantity) {
  if (!product_id || !quantity) {
    console.error("Error: productId or quantity is undefined.");
    return;
  }
  if (!(+quantity > 0)) {
    console.error("Error: quantity is not a number.");
    return;
  }
  if (product_id.trim().length === 0) {
    console.error("Error:  product id is requered");
    return;
  }

  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  const existingProductIndex = catalog.findIndex(
    (product) => product.product_id === product_id
  );

  if (existingProductIndex === -1) {
    console.error(
      `Error: Product with ID ${product_id} not found in purchase.`
    );
    return;
  }

  const product = catalog[existingProductIndex];
  if (product.quantity < quantity) {
    console.error(
      `Error: Not enough quantity of product with ID ${product_id} available.`
    );
    return;
  }

  const order = JSON.parse(fs.readFileSync("order.json"));
  const orderedProduct = {
    product_id: product_id.trim(),
    quantity: +quantity.trim(),
    sell_price: product.product_price,
  };
  order.push(orderedProduct);
  fs.writeFileSync("order.json", JSON.stringify(order, null, 2));
}

orderProduct(product_id, quantity);
