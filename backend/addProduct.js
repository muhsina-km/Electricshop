const mongoose = require("mongoose");
const productModel = require("./models/product");

mongoose.connect("mongodb+srv://shop:shop123@cluster0.1ku13.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Database connected");

    const products = [
      { name: "LED Bulb", price: 60 },
      { name: "Tube Light", price: 150 },
      { name: "Fan", price: 1200 },
      { name: "Switch", price: 20 },
    ];

    return productModel.insertMany(products);
  })
  .then((result) => {
    console.log("Products added successfully:", result);
    setTimeout(() => mongoose.disconnect(), 5000);
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.disconnect();
  });
