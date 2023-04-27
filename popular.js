#!/usr/bin/env node
import fs from "fs";

const product_id = process.argv.slice(2)[0];

function getPopularProduct() {
  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  const order = JSON.parse(fs.readFileSync("order.json"));
  const productQuantities = {};

  for (const orderedProduct of order) {
    const { product_id, quantity } = orderedProduct;
    if (!productQuantities.hasOwnProperty(product_id)) {
      productQuantities[product_id] = 0;
    }
    productQuantities[product_id] += quantity;
  }

  let maxQuantity = 0;
  let popularProductId = null;

  for (const [product_id, quantity] of Object.entries(productQuantities)) {
    if (quantity > maxQuantity) {
      maxQuantity = quantity;
      popularProductId = product_id;
    }
  }

  if (popularProductId === null) {
    console.warn("Warning: No popular product found.");
    return null;
  }

  const popularProduct = catalog.find(
    (product) => product.product_id === popularProductId
  );
  console.log(popularProduct.product_name);
}
getPopularProduct(product_id);
