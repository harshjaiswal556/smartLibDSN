const mongoose = require("mongoose");
const validator = require("validator");
const employeeSchema = new mongoose.Schema({
    firstname :{
        type:String,
        required:true
    },
    lastname :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:[true,"This email has already been registered"],
        validate(value){
            if(validator.isEmail(value)==false){
                throw "Invalid Email"
            }
        }

    },
    gender:{
        type:String,
        required:false
    },
    phone:{
        type:Number,
        required:true,
        unique:[true,"This mobile no has been already registered"]
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    }
})

const Register = new mongoose.model("Register",employeeSchema);

module.exports=Register;