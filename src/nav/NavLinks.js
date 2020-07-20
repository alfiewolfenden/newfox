import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavLinks.css'

const NavLinks = () => {

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/signin" exact>SIGN IN</NavLink>
            </li>
            <li>
                <NavLink to="/signup">SIGN UP</NavLink>
            </li>
            <li>
                <NavLink to="/catalog">CATALOG</NavLink>
            </li>
        </ul>
    )
};

export default NavLinks;