 const mongoose = require('mongoose');
 const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('DB Connected Sucessfully');
    }catch(error){
        console.log("DB Connection Failed", error.message);
    }
 };

 dbConnect();