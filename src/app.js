const express = require("express");
const path = require("path")
const hbs = require("hbs");
// const expressLayouts = require('express-ejs-layouts');

const router = express.Router();
const Razorpay = require('razorpay');

const instance =new Razorpay({
    key_id: 'rzp_test_I7B5k56OyaFeCL',
    key_secret:'l6J6etbhbuiUM1N6PrLaqtvY'
});




require("./db/conn");
const app = express();
const port = process.env.PORT || 3000;
const Register = require("./models/registers")

let staticPath = path.join(__dirname,"/templates/views");
let templatePath = path.join(__dirname,"/templates/views");
let partialPath = path.join(__dirname,"/templates/partials");

hbs.registerPartials(partialPath)
app.set("view engine","hbs");
app.set("views",templatePath);
// app.use(expressLayouts);
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("dsn")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/index",(req,res)=>{
    res.render("index")
})
app.get("/terms",(req,res)=>{
    res.render("terms")
})
app.get("/loginError",(req,res)=>{
    res.render("loginError")
})
app.get("/payment",(req,res)=>{
    // res.send('Hello World');
    // router.get('/payment', (req, res)=> {
        var options = {
            amount: 4000,
            currency: 'INR',
        };
        instance.orders.create(options, function (err, order) {
            if (err) {
                console.log(err);
            } else {
                console.log(order);
                res.render('checkout.ejs', {amount: order.amount, order_id: order.id});
            }
        });
    // });
    
    
})
app.post("/register",async(req,res)=>{
    try{
        const password = req.body.pass;
        const cpassword = req.body.ConfirmPass;
        if(password===cpassword){
            const registerEmployee = new Register({
                firstname : req.body.firstName,
                lastname : req.body.lastName,
                email : req.body.Email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : req.body.pass,
                confirmpassword : req.body.ConfirmPass
            })
            const result = await registerEmployee.save();
            res.status(201).render("login")
        }else{
            res.send("Password not matched");
        }
    }catch(err){
        res.status(400).send(err);
    }
})

app.post("/login",async(req,res)=>{
    try {
        const email = req.body.email;
        const pass = req.body.password;
        const useremail = await Register.findOne({email:email});
        if(!useremail){
            res.send("loginError")
        }
        if (useremail.password === pass) {
            res.render("library");
        }
        else{
        res.render("loginError")
        }
    } catch (err) {
        res.status(400).send(err)
    }
})

app.listen(port,()=>{
    console.log("Program executed successfully at port ",port)
})