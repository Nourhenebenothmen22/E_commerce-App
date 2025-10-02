const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
}, { timestamps: true })
module.exports=mongoose.model('User',userSchema)