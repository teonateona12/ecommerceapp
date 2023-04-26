#!/usr/bin/env node
import fs from "fs";

const product_id = process.argv.slice(2)[0];
const product_name = process.argv.slice(2)[1];
const product_price = process.argv.slice(2)[2];

function saveProduct(productId, productName, productPrice) {
  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  const existingProductIndex = catalog.findIndex(
    (product) => product.product_id === productId
  );

  if (existingProductIndex > -1) {
    catalog[existingProductIndex].product_name = productName;
    catalog[existingProductIndex].product_price = productPrice;
    console.log(
      `Product updated in catalog.json: {product_id: "${productId}", product_name: "${productName}", product_price: "${productPrice}"}`
    );
  } else {
    const product = {
      product_id: productId,
      product_name: productName,
      product_price: productPrice,
    };
    catalog.push(product);
    console.log(
      `Product saved to catalog.json: {product_id: "${productId}", product_name: "${productName}", product_price: "${productPrice}"}`
    );
  }

  fs.writeFileSync("catalog.json", JSON.stringify(catalog, null, 2));
}
saveProduct(product_id, product_name, product_price);
