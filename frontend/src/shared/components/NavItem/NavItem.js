import React from 'react';
import './NavItem.css';
import { NavLink } from 'react-router-dom';

const NavItem =(props)=>{
    return <NavLink to={props.path}>
        {props.name}
    </NavLink>
}

export default NavItem;