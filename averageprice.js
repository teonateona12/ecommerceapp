#!/usr/bin/env node
import fs from "fs";

const product_id = process.argv.slice(2)[0];

function getAveragePrice(product_id) {
  const purchase = JSON.parse(fs.readFileSync("purchase.json"));
  const purchasedProducts = purchase.filter(
    (purchasedProduct) => purchasedProduct.product_id === product_id
  );

  if (purchasedProducts.length === 0) {
    console.log(`No purchased products found with product ID ${product_id}`);
    return;
  }

  const totalQuantity = purchasedProducts.reduce(
    (accumulator, purchasedProduct) =>
      Number(accumulator) + Number(purchasedProduct.quantity),
    0
  );
  const totalPrice = purchasedProducts.reduce(
    (accumulator, purchasedProduct) =>
      Number(accumulator) +
      Number(purchasedProduct.price) * Number(purchasedProduct.quantity),
    0
  );
  const averagePrice = Number(totalPrice) / Number(totalQuantity);
  console.log(averagePrice);
}

getAveragePrice(product_id);
