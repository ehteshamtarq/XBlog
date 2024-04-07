 const mongoose = require('mongoose');
 require("dotenv").config();
 const dbConnect = async() => {
    try {
        await mongoose.connect("mongodb+srv://tariqueehtesham1:1ISnwLQkV73daAmx@cluster0.rs1otjm.mongodb.net/xblog-db?retryWrites=true&w=majority&appName=Cluster0");
        console.log('DB Connected Sucessfully');
    }catch(error){
        console.log("DB Connection Failed", error.message);
    }
 };

 dbConnect();