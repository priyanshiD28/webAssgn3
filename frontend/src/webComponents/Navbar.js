import React, {useEffect, useState} from 'react';
import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import {useData} from '../DataContext';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
    const [path, setPath] = useState('');
    const getNavLinkClass = ({ isActive }) => {
        // console.log(isActive, "isactive")
        return isActive ? "nav-link border border-light rounded text-white px-2" : "nav-link text-white px-2";
      };

    const {
        searchQuery, setSearchQuery, 
    } = useData();


    useEffect(() => {
        if (searchQuery == "") {
            //console.log(searchQuery);
            setPath('home');
        }
        else {
            setPath(searchQuery);
        }
    })

    // const checkPath = () => {
    //     if (searchQuery == "") {
    //         console.log(searchQuery);
    //         setPath('home');
    //     }
    //     else {
    //         setPath(searchQuery);
    //     }
    // };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom-blue ">
        <div className="container-fluid">
            {/* Brand/Title */}
            <NavLink className="navbar-brand text-white" to={`/search/${path}`}>Stock Search</NavLink>

            {/* Toggler/collapsible Button */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar links */}
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <NavLink className={getNavLinkClass} to={`/search/${path}`}>Search</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/watchlist">Watchlist</NavLink>
                {console.log('Watchlist')}
                </li>
                <li className="nav-item">
                <NavLink className={getNavLinkClass} to="/portfolio">Portfolio</NavLink>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    );
};

export default Navbar;