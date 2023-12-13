import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomHook from './../Hooks/CustomHook';

const AdminUsersUpdate = () => {
    const { id } = useParams();
    const [apiData, setApiData] = useState();
    // const [formData, setFormData] = useState({username:""});
    const { handleChange, inp, errors,updatedData } = CustomHook(apiData, { usernameError: "" });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getDataUserDataById()
    }, [])
    const getDataUserDataById = async () => {
        const response = await fetch(`http://localhost:3004/users/${id}`, {
            method: 'PATCH',
        });
        const data = await response.json();
        console.log("data inside fetch api",data);
        updatedData(data)
        console.log(data);
        setApiData(data);
        setLoading(true);
    }
    const updateDataUserDataById = async () => {
        const response = await fetch(`http://localhost:3004/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inp)
        });
        const data = await response.json();
        console.log("data inside fetch api",data);
        // updatedData(data)
        // console.log(data);
        // setApiData(data);
        setLoading(true);
    }
    return (
        <>
            <div className="card my-2 mb-2">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <h2>Edit Users</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                        {JSON.stringify(apiData)}
                        <p>input data</p>
                        {JSON.stringify(inp)} 
                            {JSON.stringify(errors)}
                            <input type="text" placeholder='Enter User Name' value={loading ? inp.username: "false"} onChange={handleChange} onBlur={handleChange} className='form-control' name="username" id="username" autoComplete='off' />
                            {/* <input type="text" placeholder='Enter User Name' value={loading ? inp.username: "false"} onChange={(event)=>{ setInp(...inp,[name]:val) }} onBlur={handleChange} className='form-control' name="username" id="username" autoComplete='off' /> */}
                            {errors.usernameError ? <span>This field is Required</span> : <></>}
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col">
                            <input type="button" onClick={updateDataUserDataById} className='btn btn-primary' value="update" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminUsersUpdate;