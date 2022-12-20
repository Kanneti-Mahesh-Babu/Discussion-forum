import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="header">
      <button onClick={()=>{navigate('/admin')}}> ADMIN </button>
        <button onClick={()=>{navigate('/login')}}> Login ( User )</button>
        <button onClick={()=>{navigate('/register')}}> Register </button>
      </div>

      {/* <center> */}
      <div>
        <div className="homeImage">HOMEPAGE</div>
        <div className="welcome">
          <h3> WELCOME TO </h3>
          <br />
          <h4> SAMPLE DISCUSSION FORUM </h4>
        </div>
      </div>
      {/* </center> */}
    </div>
  );
}
