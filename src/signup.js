import React, { useState,useEffect } from "react";
import { login, useAuth, authFetch, logout } from "./auth/index";

function Signup(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
  
    const onSubmitClick = (e)=>{
      e.preventDefault()
      console.log("You pressed signup")
      let opts = {
        'username':username,
        'password':password
      }
      console.log(opts)
      fetch('/api/signup',{
        method: 'post',
        body: JSON.stringify(opts)
      }).then(r => r.json())
        .then(msg => {
          if(msg.message){
            console.log(msg);
          }
        })
    }
  
    const handleUsernameChange = (e) => {
      setUsername(e.target.value)
    }
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value)
    }
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value)
    }
    const [logged] = useAuth();
  
  return (
    <div>
      <h2>Signup</h2>
      {!logged?<form action="#">
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
        <div>
          <input
            type="password"
            placeholder="ConfirmPassword"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
        </div>
        <button onClick={onSubmitClick} type="submit">
          Register Now
        </button>
      </form>
      : <button onClick={() => logout()}>Logout</button>}
    </div>
  )
  }

export default Signup