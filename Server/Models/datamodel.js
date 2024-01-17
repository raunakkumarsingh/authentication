const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema({
      name:{
        type:String,
        required:true
      },
      mobileno:{ 
        type:String,
        required:true
      },
      jobrole:{
        type:String,
        required: true
      }
})
const Data=mongoose.model('Data',dataSchema)
Data.createIndexes()
module.exports = Data