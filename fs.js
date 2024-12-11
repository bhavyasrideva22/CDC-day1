const fs = require('fs')
fs.readFile('abc.text',(err,data)=>{
    if(err) console.log(err)
    else console.log(data.toString())
})
fs.writeFile("xyz.text","Every body rock your body",(err)=>{
    if(err)console.log(err)
    else console.log("Successfully updated")
    })
fs.appendFile("xyz.text","Your Backstreet back",(err)=>{
    if(err)console.log(err)
        else console.log("successfully updated")
})
fs.unlink("xyz1.text",(err)=>
{
    if(err)console.log(err)
    else console.log("Deleted")
})
fs.rename("abc.text","def.text",(err)=>{
    if(err)console.log(err)
    else console.log("Renamed")
})