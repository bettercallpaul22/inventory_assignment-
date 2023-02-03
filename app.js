import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import AuthRoute from "./routes/AuthRoute.js";

import { db } from "./user_db.js";
import productRoute from "./routes/productRoute.js";
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
db.connect((err)=>{
  if(err) throw err
  console.log("database connected")
})


const PORT = process.env.PORT;

app.listen(PORT, (req, res) => {
  console.log(`app running on PORT ${PORT}`);
});
 
app.use("/api/user", AuthRoute);
app.use("/api/product", productRoute);
 
