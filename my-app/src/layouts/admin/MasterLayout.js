/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import {Routes,Route,Navigate } from 'react-router-dom';
import '../../assets/admin/css/styles.css'
import '../../assets/admin/js/datatables-simple-demo.js'
import '../../assets/admin/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css'
import '../../assets/admin/assets/plugins/custom/datatables/datatables.bundle.css'
import '../../assets/admin/assets/plugins/global/plugins.bundle.css'
import '../../assets/admin/assets/css/style.bundle.css'

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

import routes from '../../routes/routes';

const MasterLayout = () => {
    return (
        <div className='sb-nav-fixed'>
            <Navbar/>
                <div id="layoutSidenav">
                        <div id="layoutSidenav_nav">
                            <Sidebar/>
                        </div>
                        <div id="layoutSidenav_content">
                            <main>
                                
                                <Routes>
                                {routes.filter(route => route.component)
                                .map(({ path, component: Component }, idx) => (
                                    <Route
                                    key={idx}
                                    path={path}
                                    element={<Component />}
                                    />
                                ))}
                                    <Route path='*' element={<Navigate to='dashboard' />} />
                                </Routes>
                            </main>
                            <Footer/>
                        </div>
                </div>
                <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest"></script>
                <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js"></script>
        </div>
    )
}

export default MasterLayout;