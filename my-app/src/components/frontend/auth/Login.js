/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import {Link, useNavigate } from 'react-router-dom';
import Navbar from '../../../layouts/frontend/Navbar';
import Swal from 'sweetalert2';


function Login(props) {

    const history = useNavigate();

    const [loginInput,setLogin] = useState({
        email: '',
        password:'',
        error_list:[],
    });

    const[inputtext,setinputtext]=useState({
        email:"",
        password:""
        });

    const[eye,seteye]=useState(true);
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(false);

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value });

        const name=e.target.name;
        const value=e.target.value;
        setinputtext((lastValue)=>{
        return{
        ...lastValue,
        [name]:value
        }
        });
    }

    const loginSubmit = (e) =>{
        e.preventDefault();

        const data ={
            email:loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {

            axios.post(`api/login`,data).then(res=>{

                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_name',res.data.username);
                    Swal.fire("Success!",res.data.message,"success");
                    if(res.data.role === 'admin'){
                        history('/admin/dashboard');
                    }else{
                        history('/'); 
                    }
                    
                }
                else if(res.data.status === 401)
                {
                    Swal.fire("Warning",res.data.message,"Warning");
                }else{
                    setLogin({...loginInput, error_list: res.data.validate_err });
                }

                });
        });
    }
    const Eye=()=>{
        if(password==="password"){
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else{
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }
    return (
        <div>
        <Navbar/>
        <div className='container py-5' style={{position: "absolute",top: "10%",left: "30%"}}>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header' style={{paddingTop:"20px"}}>
                            <h4>Login</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={loginSubmit}>
                                <div className='form-group mb-3'>
                                    <label>Email Id</label>
                                    <input type="email" name='email' onChange={handleInput} value={loginInput.email} className='form-control'/>
                                    <span className="text-danger">{loginInput.error_list.email}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Password</label>
                                    <input type={password} className='form-control' placeholder="Enter your password" value={inputtext.password} onChange={handleInput} name="password" />
                                    <div className="input-text" style={{position: "relative"}}>
                                        <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`} style={{position:"absolute",right: "10px",top: "-25px",cursor: "pointer"}}></i>
                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                    </div>
                                </div>                  
                                <div className='form-group mb-3'>
                                    <button type='submit' className='btn btn-primary'>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'></div>
            </div>
        </div>
        </div>
    );
}

export default Login;