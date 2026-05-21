import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    //Initializes state as an empty object.
    //we make it to store all cart details in a single Object

    //url of our backend
    const url =  "https://mfd-5cku.onrender.com"
    // "http://localhost:4000"         //we define it from here so we can access it from anywhere
    const [token, setToken] = useState("")          //token for chceking whether user is logged in or not
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {   //Checks whether the item already exists in the cart.
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
            // ...prev ->  Copies all existing cart items (immutability).
            //[itemId]: 1   Adds the item with quantity = 1.
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
            //Uses prev[itemId] to get the current quantity.
        }
        //calling the api so that changes also get updated in the backend
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        //removing from the db also
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])    //whenever cartItems updates it will run

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");             //get the food list form the API which brings the data from the DB
        setFoodList(response.data.data)
    }

    //loading the users cart details
    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {              //updates the value of token by taking it from localStorage so that we do not logout on each refresh
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {       //we exporting all these things through contextAPI so that these can be accessed by any component of the page
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider