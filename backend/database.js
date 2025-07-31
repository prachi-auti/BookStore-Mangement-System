const mongoose = require("mongoose");
const databaseconnection = async () => {

    mongoose.connect("mongodb://localhost:27017/BookOp").then(() => {
        console.log("Database Connected Successfully!!");
    }).catch((err) => {
        console.log("Database Connection Failed!!", err);
    }); 

};
module.exports=databaseconnection;