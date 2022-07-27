import React from 'react'
import {useState} from "react"
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const InputShortner = ({setInputValue})=> {
  const history = useNavigate();
    const [studentInput, setStudent] = useState({
        name: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setStudent({...studentInput, [e.target.name]: e.target.value });
        // console.log(e.target.value);
    }
    const saveStudent = (e) => {
        e.preventDefault();
        
        const data = {
            link:studentInput.name,
        }

        axios.post(`/api/generate-shorten-link`, data).then(res => {
            console.log(res.data.message);
            console.log(res.data.status);

            if(res.data.status === 200)
            {
                Swal.fire("Success!",res.data.message,"success");
                history('/admin/short-url');
            }
            else if(res.data.status === 422)
            {
                setStudent({...studentInput, error_list: res.data.validate_err });
            }
        });
    }
  return (
    <div>
        <div className="container" style={{position: "absolute",top: "5%",left: "20%"}}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header" style={{paddingTop:"20px"}}>
                            <h4>Add URL </h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={saveStudent} >
                                <div className="form-group mb-3">
                                    <label>URL</label>
                                    <input type="text" name="name" onChange={handleInput} value={studentInput.name} className="form-control" />
                                    <span className="text-danger">{studentInput.error_list.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" className="btn btn-primary">Save URL</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InputShortner