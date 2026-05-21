import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { useEffect } from 'react'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"


const LoginPopup = ({setShowLogin}) => {

  const {url, setToken} = useContext(StoreContext)   //accessing the things with ContextAPI

    const [currState, setCurrState] = useState("Sign Up")   //to switch b/w signup form and login form

    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }
    //described its working on admin panels addFoodpage

    //to check onChange handler is working or not
    // useEffect(()=>{
    //   console.log(data);
    // },[data])


    const onLogin = async (event) => {
      event.preventDefault()  //stops from refreshing the page while we click on submit
      let newUrl = url;
      if (currState==="Login") {
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)     //Storing the token in localStorage of web-browser
        setShowLogin(false)
      }else{
        alert(response.data.message)
      }

    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required/>}
            {/* if we are in login page then this 'Your name' field will not show here */}
            <input type="text" name='email' onChange={onChangeHandler} value={data.email} placeholder='Your email' required/>
            <input type="text" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {
            currState==="Login"
            ?<p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p>
            :<p>Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup
