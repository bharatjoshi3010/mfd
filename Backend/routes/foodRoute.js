import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";  //dont forget to add .js at end
import multer from "multer";

const foodRouter = express.Router();

//Image storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`);
        //it will make a unique name for the file starting with date and then original name of the file
    }
})

const upload = multer({storage: storage})  //now upload is a middlewere which helps in storing the image data in the uploads folder(we provided storage(created by us) as storage configuration)

//in this add post route the middlewere upload will work..
foodRouter.post("/add",upload.single("image"), addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove", removeFood)

export default foodRouter;