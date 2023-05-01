#!/usr/bin/env node
import fs from "fs";

function getOrderReport() {
  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  const order = JSON.parse(fs.readFileSync("order.json"));
  const report = [];
  for (const orderedProduct of order) {
    const product = catalog.find(
      (product) => product.product_id === orderedProduct.product_id
    );

    const quantity = Number(orderedProduct.quantity);

    const price = Number(product.product_price);
    const cogs = quantity * Number(product.cost);
    const sellingPrice = quantity * price;
    const orderReport = {
      product_id: orderedProduct.product_id,
      product_name: product.product_name,
      quantity: quantity,
      price: price,
      cogs: cogs,
      selling_price: sellingPrice,
    };
    report.push(orderReport);
  }
  console.log(report);
}
getOrderReport();
