import mysql from "mysql";

export const product_db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "productdb",
});
