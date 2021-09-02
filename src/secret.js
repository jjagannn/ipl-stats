import React, { useState,useEffect } from "react";
import { login, useAuth, authFetch, logout } from "./auth/index";


function Secret() {
    const [message, setMessage] = useState('')
  
    useEffect(() => {
      authFetch("/api/protected").then(response => {
        if (response.status === 401){
          setMessage("Sorry you aren't authorized!")
          return null
        }
        return response.json()
      }).then(response => {
        if (response && response.message){
          setMessage(response.message)
        }
      })
    }, [])
    return (
      <h2>Secret: {message}</h2>
    )
  }

export default Secret