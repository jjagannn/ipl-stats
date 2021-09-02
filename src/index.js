import React from 'react';
import ReactDOM from 'react-dom';
//import { Route } from 'react-router-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';
import * as themes from './theme/schema.json';
import { setToLS } from './utils/storage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Home from './home'
import Login from './login'
import Signup from './signup'
import Secret from './secret'
import MainPage from './mainpage';
import styled from 'styled-components'
import Navbar from './Navbar';


function App(){
  return(
    <Router>
            <Container>
              <Navbar></Navbar>
            </Container>
    </Router>
  )
}

const Container = styled.div`
  background: #67bc98;
  height:100%;
`

ReactDOM.render(<App></App>,document.getElementById('root'));

/*

const Index = () => {
  setToLS('all-themes', themes.default);
  return(
    <App />
  )
}
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
