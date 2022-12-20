import React,{useState , useEffect} from 'react';
import axios from 'axios';
import Login from './Login';
import img from './images/avatar.png';
import comment from './images/comment.png'
import { useNavigate } from 'react-router-dom';
import './style.css';

//MATERIAL-UI MODELS PACKAGES********-->>>
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';

//?? STYLES MODALS ??
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export default function App() {
    const navigate = useNavigate();

    const [avatar,setAvatar] = useState('');

    const [userPost,setUserPost] = useState([]);
    const [post,setPost] = useState({
      fname:'',
      query:''
    })

//COMMENT....
    const [userComment,setUserComment] = useState({
      cname:'',
      postComment:''
    })

    const [userComm,setuserComm] = useState([]);


    {/*MODALS DECLARATIONS*/}
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    {/*--------------*/}


    const changerHandler = (e) => {
      setPost({ ...post, [e.target.name]: e.target.value });
    };
  



    //COMMENT HANDLER...
    const commentHandler = (e) => {
      setUserComment({ ...userComment, [e.target.name]: e.target.value });
    };





    //LOGOUT BASIC AUTH...
  const logout = () =>{
    sessionStorage.removeItem('token');
      alert("Logout Success");
      navigate('/login');
  }


  var valid = sessionStorage.getItem('token');
  if(valid == null){
    navigate('/login');
    }







//GET USERS CREATE POST...

  const getUsers = ()=>{
  axios.get('http://localhost:8000/users-posts').then(
    res=>setUserPost(res.data)
  )
  }


  

  //USER CREATE POST...
  const createPost =async()=>{
    try{
      const res = await axios.post('http://localhost:8000/posts', post);
      return res.data;
    }
    catch(err){
      console.log(err);
    }
  }




   //USER COMMENTED TO POST...
   const commented =async()=>{
    try{
      const res = await axios.post('http://localhost:8000/comments', userComment);
       handleClose();
        getUsers();
      //  getComments();
      return res.data;
    }
    catch(err){
      console.log(err);
    }
  }




  const getComments = ()=>{
    axios.get('http://localhost:8000/users-comments').then(
      res=>setuserComm(res.data)
    )
    }
  



useEffect(()=>{
  getUsers();
  getComments();
},[]);





  const posted =  (e) => {
    e.preventDefault();
    console.log(post);
    createPost();
    notify();
    getUsers();
//RESET FORM...
      setPost({
        fname:'',
        query:''
      })

  };






  const notify = () => alert("Your Posted Create Successfully!");

  let token = JSON.parse(sessionStorage.getItem('token'));

  const {fname,query} = post;

  const {cname, postComment} = userComment;




  return (

<>
            
        <div className='logout'>  
                 <div><i> {token ? token.email:<Login/>} </i> <img src={img}/></div>
             <button onClick={()=>{logout()}}>  Logout  </button> 
        </div>


    <center>
        <div>             
            <div> Welcome To (MY POSTS) Dashboard </div>                          
<form onSubmit= {posted} method='POST' action='http://localhost:8000/posts' autoComplete='off'>
            <div className="createPost"> 
              <h1> DISCUSSION FORUM </h1><br/>

              <strong> Write your Name </strong> &nbsp;
              <input type="text" name="fname" value={fname} onChange={changerHandler} placeholder="Enter Your Name" required/>
              <br/><br/><br/>
              <strong> Post your query </strong>
              <textarea type="text" name="query" value={query} onChange={changerHandler} placeholder="Post Your Question!" required></textarea>

                   <br/><br/><br/>
                  <input type="submit" value="Create Post" />
            </div>
 </form>
        </div>
    </center>
                                <hr/>
          <div>                      
                 <h4><u> View POST details with COMMENTS </u></h4>                     <button className="active"> Active POSTS List ( {userPost.length} )  </button> <br/><br/><br/>

               <div className="viewPost">
                  {userPost.map(list=>
                    <div key={list.id}>
                          {/* <i className='id'> {list.id} </i> */}
                         <img src={img}/>
                            <h5> {list.name} </h5>     <i> {list.date} </i>
                          <p> {list.query} </p>

                            <img className='commentIcon' src={comment} onClick={handleOpen}/>
                    </div>)}
                    
                 </div>  
              

                 {/*---COMMENTS LOOPS--*/}
               
                  <div className="viewComments">
                    
                  {userComm.map(list=>
                    <div key={list.id}>
                      {/* <i>{list.id}</i> */}
                         <img src={img}/>
                        <h5> {list.name} </h5>  <p> {list.comments} </p>   <i> {list.date} &nbsp; <DoneAllIcon/> </i>
                    </div>)}
                 </div> 


         </div>  


         {/*-------COMMENTS SECTION -----*/}   


      <div>
          <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
              <Box sx={style}>
                                      <CloseIcon onClick={handleClose}/>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      Comment To POST
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <form onSubmit={commented} autoComplete='off'>
                        <strong> Write your Name </strong> &nbsp;
                         <input type="text" name="cname" value={cname} onChange={commentHandler} placeholder="Enter Your Name" required/>
                                        <br/><br/><br/>
                          <strong> Post your query </strong>
                         <textarea type="text" name="postComment" value={postComment} onChange={commentHandler} placeholder="Post Your Question!" required></textarea>

                                     <br/><br/><br/>
                             <input type="submit" value="Comment to Post" />
                    </form>
                  </Typography>
              </Box>
          </Modal>
          
          
          
          </div>   
</>
  );
}
