/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import {Link} from 'react-router-dom';

const Sidebar = () => {
    return (
        <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright © 2013-2022 <a target="_blank" href="http://codewithsaif2475.com/">Md. Saiful Islam</a>. All Rights Reserved</div>
                            <div>
                                <Link to="#">Privacy Policy</Link>
                                &middot;
                                <Link to="#">Terms &amp; Conditions</Link>
                            </div>
                        </div>
                    </div>
                </footer>
        
    )
}

export default Sidebar;