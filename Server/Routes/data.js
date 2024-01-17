const express = require('express')
const Data = require('../Models/datamodel')
// const fetchuser = require('../Middleware/fetch')
const { findByIdAndUpdate } = require('../Models/datamodel')
const role = require('../Middleware/role')
const router = express.Router()


router.post('/adddata',role("admin"), async (req,res) => {
try{
   let data= await Data.create({
    name:req.body.name,
    mobileno:req.body.mobileno,
    jobrole:req.body.jobrole
   });
  
    res.json(data)

}
catch(error){
    console.error(error.message);
    res.status(400).json({error:"Not signed up"})
}

})


router.get('/getdata',role("user","admin"), async (req,res)=>{

    try{
        Data.find({}, (err, data) => {
            if (err) {
                res.status(400).json(err)
            } else {
                
                const jsonData = JSON.stringify(data);
                res.json(jsonData)
            }
        })
}
    catch(error){
        res.status(400).json({error:"Error in fetching Data"})
    }
})


module.exports = router;
