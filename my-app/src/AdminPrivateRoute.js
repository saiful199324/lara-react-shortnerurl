import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route,useNavigate,Routes,Navigate,Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

import MasterLayout from "./layouts/admin/MasterLayout";

const AdminPrivateRoute = ({...rest}) => {

    const history = useNavigate();

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then( res => {
            if(res.status === 200)
            {
                setAuthenticated(true);
            }
            setloading(false);
        });
        return () =>{
            setAuthenticated(false);
        };
    },[]);
    axios.interceptors.response.use(undefined, function axiosRetryIntercepter(err){

        console.log(err.response.status);

        if(err.response.status ===401){
            Swal.fire("Unauthorize",err.response.data.message,"warning");
            history('/');
        }
        return Promise.reject(err);
    });

    axios.interceptors.response.use(function(response){
        return response;
    }, function(error) {
        if(error.response.status === 403)
        {
            Swal.fire('Forbidden', error.response.data.message, "warning");
            history('/403');
        }else if(error.response.status === 404){
            Swal.fire('404 Error', "URL/Page not Found", "warning");
            history('/404');
        }

        return Promise.reject(error);

    });

    if(loading)
    {
        return <h1>Loading...</h1>
    }


    return  Authenticated ? <MasterLayout/> : <Navigate to="/login" />;

   
     
     


    
    // return (

    //         <Routes>
                
    //             <Route  {...rest} 
    //             render= {({props, location}) => 
    //             Authenticated ?  
    //             ( <MasterLayout  {...props}/>) : 
    //             ( <Navigate to={ {pathname: "/login", state:{from: location}}}/>)
    //             } 
    //             element={<MasterLayout />}/>
    //         </Routes>

      

    // );
}

export default AdminPrivateRoute;