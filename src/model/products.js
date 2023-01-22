const db = require("../database/db.js");

module.exports = { listProducts, searchProducts, getProduct };

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

const get_product = db.prepare(/*sql*/ `
  SELECT
    products.id,
    products.name,
    categories.name AS category_name,
    categories.description AS category_description
  FROM products
  JOIN categories ON products.category_id = categories.id
  WHERE products.id = ?
`);

function listProducts() {
  return select_products.all();
}

function searchProducts(search_term) {
  return search_products.all("%" + search_term + "%");
}

function getProduct(id) {
  return get_product.get(id);
}
