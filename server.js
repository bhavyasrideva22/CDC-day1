const express = require('express')
const app = express()
app.use((req,res,next)=>{
    if(10<20)next()
})
app.get('/home',(req,res)=>
{
    res.send("Everynight in my dream is see you")
})
app.listen(5050,()=>
{
    console.log("server connected")
})