import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Admin from './Admin';
import './style.css';
import img from './images/avatar.png';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export default function AdminPosts() {
    const navigate = useNavigate();
  

  const [adminPosts,setAdminPosts] = useState([]);


    //LOGOUT BASIC AUTH...
    const logout = () =>{
        sessionStorage.removeItem('token');
          alert("Logout Success");
          navigate('/admin');
      }
    





//NEW ( OR ) EXISTING USER LOGIN...

  const getAdminPosts = ()=>{
    axios.get('http://localhost:8000/users-posts').then(
        res=>setAdminPosts(res.data)
    )

  }

  

useEffect(()=>{
    getAdminPosts();
},[])




//TO DELETE USERS POSTS FOR ACCESS ADMINS ONLY...

const deletePost = async (id)=>{
  try{
        let conf = confirm("Do you want to delete POST!");
    if(conf==true){
      const res = await axios.delete(`http://localhost:8000/admin/delete/${id}`);
        getAdminPosts();
    }
    return false;
    
  }
  catch(err){
    console.log(err);
  }

  
}



let token = JSON.parse(sessionStorage.getItem('token'));

  return (
  
    <div>
       <div className="loginForm">
            <div><i style={{position:"relative",top:"20px"}}> {token ? token.email: <Admin/> } </i> <Stack > <Avatar alt="Remy Sharp" src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg" style={{height:"40px",width:"40px",marginTop:"-15px",marginLeft:"130px"}}/>  </Stack> </div>
        <button onClick={()=>{logout()}} className="adminLogout"> LOGOUT </button>
                <br/><br/>
          <h1> ADMIN LIST OF POSTS </h1>

              {adminPosts.map(list=>
                    <div key={list.id} className='admin'>  <CloseIcon onClick={()=>{deletePost(list.id)}} style={{cursor:"pointer"}}/> &nbsp;
                              {/* <i>{list.id}</i> */}
                           <img src={img}/>
                               <h5> {list.name} </h5>  <p> {list.query} </p>
                               <i> {list.date} </i>
                                
                      </div>)}

                      <u style={{float:"right",color:"grey",fontSize:"10px"}}> Total Posts : {adminPosts.length} </u>

      </div>
    </div>
  
  );




}
