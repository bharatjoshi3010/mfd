import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'   //this is the list of all the menus that we are providing in our restaurant

const ExploreMenu = ({category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes. </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className='explore-menu-list-item'>
                    {/*
-> prev=>  it gives the present value of that usestate variable(it ensures we get the latest updated value of that usestate variable) 
->  If the clicked menu is already selected, reset the category to "All"(it shows all type of food no preference).
-> Otherwise, set the category to the clicked menu name.
-> This ensures we always work with the latest state value. */}
                    <img className={category===item.menu_name?"active":""} 
                    // the class name is dynamic, it changes that food image whose value is inside the category at that time
                    src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
