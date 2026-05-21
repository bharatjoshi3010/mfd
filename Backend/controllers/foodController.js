import foodModel from "../models/foodModels.js";
import fs from 'fs';
//here we are using this prebuilt file system of the node.js

//add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename

    })
    try {
        await food.save();  //to save the food item in database
        res.json({success:true,message:"Food Added"});
        //response for API testing
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}

// all food list 
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

//remove food item
const removeFood = async (req, res) => {
    try{
        //to delete that food image from the upload folder
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        //To delete the food item from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food removed"})
    }catch(error){
        res.json({success:false, message:"Error"})
    }
}

export {addFood, listFood, removeFood}