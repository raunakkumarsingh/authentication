
const mongoose =require('mongoose');
require('dotenv').config();
mongoose.set('strictQuery', true);

const mongo_URI=process.env.mongo_URI



const connectToMongo=()=>{
    mongoose.connect(mongo_URI, ()=>{
        console.log("Connect with mongo successfull");
    })
}

module.exports=connectToMongo