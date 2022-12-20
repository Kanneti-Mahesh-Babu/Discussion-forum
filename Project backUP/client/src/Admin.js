import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';


export default function Admin() {


  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: '',
    password: '',
  });

  const changerHandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  

  
  const notifyAdmin = () => alert("Login Sucess!");




//ADMINS ONLY NEED TO LOGIN...
  const loginAdmin =async()=>{
    try{
      const res = await axios.post('http://localhost:8000/admin', admin);
      let token = sessionStorage.setItem('token',JSON.stringify(admin));
        navigate('/admin-posts');
      return res.data;
    }
    catch(err){
      alert("Invalid Username or Password!")
      console.log(err);
    }
  }





 

  const submitHandler =  (e) => {
    e.preventDefault();
    console.log(admin);

//BASIC VALIDATE FOR ADMIN ONLY...
    if(email ==="admin@gmail.com" && password ==="admin"){
      loginAdmin();
      notifyAdmin();
     
    }else{

      setAdmin({
        email:'',
        password:''
      })

    return alert("Invalid Details")
  }




  };



  

  const { email, password } = admin;








  return (
  
    <div>
                                                                                       <button onClick={()=>{navigate('/')}}> HOME </button>
      <div className="loginForm">
        <form onSubmit={submitHandler} method='POST' action='http://localhost:8000/admin' autoComplete="off">
          <h1> ADMIN </h1>
          <br />
          <br />
          <label>
            {' '}
            E-mail Id <span> * </span> : &nbsp;
          </label>
          &nbsp;&nbsp;&nbsp;
          <input
            type="email"
            name="email"
            value={email}
            onChange={changerHandler}
            placeholder="Enter Your E-mail Id"
            required
          />
          <br />
          <br />
          <br />
          <label>
            {' '}
            Password <span> * </span> :{' '}
          </label>
          &nbsp;&nbsp;&nbsp;
          <input
            type="password"
            name="password"
            value={password}
            onChange={changerHandler}
            placeholder="Enter Your Password to Login!"
            required
          />
          <br />
          <br /> <br />
          <br />
          <br />
          <input type="submit" />

                  <br/><br/><br/>
                  <b> OR </b>
              <hr/>
              <button onClick={()=>{navigate('/register')}}> Register </button>
              <br/>
        </form>
      </div>
    </div>
  
  );




}
