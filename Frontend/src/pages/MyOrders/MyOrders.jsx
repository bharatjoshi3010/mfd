import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets'

const MyOrders = () => {
  
  const {url, token} = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}});
    console.log("here is the response :",response)
    setData(response.data.data);
    console.log(response.data.data);
  }

  useEffect(()=>{
    if(token){
      fetchOrders();
    }
  },[token])   //also loads if token changes

  return (
    <div className='my-orders'>
      <h2>My orders</h2>
      <div className="container">
        {data.map((order, index)=>{
          return (
            <div key={index} className='my-orders-order'>
              <img src={assets.parcel_icon} alt="" />
              <p>{order.items.map((items, index)=>{
                if(index === order.items.length-1){     //for last item we do not have a comma
                  return items.name+" X "+items.quantity
                }
                else{
                  return items.name+" X "+items.quantity+","
                }
              })}</p>
              <p>{order.amount}.00 ₹</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span> <b>{order.status}</b></p>
              {/* this '&#x25cf;' is a hex code for making a bullet point */}
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders
