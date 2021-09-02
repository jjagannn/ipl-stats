import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState,useEffect} from 'react'
import { Dropdown } from 'react-bootstrap';
//import CardData from './cardData';
//import styled from 'styled-components';
import { login, useAuth, authFetch, logout } from "./auth/index";

function DropdownExampleSearchSelection(){

  const [overview,setOverview]=useState(["CSK"]);
  useEffect(() => {
      fetch("/api/getTeams").then(resp => resp.json())
      .then(res =>
        setOverview(res.team))
    }, []);

  const [test,setTest]=useState(["id"]);  
  const [value, setValue] =useState('Select Team');
  
  const handleChange = (selection) => {
    setValue(selection)
    CardData(selection)
  };  

  const style = {
      display:"flex",
      color: "red",
      fontSize: "10px",
      textAlign: "center",
      padding:"0 1rem",
      height:"100px",
      width:"50px"
  };
  
  function CardData(team) {
    console.log(team)
    const URL = "/api/getTeamData/"+encodeURIComponent(team);
    fetch(URL).then(resp => resp.json())
    .then(res => 
      setTest(res))
  };
  const [logged] = useAuth();
  return(
    
    <div>
    {logged?
    <Dropdown style={style}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {value}
      </Dropdown.Toggle>
      <Dropdown.Menu>
      {overview.map(over => (
          <Dropdown.Item eventKey={over} value={over} onSelect={handleChange}>{over}</Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
    :<div><h2>Please login</h2></div>}
    {logged?
    <table class="table table-bordered">
      <thead class="thead-light">
        <tr>
          <th scope="col">Season</th>
          <th scope="col">Team</th>
          <th scope="col">Against</th>
          <th scope="col">Winner</th>
          <th scope="col">Toss Decision</th>
          <th scope="col">Toss Winner</th>
        </tr>
      </thead>
      <tbody>    
      {test.map(te => (
          <tr key={te.id}>
            <td>{te.season}</td>
            <td>{te.team1}</td>
            <td>{te.team2}</td>
            <td>{te.winner}</td>
            <td>{te.toss_decision}</td>
            <td>{te.toss_winner}</td>
          </tr>
      ))}
      </tbody>
    </table>
    :<div></div>}
    
  </div>
  

  )
}

export default DropdownExampleSearchSelection







