import React, { useEffect, useState } from 'react';
import "./loginregist.css";
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const LoginCompo = () => {
  let [status, setStatus] = useState(true);
  const navigate = useNavigate();
  // let [formData, setFormData] = useState({"role_id":2})
  let [formData, setFormData] = useState();
  const [loginMsg, setLoginMsg] = useState(false);
  const [cookies, setCookie] = useCookies(['name']);

  useEffect(()=>{
    console.log("inside useEffect called");
    if (formData == "") {
      console.log("called");
    }
  },[formData])
  const setDataInFormState = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const Registration = async () => {

    // console.log(formData);
    // console.log();
    let data = {...formData,"role_id":1};
    // console.log(data);
    // return false
    // fetch('https://jayramin.000webhostapp.com/allusers').then(res=>res.json()).then((result)=>{ console.log(result); })
    await fetch('http://localhost:3004/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'token': 'kaipan',
      },
      body: JSON.stringify(data)
    }).then(res => {
      // console.log(res); 
      return res.json()
    }).then((result) => {
      // redirect("http://localhost:3000/#/singin")
      // console.log(result);
      setStatus(true)
      setFormData({})
      // setFormData({"username":""})
      console.log("setFormData",formData);
    })
    // console.log("called");
  }
  const Login = async () => {

    axios.get(`http://localhost:3004/users?username=${formData.username}&password=${formData.password}`)
    .then(function (response) {
      // handle success
      // setCookie('name',"newName");
      console.log(response);
      console.log(response.data.length);
      console.log(response.data);
      console.log(response.data[0]);
      if (response.data.length > 0) {
        setCookie('role_id',response.data[0].role_id);
        setCookie('user_id',response.data[0].id);
        setLoginMsg(false);
        if (response.data[0].role_id == 1) {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setLoginMsg(true)
        
      }
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    // console.log(formData);
    // await fetch('http://localhost:3004/users', {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json; charset=UTF-8',
    //     'token': 'kaipan',
    //   },
    //   body: JSON.stringify(formData)
    // }).then(res => {
    //   // console.log(res); 
    //   return res.json()
    // }).then((result) => {
    //   // redirect("http://localhost:3000/#/singin")
    //   // console.log(result);
    //   setStatus(true)
    //   setFormData({})
    //   // setFormData({"username":""})
    //   console.log("setFormData",formData);
    // })
    // console.log("called");
  }


  return (
    <>
      <div className="body-auth">
        <div className={(status) ? "container-auth " : "container-auth log-in"}>
          <Link to='/' className='position-relative zindex'>
            <i className='fa fa-home text-white p-1 d-block position-absolute'></i>
          </Link>
          <div className="box"></div>
          <div className="container-auth-forms">
            <div className="container-auth-info">
              <div className="info-item">
                <div className="table">
                  <div className="table-cell">
                    <p>
                      Have an account?
                    </p>
                    <div className="btn-auth" onClick={() => { console.log("called"); setStatus(!status) }}>
                      Log in
                    </div>
                  </div>
                </div>
              </div>
              <div className="info-item">
                <div className="table">
                  <div className="table-cell">
                    <p>
                      Don't have an account?
                    </p>
                    {/* {status} */}
                    {/* {JSON.stringify(status)} */}
                    <div className="btn-auth" onClick={() => { console.log("called"); setStatus(false) }}>
                      Sign up
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-auth-form">
              <div className="form-item log-in">
                <div className="table">
                  <div className="table-cell">
                    {JSON.stringify(formData)}
                    <input name="username" onChange={(event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) }} placeholder="Username" type="text" />
                    <input name="password" onChange={(event) => { setFormData({ ...formData, [event.target.name]: event.target.value }) }} placeholder="Password" type="text" />
                    {/* <input name="password" onChange={(event) => { setFormData((data) => ({ ...data.formData, [event.target.name]: event.target.value })) }} placeholder="Password" type="Password" /> */}
                    <div className="btn-auth" onClick={Login}>
                      Log in...
                    </div>
                    {loginMsg ? "Invalid user":""}
                  </div>
                </div>
              </div>
              <div className="form-item sign-up">
                <div className="table">
                  <div className="table-cell">
                    {JSON.stringify(formData)}
                    {/* <input name="email" onChange={ (event)=>{  setFormData((data)=>({formData:{...data.formData,[event.target.name]:event.target.value}})) }} placeholder="Email" type="text" /> */}
                    <input name="email" onChange={setDataInFormState} placeholder="Email" type="text" />
                    <input name="fullName" onChange={setDataInFormState} placeholder="Full Name" type="text" />
                    <input name="username" onChange={setDataInFormState} placeholder="Username" type="text" />
                    <input name="password" onChange={setDataInFormState} placeholder="Password" type="Password" />
                    <div className="btn-auth" onClick={Registration} >
                      Sign up
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCompo;