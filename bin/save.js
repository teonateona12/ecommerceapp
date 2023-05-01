#!/usr/bin/env node
import fs from "fs";

const product_id = process.argv.slice(2)[0];
const product_name = process.argv.slice(2)[1];
const product_price = process.argv.slice(2)[2];

function saveProduct(productId, productName, productPrice) {
  const catalog = JSON.parse(fs.readFileSync("catalog.json"));
  if (!productId || !productName || !productPrice) {
    console.error(
      "Error: productId, productName, or productPrice is undefined."
    );
    return;
  }
  if (!(+productPrice > 0)) {
    console.error("Error: productPrice is not a number.");
    return;
  }
  if (productName.trim().length === 0 || productId.trim().length === 0) {
    console.error("Error: product name or product id is requered");
    return;
  }
  const existingProductIndex = catalog.findIndex(
    (product) => product.product_id === productId
  );

  if (existingProductIndex > -1) {
    catalog[existingProductIndex].product_name = productName;
    catalog[existingProductIndex].product_price = +productPrice;
    console.log(
      `Product updated in catalog.json: {product_id: "${productId}", product_name: "${productName}", product_price: "${productPrice}"}`
    );
  } else {
    const product = {
      product_id: productId.trim(),
      product_name: productName.trim(),
      product_price: +productPrice.trim(),
    };
    catalog.push(product);
    console.log(
      `Product saved to catalog.json: {product_id: "${productId}", product_name: "${productName}", product_price: "${productPrice}"}`
    );
  }

  fs.writeFileSync("catalog.json", JSON.stringify(catalog, null, 2));
}
saveProduct(product_id, product_name, product_price);
