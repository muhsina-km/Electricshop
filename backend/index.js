const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productroutes"); 
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes); 

mongoose
  .connect("mongodb+srv://shop:shop123@cluster0.1ku13.mongodb.net/product?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
