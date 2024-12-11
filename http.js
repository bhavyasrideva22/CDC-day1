const http = require('http')
const serv = http.createServer((req,res) => {
    res.write("such feeling comin ove on me")
    res.end()
})
serv.listen(5050,()=>{
    console.log("server started")
})