import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import './style.css';

export default function Register() {
  const navigate = useNavigate();

const [auth,setAuth] = useState(false);
  const [regUser, setRegUser] = useState([]);
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    mobile: '',
    password: '',
  });

  const changerHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


//NEW USER REGISTRATION...
  const registerUser =async()=>{
    try{
      const res = await axios.post('http://localhost:8000/register',user);
      navigate('/login');
      return res.data;
    }
    catch(err){
      console.log(err);
    }

  }


//NOTIFY TO USERS...
  const notifyRegister = () => alert("Successfully Registered. Login to Your account!");




//SUBMITTING OR POSTING NEW USER FOR REGISTRATION...

  const submitHandler =  (e) => {
    e.preventDefault();
    console.log(user);

    registerUser();
    notifyRegister();


    //RESET FORM DATA...
  setUser ({
      fullname:'',
      email:'',
      mobile:'',
      password:''
    })


  };




  

  const { fullname, email, mobile, password } = user;


  return (
    <div className="registerForm">
                                                                                              <button onClick={()=>{navigate('/')}}> HOME </button>
      <form onSubmit={submitHandler} method='POST' action='http://localhost:8000/register' autoComplete="off">
        <h2> Registration </h2>
        <br />
        <br />
        <label>
          {' '}
          Full Name <span> * </span> :{' '}
        </label>
        &nbsp;&nbsp;&nbsp;
        <input
          type="text"
          name="fullname"
          value={fullname}
          onChange={changerHandler}
          placeholder="Enter Your Full Name"
          maxLength="15"
          autoFocus="on"
          required
        />
        <br />
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
          Mobile No <span> * </span> :{' '}
        </label>
        &nbsp;&nbsp;&nbsp;
        <input
          type="number"
          name="mobile"
          value={mobile}
          onChange={changerHandler}
          placeholder="Enter Your Mobile Number"
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
          placeholder="Enter Your Password to Register!"
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
      <button onClick={()=>{navigate('/login')}}> Login </button>
      <br/>
      </form>
    </div>
  );
}
