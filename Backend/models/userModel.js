import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{type:String, required: true},
    email:{type:String, required: true, unique:true},
    password:{type:String, required: true},
    cartData:{type:Object, default:{}}
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
//if model exist then we use it if not then we create it
export default userModel;
