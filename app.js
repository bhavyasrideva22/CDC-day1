const express=require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const ejs=require('ejs')
const session=require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session) 
const User=require('./model/User')
const bcrypt=require('bcryptjs')
const app=express()
dotenv.config()
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.URI)
.then(()=>{
   console.log("DB Connected")
})
.catch((err)=>{console.log("Error", err)})

const store=new MongoDBStore({
    uri:process.env.URI,
    collection:"mySessoin"
})
app.use(session({
    secret: 'hai',
    resave: false,
    saveUninitialized: false,
    store:store
  }))
app.set('view engine','ejs')
const checkAuth = (req, res, next) => {
    if (req.session.isAuthicated) {
        next()
    } else {
        res.redirect('/signUp')
    }
}
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/signUp',(req,res)=>{
    res.render('register')
})
app.get('/dashboard',checkAuth,(req,res)=>{
    res.render('welcome')
})
app.post('/register',async(req,res)=>{
    const{username, email, password}=req.body
    let user=await User.findOne({email})
    if(user){
        return res.redirect('/signUp')
    }
    const hashpass=await bcrypt.hash(password,12)
    user=new User(
        {username,email,password:hashpass}
    )
    await user.save()
    req.session.person=user.username
    res.redirect('/login')
})
app.post('/user-login', async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.redirect('/signUp')
    }
    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
        return res.redirect('/signup')
    }
    req.session.isAuthicated = true
    res.redirect('/dashboard')
})
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/signup')
    })
})
app.listen(5050,()=>{
    console.log('server connected')
})