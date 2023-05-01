#!/usr/bin/env node
import fs from "fs";

const product_id = process.argv.slice(2)[0];

export default function getQuantityOfProduct(product_id) {
  const purchase = JSON.parse(fs.readFileSync("purchase.json"));
  const purchaseProducts = purchase.filter(
    (purchasedProduct) => purchasedProduct.product_id === product_id
  );

  const order = JSON.parse(fs.readFileSync("order.json"));
  const orderProducts = order.filter(
    (orderedProduct) => orderedProduct.product_id === product_id
  );

  if (purchaseProducts.length === 0 && orderProducts.length === 0) {
    console.log(`No products found with product ID ${product_id}`);
    return;
  }

  let totalQuantity = 0;

  for (const purchaseProduct of purchaseProducts) {
    totalQuantity += purchaseProduct.quantity;
  }

  for (const orderProduct of orderProducts) {
    totalQuantity -= orderProduct.quantity;
  }

  console.log(totalQuantity);
}

getQuantityOfProduct(product_id);
