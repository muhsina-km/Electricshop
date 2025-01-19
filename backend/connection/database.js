const mongoose =require("mongoose")

mongoose.connect("mongodb+srv://shop:shop123@cluster0.1ku13.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0",
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() =>{console.log("DB connected")
})
.catch(err=>console.log(err));