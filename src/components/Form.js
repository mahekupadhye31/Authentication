import React, { useState,useEffect } from 'react'
import axios from 'axios';
import {Box,TextField,Typography,Button} from '@mui/material'
import './App.css';
import Validation from './Validation';
import {
  Link
} from "react-router-dom";








const Form = () => {
  const [isSignup,setIsSignup]= useState(false);
  const [inputs,setInputs]=useState({
            email:"",password:"",

  });
  const handlechange=(e)=>{
    setInputs((prevState)=>({
     ...prevState,
     [e.target.name]:e.target.value

    }))
    console.log(inputs);

}
  const [records,setRecords]=useState([]);
  const handlesubmit=(e)=>{
            e.preventDefault();
               
            setErrors(Validation(inputs));
            setDataIsCorrect(true);
            const newRecords={...inputs, id:new Date().getTime().toString()};
            setRecords([...records,newRecords])
            logdata();

  }
  // /

  const logdata = () => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('email',inputs.email );
    data.append('password',inputs.password);

    var config = {
      method: 'post',
      url: 'https://therecipepool.pythonanywhere.com/account/login/',
      data: data
    };

    axios(config)
      .then(function (response) {
        const k = response.data;
        const v = JSON.stringify(response.data);
        console.log(k);
        localStorage.setItem('rt', k.refresh);
        localStorage.setItem('at', k.access);
        ref();
 
      })
      .catch(function (error) {
        console.log(error); 

      });
  }
  const [succ, setSucc] = useState("");
  const ref = () => {
    var FormData = require('form-data');
    var data = new FormData();
    data.append('refresh',localStorage.getItem('rt'));
    var config = {
      method: 'post',
      url: 'https://therecipepool.pythonanywhere.com/account/token-refresh/',
      headers: {
        'Authorization': localStorage.getItem('at')
    
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        const k=response.data;
        console.log(JSON.stringify(response.data));
        setSucc("Succesful!");
        localStorage.setItem('rt1', k.refresh);
        localStorage.setItem('at1', k.access);
      
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  //  const postdata=(e)=>{

    
  //     var FormData = require('form-data');
  //     var data = new FormData();
  //     data.append('email', 'test2003@gmail.com');
  //     data.append('password', 'Dsa01234');

  //     var config = {
  //       method: 'post',
  //       url: 'https://therecipepool.pythonanywhere.com/account/login/',
  //       data : data
  //     };

  //     axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
    // axios.post("https://therecipepool.pythonanywhere.com/account/login/",{

    //   "email": inputs.email, "password":inputs.password,
    // })
    // .then(response=>{
    //   console.log(response);
    //   e.target.reset();
    // })
    // .catch(error=>{
    //   console.log(error);
        
    //  })
    //}
  
  const resetstate=()=>{
    // setIsSignup(!isSignup);

    setInputs({email:'',password:'',})
    setErrors({email:'',password:'',})
   
  }
  const [errors,setErrors]=useState({});
  
  const [dataIsCorrect, setDataIsCorrect]=useState(false);

  useEffect(()=>{
    if(Object.keys(errors).length===0 && dataIsCorrect) {
    //  submitForm(true);

    }
   },[errors]);
  // console.log(isSignup);
  return (
  
    <div>
      <form onSubmit={handlesubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="center" justifyContent={"center"}
          margin="auto" marginTop={3} padding={3}
          borderRadius={5} boxShadow={"10px 10px 10px #ccc"}
          sx={{":hover":{
                    boxShadow:"20px  20px 20px #ccc"
                        }
                        }}>
            <Typography variant="h3" padding={3} textAlign="center">
              Login
            </Typography>
            

            <TextField fullWidth onChange={handlechange} value={inputs.email} name="email" margin="normal" type={'email'} variant="outlined" placeholder="Email"/>
            {errors.email && <p className="error">{errors.email}</p>} 

            <TextField fullWidth onChange={handlechange} value={inputs.password} name="password" margin="normal" type={'password'} variant="outlined" placeholder="Password"/>
            {errors.password && <p className="error">{errors.password}</p>}

            
            <Button  onClick={handlesubmit} onChange={resetstate} type="submit" sx={
              {marginTop:5, backgroundColor:"#c24450",borderRadius:2}
            }variant="contained">
             Login
              </Button>

            <Typography sx={
              {marginTop:4}
            }>Are you a new User?
          </Typography>
       

          <Button  onClick={resetstate}  sx={
              {color:"blue"}
            }>
              <Link to='/Signin' style={
                {color:"blue"}
              }>Signup</Link> 
          </Button>

         

          </Box>
          
      </form>
    </div>
 
  )
}

export default Form

