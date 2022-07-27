/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-template-curly-in-string */
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Short_URL = () => {
    const [count,setCount] = useState(0);
    const [ip,setIp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shortlinks, setshortlinks] = useState([]);

    useEffect(() => {

        axios.get(`/api/generate-shorten-link`).then(res=>{
            if(res.status === 200)
            {
                // console.log(res.data);
                setshortlinks(res.data.shortlinks)
                setIp(res.data.ip)
                setLoading(false);
            }
        });

    }, []);




    if(loading)
    {
        return <h4>Loading Customer Data...</h4>
    }
    else
    {
        var student_HTMLTABLE = "";
        console.log(ip);
       
        student_HTMLTABLE = shortlinks.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1 }</td>
                     <td>
                     {count === 3 ? <a href="#" onClick={ (event) => event.preventDefault() }>{item.code}</a> : <a target="_blank" href={item.link} onClick={(ip)=>setCount(count+1)}>{item.code}</a>}
                      </td>
                    <td>{item.link}</td>
                </tr>
            );
        });
    }

    return (
        <div>
            <div className="container" style={{top: "5%"}}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header" style={{paddingTop:"20px"}}>
                                <h4>URL List</h4>
                                <Link to="/admin/add-short-url" className="btn btn-primary btn-sm" style={{height: "1%"}}> Add Shorten URL</Link>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                        <th>ID</th>
                                        <th>Short Link</th>
                                        <th>Link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Short_URL