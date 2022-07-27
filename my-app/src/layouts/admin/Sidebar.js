import React from 'react';
import {Link} from 'react-router-dom';
const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <Link className="nav-link" to="dashboard">
                    <div className="sb-nav-link-icon"><i className="fas fa-clock"></i></div>
                    Dashboard
                </Link>
                <Link className="nav-link" to="short-url">
                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Short URL
                </Link>
            </div>
        </div>
    </nav>
    )
}

export default Sidebar;