#!/usr/bin/env node
import fs from "fs";

const product_id = process.argv.slice(2)[0];
const quantity = process.argv.slice(2)[1];

function orderProduct(product_id, quantity) {
  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  const existingProductIndex = catalog.findIndex(
    (product) => product.product_id === product_id
  );

  if (existingProductIndex === -1) {
    console.error(`Error: Product with ID ${product_id} not found in catalog.`);
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
  const existingOrderIndex = order.findIndex(
    (orderedProduct) => orderedProduct.product_id === product_id
  );
  if (existingOrderIndex > -1) {
    const existingQuantity = Number(order[existingOrderIndex].quantity);
    const newQuantity = existingQuantity + Number(quantity);
    order[existingOrderIndex].quantity = newQuantity.toString();
  } else {
    const orderedProduct = {
      product_id: product_id,
      quantity: quantity.toString(),
    };
    order.push(orderedProduct);
  }
  fs.writeFileSync("order.json", JSON.stringify(order, null, 2));

  const purchase = JSON.parse(fs.readFileSync("purchase.json"));
  const purchasedProducts = purchase.filter(
    (purchasedProduct) => purchasedProduct.product_id === product_id
  );
  if (purchasedProducts.length === 0) {
    console.warn(
      `Warning: No purchased products found for product with ID ${product_id}.`
    );
    console.error(
      `Error: Product with ID ${product_id} not found in purchase history.`
    );
    return;
  }
  let remainingQuantity = quantity;
  for (const purchasedProduct of purchasedProducts) {
    if (purchasedProduct.quantity < remainingQuantity) {
      remainingQuantity -= purchasedProduct.quantity;
      purchasedProduct.quantity = 0;
    } else {
      purchasedProduct.quantity -= remainingQuantity;
      remainingQuantity = 0;
      break;
    }
  }
  const ppurchase = purchase.filter(
    (purchasedProduct) => purchasedProduct.quantity > 0
  );
  fs.writeFileSync("purchase.json", JSON.stringify(ppurchase, null, 2));
}

orderProduct(product_id, quantity);
