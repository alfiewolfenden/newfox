import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../shared/context/auth-context';
import './NavLinks.css'

const NavLinks = () => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/signin" exact>SIGN IN</NavLink>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <NavLink to="/signup">SIGN UP</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <NavLink to="/catalog">CATALOG</NavLink>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <button onClick={auth.logout}>LOGOUT</button>
                </li>
            )}
        </ul>
    )
};

export default NavLinks;