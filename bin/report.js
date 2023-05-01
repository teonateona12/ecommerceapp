#!/usr/bin/env node
import fs from "fs";

export default function getOrderReport() {
  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  const order = JSON.parse(fs.readFileSync("order.json"));

  const report = [];
  for (const orderedProduct of order) {
    const product = catalog.find(
      (product) => product.product_id === orderedProduct.product_id
    );
    const quantity = orderedProduct.quantity;
    const price = product.product_price;
    const sellPrice = orderedProduct.sell_price;
    const avgCost = (price + sellPrice) / 2;
    const cogs = avgCost * quantity;

    const orderReport = {
      product_id: orderedProduct.product_id,
      product_name: product.product_name,
      price,
      quantity,
      cogs,
      selling_price: sellPrice,
    };

    report.push(orderReport);
  }

  console.log(report);
  return report;
}

getOrderReport();
