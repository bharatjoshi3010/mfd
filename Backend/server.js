// npm i express mongoose jsonwebtoken bcrypt cors dotenv body-parser multer stripe validator nodemon 
//cors -> help in connecting frontend and backend
//stripe -> Initialize the Stripe client with your secret key
// We installed thunderClient for API testing, its a VS code extension
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"  //dont forget to add '.js' here
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'     //it include env file in our project
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


//app config
const app = express()
const port = process.env.PORT || 4000;

//middleware
app.use(express.json())
app.use(cors())

// db connection
connectDB()

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))  //by this we are accessing upload folder for image route's static files 
// (if you write 'http://localhost:4000/images/17700344050471762882081133.jpg' -> http://localhost:4000/images/nameOfimgStoredInUploadsFolder.jpg it in the browser it will show an image )
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res)=>{
    res.send("API working")
})

app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://manjuskitchenn:joshibharat@cluster0.jwqf2e8.mongodb.net/?appName=Cluster0
//you get this mongodb connetion string from mongoDB atlas while you create a cluster/Database