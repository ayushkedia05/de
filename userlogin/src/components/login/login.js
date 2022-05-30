import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
// import React from 'react';

import { useHistory } from 'react-router-dom';



import { uiActions } from '../../store/uislice';

import { useDispatch } from 'react-redux';
import axios from 'axios'
import { Link } from 'react-router-dom';
import Register from './register';
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export function AuthenticationImage() {

const dispatch=useDispatch(); 



  function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}







  

    const [username,setusername]=useState('');
    const [password,setpassword]=useState('');


  

    let viewdata={
  
      email:'',
      password:''
    }
    const history=useHistory();
  const initiatelogin=async(Event)=>{
    Event.preventDefault();
      viewdata.email= username
   
      viewdata.password= password
  
  
  
      const getback=axios.post('http://localhost:3000/api/users/login',viewdata);  
        getback.then(value=>  {
          console.log(value.data.status);

           if(value.data.status==='success')
           console.log('fsfsfs');
           dispatch(uiActions.toggle());
             history.push('/product');
        

        })
  
      
  
  }





  const { classes } = useStyles();



  return (
    <div className={classes.wrapper}>

{/* https://localhost:3001/welcome */}
<Link to ={{ pathname: "http://localhost:3000/auth/google" }}>google</Link>


      <Paper className={classes.form} radius={0} p={30}>
        <Title order={4} className={classes.title} align="center" mt="ls" mb={40}>
        
        </Title>
<form onSubmit={initiatelogin}>
        <TextInput label="Email address" placeholder="hello@gmail.com" size="md" onChange={(userchange)=>{setusername(userchange.target.value)}}/>
        <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" onChange={(passchange)=>setpassword(passchange.target.value)}/>
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button onClick={initiatelogin} fullWidth mt="xl" size="md">
          {<Link to="/product"></Link>}
          login
        </Button>
          {/* <Link onClick={initiatelogin} to="/product">f</Link> */}
           
        <Text align="center" mt="md">
          Don&apos;t have an account?{' '}
          <Link to="/register" weight={700} >
            Register
          </Link>
        </Text>
        </form>
      </Paper>


    </div>
  );
}