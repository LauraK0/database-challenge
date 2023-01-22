const db = require("../database/db.js");

module.exports = { listProducts, searchProducts };

const select_products = db.prepare(/*sql*/ `
  SELECT
    id,
    name,
    quantity_per_unit,
    FORMAT('£%.2f', unit_price) AS unit_price,
    units_in_stock,
    FORMAT('£%.2f', unit_price * units_in_stock) AS stock_value,
    units_on_order
  FROM products
`);

const search_products = db.prepare(/*sql*/ `
  SELECT
    id,
    name
  FROM products
  WHERE name LIKE ?
`);

function listProducts() {
  return select_products.all();
}

function searchProducts(search_term) {
  return search_products.all("%" + search_term + "%");
}
