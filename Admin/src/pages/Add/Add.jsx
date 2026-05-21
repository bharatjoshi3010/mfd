import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

    // making state variable for storing the image
    const [image, setImage] = useState(false);
    //making a state object variable for storing all other fields
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Indian Fast Food"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // extracted name and value from this event
        setData(data => ({ ...data, [name]: value }))
    }

    // This function is a universal onChange handler for form inputs: when any input field 
    // changes,it receives the event object, where `event.target` refers to the input element that triggered
    // the change. From this target, `event.target.name` gives the field identifier and
    // `event.target.value` gives the current user-entered value.
    // Example: for <input name="email" value="user@gmail.com" onChange={onChangeHandler} />,
    // event.target.name === "email" and event.target.value === "user@gmail.com".
    // The function then updates React state using setData by copying the previous state and
    // dynamically updating only the matching key ([name]: value), so other form fields remain
    // unchanged and the state update stays safe even with asynchronous renders.


    //to chechk this is working properly or not
    // useEffect(()=>{
    //     console.log(data);
    // },[data])

    // ********************************************************
    //now we have all the data of this page so now we call the API ---> 
    const onSubmitHandler = async (event) => {
        event.preventDefault();    //stops reloading of webpage when we click on 'Submit/Add' button
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);   //it calls the backend and run the post add route 
        if (response.data.success) {
            //if success then we have to clear the input fields
            setData({
                name:"",
                description:"",
                price:"",
                category:"Indian Fast Food"
            })
            setImage(false)
            toast.success(response.data.message)  //toast a success msg
        } else {
            toast.error(response.data.message)  //toast a error msg
        }
    }

    return (
        <div className='add'>
            <form action="" className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        {/* this will show a upload logo if any image is not set, and if we select a image then -> 
                URL.createObjectURL(image) -> it will convert that object to url and in this block that selected image will be displayed */}
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                    {/* this htmlFor attribute of <label> is connecting this label with <input> having id attri
            bute same as htmlFor */}
                    {/* onchange :-> it will trigger when user select an image and store the first selected image in 'Image' state variable */}
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} value={data.category} name="category">
                            <option value="Indian Fast Food">Indian Fast Food</option>
                            <option value="North Indian">North Indian</option>
                            <option value="South Indian">South Indian</option>
                            <option value="Parathe">Parathe</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Braveges">Braveges</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Local Dishes">Local Dishes</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='20 Rupees' />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add
