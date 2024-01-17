const express=require('express')
const connectToMongo=require('./db')
const cors=require('cors')

const app=express()
connectToMongo()

port=process.env.PORT || 5000

app.use(express.json())
app.use(cors())

// app.use('/api/mail',require('./Routes/mail'))
app.use('/api/auth',require('./Routes/auth'))
app.use('/api/data',require('./Routes/data')) 



app.get('/',(req,res)=>{
   console.log("hello World");
})




app.listen(port,()=>{
    console.log(`auth-server is listening on port http://localhost:${port}`)
})

