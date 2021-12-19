const mongoose = require("mongoose")


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/registrationForm',
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(()=>console.log("connection successful....")).catch((err)=>console.log(err));