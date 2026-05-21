import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: {type:String, required: true},
    price:{type:Number, required:true},
    image:{type:String, required:true},
    category:{type:String, required:true}
})

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)
//here we use OR operator because if the model already exists then we use that or if not, then only we will create the model

export default foodModel;