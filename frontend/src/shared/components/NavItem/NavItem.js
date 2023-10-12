import React from 'react';

import './NavItem.css';
import { NavLink } from 'react-router-dom';
const NavItem =({name,link,logout = null})=>{
    if(name==="Logout"){
        return <NavLink className="navItem" onClick={logout}>{name}</NavLink>
    }
    return(
            
            <NavLink className={({isActive})=> isActive ? "navItem navItemactive": "navItem "
        }to={link}>{name}</NavLink>
        
    )
}

export default NavItem;