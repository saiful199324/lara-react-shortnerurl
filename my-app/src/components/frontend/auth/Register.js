import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../layouts/frontend/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

function Register(props) {

    const history = useNavigate();

    const[registerInput, setRegister]=useState({
        name:'',
        email: '',
        password:'',
        error_list: [],
    });

    const[inputtext,setinputtext]=useState({
        email:"",
        password:""
        });

    const[eye,seteye]=useState(true);
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(false);
    const handleInput = (e) =>{
        e.persist();
        setRegister({...registerInput,[e.target.name]: e.target.value });
        const name=e.target.name;
        const value=e.target.value;
        setinputtext((lastValue)=>{
        return{
        ...lastValue,
        [name]:value
        }
        });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data ={
            name: registerInput.name,
            email: registerInput.email,
            password:registerInput.password
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register',data).then(res=>{

                console.log(res.data);

                if(res.data.status === 200)
            {
                localStorage.setItem('auth_token',res.data.token);
                localStorage.setItem('auth_name',res.data.username);
                Swal.fire("Success!",res.data.message,"success");
                history('/admin/dashboard');
            }
            else if(res.data.status === 422)
            {
                setRegister({...registerInput, error_list: res.data.validate_err });
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
        <div className='container py-5'  style={{position: "absolute",top: "10%",left: "30%"}}>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header' style={{paddingTop:"20px"}}>
                            <h4>Register</h4>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={registerSubmit}>
                                <div className='form-group mb-3'>
                                    <label>Full Name</label>
                                    <input type="text" name='name' onChange={handleInput} value={registerInput.name} className='form-control'/>
                                    <span className="text-danger">{registerInput.error_list.name}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Email Id</label>
                                    <input type="email" name='email' onChange={handleInput} value={registerInput.email} className='form-control'/>
                                    <span className="text-danger">{registerInput.error_list.email}</span>
                                </div>
                                <div className='form-group mb-3'>
                                    <label>Password</label>
                                    <input type={password} className='form-control' placeholder="Enter your password" value={inputtext.password} onChange={handleInput} name="password" />
                                    <div className="input-text" style={{position: "relative",marginTop: "-40px"}}>
                                        <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" }`} style={{position:"absolute",right: "10px",top: "15px",cursor: "pointer"}}></i>
                                        <span className="text-danger">{registerInput.error_list.password}</span>
                                    </div>
                                </div>
                    
                                <div className='form-group mb-3' style={{marginTop:"60px"}}>
                                    <button type='submit' className='btn btn-primary'>Register</button>
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

export default Register;