import React, { useState,useEffect } from "react";
import { login, useAuth, authFetch, logout } from "./auth/index";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    const onSubmitClick = (e)=>{
      e.preventDefault()
      console.log("You pressed login")
      let opts = {
        'username': username,
        'password': password
      }
      console.log(opts)
      fetch('/api/login', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
        method: 'post',
        body: JSON.stringify(opts)
      }).then(rs => rs.json())
        .then(token => {
          if (token.access_token){
            login(token)
            console.log(token);          
          }
          else {
            console.log("Please type in correct username/password");
          }
    })
    }
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value)
    }
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value)
    }
    const [logged] = useAuth();

    const logoutStyle = {
      display:"flex",
      color: "red",
      fontSize: "10px",
      textAlign: "center",
      padding:"0 1rem",
      height:"100%",
      width:"100%",
      position:"absolute",
      top:"0",
      right:"0"
    };
  
    return (
      <div>
        {!logged?<h2>Login</h2>:<h2></h2>}
        {!logged? <form action="#">
          <div>
            <input type="text" 
              placeholder="Username" 
              onChange={handleUsernameChange}
              value={username} 
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <button onClick={onSubmitClick} type="submit">
            Login Now
          </button>
        </form>
        : <button onClick={() => logout()}>Logout</button>}
      </div>
    )
  }

export default Login