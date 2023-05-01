#!/usr/bin/env node
import fs from "fs";

const product_id = process.argv.slice(2)[0];

const getProductProfit = (product_id) => {
  const orders = JSON.parse(fs.readFileSync("order.json"));

  const relevantOrders = orders.filter(
    (order) => order.product_id === product_id
  );

  if (relevantOrders.length === 0) {
    console.log(`No orders found with product ID ${product_id}`);
    return;
  }

  let totalRevenue = 0;
  let totalQuantity = 0;

  for (const order of relevantOrders) {
    const quantity = Number(order.quantity);
    const sellPrice = Number(order.sell_price);
    totalRevenue += quantity * sellPrice;
    totalQuantity += quantity;
  }

  const averagePrice = totalRevenue / totalQuantity;

  const purchase = JSON.parse(fs.readFileSync("purchase.json"));
  const purchasedProducts = purchase.filter(
    (purchasedProduct) => purchasedProduct.product_id === product_id
  );

  if (purchasedProducts.length === 0) {
    console.log(`No purchased products found with product ID ${product_id}`);
    return;
  }

  const totalquantity = purchasedProducts.reduce(
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
  const averagePurchase = Number(totalPrice) / Number(totalquantity);
  const profitPerUnit = averagePrice - averagePurchase;
  const totalProfit = totalQuantity * profitPerUnit;
  console.log(totalProfit);
};

getProductProfit(product_id);
