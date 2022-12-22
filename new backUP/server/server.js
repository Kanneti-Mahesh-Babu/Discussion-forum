const con = require('./db');
const jwt = require("jsonwebtoken");

const auth = require('./auth');

const express = require('express');
const app = express();


app.use(express.json());


 
//CORS POLICIES FOR NODEJS...//
 app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","*");
    res.setHeader("Access-Control-Allow-Headers","*");

    next();
 })



 //NEW USERS REGISTRATION (POST).....SERVER AND DB//
 app.post('/register', (req,res)=>{
//     let data = req.body;
//     // let fullname= req.body.fullname;
//     // let email = req.body.email;
//     // let mobile = req.body.mobile;
//     // let password = req.body.password;
//     const {fullname,email,mobile,password} =req.body;

//     console.log(data);
//  con.query("INSERT INTO new_users(fullname,email,mobile,password) VALUES ('"+fullname+"','"+email+"','"+mobile+"','"+password+"')",(err,result)=>{
        
//         if(err) throw res.status(400).send(err);
//          res.status(200).send(result);
//     })



//---------------------USING TRY CATCH.....-----------------------------

try{
    let data = req.body;

// let fullname= req.body.fullname;
// let email = req.body.email;
// let mobile = req.body.mobile;
// let password = req.body.password;
const {fullname,email,mobile,password} =req.body;

//EXISTING USER CHECKING...
const exist = con.query("SELECT EMAIL FROM new_users WHERE email=('"+req.body.email+"')",(err,data)=>{
if(err) return err;
if(data.length) return res.status(400).send('User Already Registered!');
if(email===""||mobile===""||password===""||fullname===""){
    return res.status(403).send('Enter Valid Details!')
}



//ELSE CREATING NEW USER...
let newUser = con.query("INSERT INTO new_users(fullname,email,mobile,password) VALUES ('"+req.body.fullname+"','"+req.body.email+"','"+req.body.mobile+"','"+req.body.password+"')",(err,result)=>{
    if (err) return err;
    return res.status(200).send('User Registered Successfully!')
})


});

}
        catch (err){
        console.log(err);
        return res.status(500).send('Server Error');

}


})


//------------------------------------------------------------------------------





///-----------USER LOGIN USING TRY CATCH...-----------------------

//USER LOGIN (POST) PAGE DETAILS...
app.post('/login', (req,res)=>{
    // let data = req.body;
    // const {email,password} = req.body;

    // console.log(data);
    // con.query("INSERT INTO login_users(email,password) VALUES ('"+email+"','"+password+"')",(err,result)=>{

    //     if(err) throw res.status(400).send(err);
    //      res.status(200).send(result);

    // })




    try{

        const {email,password} = req.body;

    const exist = con.query("SELECT * FROM new_users WHERE email =('"+req.body.email+"')",(err,data)=>{
            //console.log(data,"userInfo from DB...");

            for (let i=0;i<data.length;i++){
                var id = data[i].id;
            }
                    console.log(id,"id")

        //CREATION OF AUTHENTICATION JWT TOKEN BY USING ID...

const user = {id:id};
const token = jwt.sign({user},'mykey',{expiresIn: 360000000},
        (err,token)=>{
            if(err)return err;
            if(data.length === 0) return res.status(404).send('User Not Exist!');
                return res.json({token:token});
        }   

)

    });


    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error');
}


})



//-----------------------------------------------------------------------------


            //USER CREATE (POST) PAGE DETAILS...

app.post('/posts',auth,(req,res)=>{

        try{

        const {fname,query} =req.body;

        //EXISTING POST CHECKING IS PRESENT OR NOT...

    const existPost = con.query("SELECT * FROM posts WHERE query=('"+req.body.query+"')",(err,data)=>{
        if(err) return err;
        if(data.length) return res.status(400).send('Posted Already!');
        if(fname===""||query===""){
            return res.status(403).send('Post Not be Empty');
        }


        //ELSE CREATING NEW POST...
        let newPost = con.query("INSERT INTO posts(name,query) VALUES ('"+req.body.fname+"','"+req.body.query+"')",(err,result)=>{
            if (err) return err;
            return res.status(200).send('Post Created Successfully!');
        })
        console.log(newPost);

       });



    }
                catch (err){
                console.log(err);
                return res.status(500).send('Server Error');

        }


})












//USER CREATE (POST) PAGE DETAILS...
// app.post('/posts',(req,res)=>{
//     let data = req.body;
//     const {fname,query} = req.body;

//     console.log(data);
//     con.query("INSERT INTO posts(name,query) VALUES ('"+fname+"','"+query+"')",(err,result)=>{

//         if(err) throw res.status(400).send(err);
//          res.status(200).send(result);
//     })
// })




//----------------------------------------------------------------------------------------




//TO VIEW USERS POSTED LIST ....//

app.get('/users-posts',auth,(req,res)=>{
    con.query('SELECT * FROM posts',(err,result)=>{
        if(result.length===0) return res.status(200).send("Posts are Empty!");
        if (!result.length==0) return res.status(200).send(result);
            return res.status(400).send('Not Found any POSTS');
    })

    
})






//---------------------------------------------------------------------------------------
























/**********************************************************************************/ 



// //TO CHECK NEW (OR) REGISTERED USERS LIST (GET)...
// app.get('/new-users',(req,res)=>{



//     // con.query("SELECT email from new-users WHERE email=('"+id+"')",(err,result)=>{
        
        
//     //     if(err) throw res.status(400).send(err);
//     //     res.status(200).send(result);
//     // })
    
// })


//TO CHECK LOGIN USERS LIST (GET)...
app.get('/login-users',(req,res)=>{
    con.query('SELECT * FROM login_users',(err,result)=>{
        if(err) throw res.status(400).send(err);
        res.status(200).send(result);
    })
    
})




//USER CREATE (COMMENTS) PAGE DETAILS...
app.post('/comments',(req,res)=>{
    let data = req.body;
    const {cname,postComment} = req.body;

    console.log(data);
    con.query("INSERT INTO comments(name,comments) VALUES ('"+cname+"','"+postComment+"')",(err,result)=>{

        if(err) throw res.status(400).send(err);
         res.status(200).send(result);
    })
})



//TO CHECK COMMENTS USERS LIST ....//

app.get('/users-comments',(req,res)=>{
    con.query('SELECT * FROM comments',(err,result)=>{
        if(err) throw res.status(400).send(err);
        res.status(200).send(result);
    })
    
})



//ADMIN LOGIN (POST) PAGE DETAILS...
app.post('/admin',(req,res)=>{
    let data = req.body;
    const {email,password} = req.body;

    console.log(data);
    con.query("INSERT INTO admin_users (email,password) VALUES ('"+email+"','"+password+"')",(err,result)=>{

        if(err) throw res.status(400).send(err);
         res.status(200).send(result);
    })
})





//ADMIN DELETE (POST) PAGE DETAILS...

app.delete('/admin/delete/:id',(req,res)=>{
    const id = req.params.id;

    console.log("DELETE ID: "+ id);
    con.query("DELETE from posts WHERE id=('"+id+"')",(err,result)=>{
        if(err) throw res.status(400).send(err);
         res.status(200).send(result);
    })
})








app.listen(8000,()=>{console.log(`Server is Running...`)})