import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {Box,TextField,Typography,Button} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './App.css';
import Validation from './Validation';
import axios from 'axios';


const Signin = () => {
  const [isSignup,setIsSignup]= useState(false);
  const [inputs,setInputs]=useState({
            firstname:"",lastname:'', email:"",password:"",phone_number:'',gender:'',DOB:'',

  });
  const handlechange=(e)=>{
            setInputs((prevState)=>({
             ...prevState,
             [e.target.name]:e.target.value

            }))
            console.log(inputs)

  }
  const [records,setRecords]=useState([]);
  const handlesubmit=(e)=>{
            e.preventDefault();
            // console.log(inputs);    
            setErrors(Validation(inputs));
            setDataIsCorrect(true);
            const newRecords={...inputs, id:new Date().getTime().toString()};
            setRecords([...records,newRecords])
            postdata(e);
            // console.log(inputs);

  }
  const postdata=(e)=>{

    console.log("Posting...");
   
    var FormData = require('form-data');
    var data = new FormData();
    data.append('email', 'test200@gmail.com');
    data.append('password', 'test2000');
    data.append('firstname', 'Fn');
    data.append('lastname', 'Ln');
    data.append('phone_number', '1234567890');
    data.append('gender', 'Female');

    var config = {
      method: 'post',
      url: 'https://therecipepool.pythonanywhere.com/account/signup/',
      data : data
    };

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
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
   
  
  const resetstate=()=>{
    setIsSignup(!isSignup);

    setInputs({firstname:'',lastname:'',email:'',password:'',phone_number:'',gender:'',DOB:'',})
    setErrors({firstname:'',lastname:'',email:'',password:'',phone_number:'',gender:'',DOB:'',})
   
  }
  const [errors,setErrors]=useState({});
  
  const [dataIsCorrect, setDataIsCorrect]=useState(false);

  useEffect(()=>{
    if(Object.keys(errors).length===0 && dataIsCorrect) {
    //  submitForm(true);

    }
   },[errors]);
//   console.log(isSignup);
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
             Signin
            </Typography>
            <TextField autoComplete="off" fullWidth onChange={handlechange} name="firstname" margin="normal" type={'text'} variant="outlined" placeholder="First Name" value={inputs.firstname}/>
            { errors.firstname && <p className="error">{errors.firstname}</p>}

             <TextField fullWidth onChange={handlechange} name="lastname" margin="normal" type={'text'} variant="outlined" placeholder="Last Name" value={inputs.lastname}/>
            {errors.lastname && <p className="error">{errors.lastname}</p>}

            <TextField fullWidth onChange={handlechange} value={inputs.email} name="email" margin="normal" type={'email'} variant="outlined" placeholder="Email"/>
            {errors.email && <p className="error">{errors.email}</p>} 

            <TextField fullWidth onChange={handlechange} value={inputs.password} name="password" margin="normal" type={'password'} variant="outlined" placeholder="Password"/>
            {errors.password && <p className="error">{errors.password}</p>}

            <TextField fullWidth onChange={handlechange} value={inputs.phone_number} name="phone_number" margin="normal" type={'phone_number'} variant="outlined" placeholder="Phone No."/>
            {errors.phone_number && <p className="error">{errors.phone_number}</p>}

            <FormControl  fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label" name="gender">Gender</InputLabel>
                <Select
                  textAlign="center"
                  justifyContent="center"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={inputs.gender}
                  label="Gender"
                  onChange={handlechange}
                  name="gender"

                >
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={'Male'}>Male</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
            </FormControl>
            {errors.gender && <p className="error">{errors.gender}</p>}
            

             <Typography  onChange={handlechange}
                   fullWidth padding={3} margin="normal" maxHeight={5} >
              Birthday:
              <input type="date" id="birthday" name="DOB" value2={inputs.DOB}></input>

            </Typography>
            { errors.DOB && <p className="error">{errors.DOB}</p>}

            <Button  onClick={handlesubmit} onChange={resetstate} type="submit" sx={
              {marginTop:5, backgroundColor:"#c24450",borderRadius:2}
            }variant="contained">
              Signup
              </Button>

            <Typography sx={
              {marginTop:4}
            }> Go back to the login page:
          </Typography>

          <Button   sx={
              {color:"blue"}
            }>
              <Link to='/Form' style={
                {color:"blue"}
              } >Login</Link>
          </Button>

          </Box>
      </form>
    </div>
  )
}

export default Signin



