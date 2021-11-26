const express= require('express');
const bodyParser= require('body-parser')
const http= require('http');
const cors= require('cors');
const HypersignAuth=  require('hypersign-auth-js-sdk');
const port= 4000;
const app= express();
app.use(cors());
app.use(bodyParser.json());
const server= http.createServer(app);
const hypersign= new HypersignAuth(server);
//const Time=()=>new Date();
app.post('/auth/login',hypersign.authenticate.bind(hypersign),async (req, res) => {
    try {
        const {user,accessToken, refreshToken}= req.body.hypersign.data;//
       // res.status(200).send(authToken);
      // console.log(user);
       res.status(200).send('Authenticated')
      } catch (e) {
        console.log(e)
        res.status(500).send({ status: 500, message: null, error: e.message });
     } 
    
    })
 app.get('/',(req, res)=>{
        res.sendFile("./public/login.html", {root:__dirname})
 })

 app.post('/challenge',hypersign.challenge.bind(hypersign),async(req, res)=>{
   try{
     res.status(200).send(req.body);
   }
   catch(e){
    res.status(500).send({status:500, message:null, error:e.message});
}
 })

 app.get('/poll',hypersign.poll.bind(hypersign),(req,res)=>{
  

    res.status(200).send(req.body);
  
})


 app.post('/protected',hypersign.authorize.bind(hypersign),(req, res)=>{
try{
  const user= req.body.hypersign.data;
 console.log(user);
  res.status(200).send({status:200, message:user,error: null});
}catch(e){
  res.status(500).send(e.message);}
     })

    server.listen(port, ()=>{
        console.log(`server is running on port: ${port}`);
    })