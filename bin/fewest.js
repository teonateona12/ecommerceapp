#!/usr/bin/env node
import fs from "fs";

function getFewestProduct() {
  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  const order = JSON.parse(fs.readFileSync("order.json"));

  const productQuantities = order.reduce((accumulator, orderItem) => {
    const { product_id, quantity } = orderItem;
    if (!accumulator[product_id]) {
      accumulator[product_id] = 0;
    }
    accumulator[product_id] += quantity;
    return accumulator;
  }, {});

  const sortedProductIds = Object.keys(productQuantities).sort(
    (productIdA, productIdB) =>
      productQuantities[productIdA] - productQuantities[productIdB]
  );

  const fewestProduct = catalog.find(
    (product) => product.product_id === sortedProductIds[0]
  );

  console.log(fewestProduct.product_name);
}

getFewestProduct();
