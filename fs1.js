const fs1 = require('fs1')
fs1.writeFile("xyz.text","Every body rock your body",(err)=>{
if(err)console.log(err)
else console.log("Successfully updated")
})