import { product_db } from "../product_db.js";

// ADD A PRODUCT
export const addproducts = async (req, res) => {
  try {
    const { name, description, total_in_stock } = req.body;
    product_db.query(
      "SELECT name FROM product_table WHERE name =?",
      [name],
      async (err, product) => {
        if (err) return res.status(400).json({ message: err.sqlMessage });
        if (product.length !== 0)
          return res.status(400).json({ message: "product already in stock" });
        else {
          const values = [name, description, total_in_stock];
          const action =
            "INSERT INTO `product_table`( `name`, `description`, `total_in_stock`) VALUES (?)";
          product_db.query(action, [values], (err, product) => {
            if (err) return res.send(err.sqlMessage);
            res.status(200).json("product added successfully");
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const action = "SELECT * FROM `product_table` WHERE 1";
  product_db.query(action, (err, products) => {
    if (err) res.status(400).json(err);
    res.status(200).json(products);
  });
};

// GET SINGLE PRODUCT
export const singleProduct = async (req, res) => {
  const action = "SELECT * FROM product_table WHERE product_id =?";
  await product_db.query(action, [req.params.productId], (err, product) => {
    if (err) res.status(400).json(err.sqlMessage);
    res.status(200).json(product[0]);
  });
};

// UPDATE A PRODUCT
export const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  const { name, description, total_in_stock } = req.body;

  const action =
    "UPDATE product_table SET name=?, description=?, total_in_stock=? WHERE product_id=?";
  product_db.query(
    action,
    [name, description, total_in_stock, productId],
    (err) => {
      if (err) res.status(400).json(err.sqlMessage);
      res.status(200).json({message:"Stock updated successfully"});
    }
  );
};

// DELETE A PRODUCT
export const deleteProduct = async (req, res) => {
  const action = "DELETE FROM `product_table` WHERE product_id=?";
  await product_db.query(action, [req.params.productId], (err, product) => {
    if (err) res.status(400).json(err.sqlMessage);
    res.status(200).json("product deleted successfully");
  });
};