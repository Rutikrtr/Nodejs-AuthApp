const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL )
    .then(()=> console.log("DB connection Success"))
    .catch((err)=> {
        console.log(err);
        console.error(err);
        process.exit(1);
    })
}