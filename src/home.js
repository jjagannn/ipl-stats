import React, { useState,useEffect } from "react";
import { login, useAuth, authFetch, logout } from "./auth/index";

function Home() {
  
  const [overview,setOverview]=useState([]);
    useEffect(() => {
      fetch("/api/getAllCricketData").then(resp => resp.json())
      .then(res => 
        setOverview(res))
    }, [])
    return (
      /*
      <div>
        <h2>Overview of IPL data</h2>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Team1</th>
              <th>Team2</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
          {overview.map(over => (
            <tr key={over.id}>
                <th>{over.id}</th>
                <th>{over.team1}</th>
                <th>{over.team2}</th>
                <th>{over.winner}</th>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    );*/
    <h2>Home</h2>)
  }

export default Home