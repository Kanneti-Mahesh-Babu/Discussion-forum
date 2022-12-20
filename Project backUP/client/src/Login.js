import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const changerHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  
  const notify = () => alert("Login Sucess!");







//NEW ( OR ) EXISTING USER LOGIN...
  const loginUser =async()=>{
    try{
      const res = await axios.post('http://localhost:8000/login', user);
      let token = sessionStorage.setItem('token',JSON.stringify(user));
        navigate('/dashboard');
      return res.data;
    }
    catch(err){
      console.log(err);
    }
  }







  const submitHandler =  (e) => {
    e.preventDefault();
    console.log(user);

    loginUser();
      notify();

      setUser({
        email:'',
        password:''
      })


  };



  const { email, password } = user;



  return (
  
    <div>
                                                                                          <button onClick={()=>{navigate('/')}}> HOME </button>
      <div className="loginForm">
        <form onSubmit={submitHandler} method='POST' action='http://localhost:8000/login' autoComplete="off">
          <h1> Login </h1>
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
