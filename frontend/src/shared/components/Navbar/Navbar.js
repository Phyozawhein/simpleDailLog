import React from 'react';
import NavItem from '../NavItem/NavItem';
import './Navbar.css';
const Navbar =({navItems})=>{

    return(
        <ul className="navbar m-2 p-1 bg-white w-full border-2 border-black">
            {navItems.map((data,index)=> <li key={index}><NavItem name={data.name} link={data.path} logout={data.logout || null}/></li>)}
        </ul>
    )
}

export default Navbar;