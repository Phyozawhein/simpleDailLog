import React from 'react';
import './Navbar.css';
import NavItem from '../NavItem/NavItem';
import { useContext } from 'react';
import AuthContext from '../../../context/auth/auth-context';
const Navbar =({navItems})=>{
    const auth = useContext(AuthContext)
    return(
        <nav className="navbar">
            {navItems.map((item,index) =><NavItem key={index} name={item.name} path={item.path}/>)}
            <button className="navbar-logout" onClick={auth.logout}>Logout</button>
        </nav>
    )
}

export default Navbar;