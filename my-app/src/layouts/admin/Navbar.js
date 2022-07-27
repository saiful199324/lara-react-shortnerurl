/* eslint-disable no-restricted-globals */
import axios from 'axios';
import React from 'react';
import {Link , useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
const Navbar = () => {

    const history = useNavigate();

    


    const logoutSubmit = (e)=> {
        e.preventDefault();
        axios.post('/api/logout').then(res=>{
          if(res.data.status === 200)
          {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            Swal.fire("Success!",res.data.message,"success");
            history('/login');
    
          }
        });
    
      }



    return (

        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
           
            <Link className="navbar-brand ps-3" to="#">Color Experts Inc.</Link>

            {/* <button onClick={window['alertHello']}></button> */}

            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars" onClick={window['alertHello']}></i></button>
         
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
                </div>
            </form>

            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            {/* <li><button type="button" onClick={logoutSubmit} className="nav-link btn btn-danger btn-sm text-white">Logout</button></li> */}
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link className="dropdown-item" to="#!">Settings</Link></li>
                        <li><Link className="dropdown-item" to="#!">Activity Log</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="#!" onClick={logoutSubmit}>Logout</Link></li>
                    </ul>
                </li>
            </ul>
           
        </nav>
        
    )
}

export default Navbar;