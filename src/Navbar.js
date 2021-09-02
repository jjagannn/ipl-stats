import React, {useState} from 'react'
import styled from 'styled-components'
import Login from './login'
import Signup from './signup'
import MainPage from './mainpage'
import Home from './home'
import Secret from './secret'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import DropdownExampleSearchSelection from './TeamDropdown'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
        <Nav>
            <Logo href="">
            IPL<span>Stats</span>
            </Logo>
            <Hamburger onClick={() => setIsOpen(!isOpen)}>
                <span />
                <span />
                <span />
            </Hamburger>
            <Menu isOpen={isOpen}>
                <Menulink href="/">Main Page</Menulink>
                <Menulink href="/home">Home</Menulink>
                <Menulink href="/login">Login</Menulink>
                <Menulink href="/signup">Signup</Menulink>
                <Menulink href="/secret">Secret</Menulink>
            </Menu>

        </Nav>
        <DropdownExampleSearchSelection></DropdownExampleSearchSelection>
        <Switch>
              <Route path="/signup" component={Signup}>
                <Signup />
              </Route>
              <Route path="/login"component={Login}>
                <Login />
              </Route>
              <Route path="/secret" component={Secret}>
                <Secret/>
              </Route>
              <Route path="/home" component={Home}>
                <Home />
              </Route>
              <Route path="/" component={MainPage}>
                <MainPage />
              </Route>
            </Switch>
        </div>
    )
}

const Nav = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap: wrap;
    background: white;
`;
const Logo = styled.a`
    padding: 1rem 0;
    color: #7b7fda;
    text-decoration: none;
    font-weight:800 ;
    font-size:1.7rem ;
    span {
        font-weight:300;
        font-size: 1.3rem;
    }
`;
const Hamburger = styled.div`
    cursor:pointer;
    span{
        height:2px;
        width:25px;
        background:#7b7fda;
        margin-bottom:4px;
        border-radius:5px;
    }
    @media(max-width:768px){
        display:flex;
        flex-direction:column;
    }
`;
const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    @media(max-width:768px){
        overflow:hidden;
        flex-direction:column;
        width:100%;
        max-height: ${({isOpen}) => (isOpen ? "300px":"0")};
        transition: max-height 0.5s ease-in;
    }
`;
const Menulink = styled.a`
    padding:1rem 3rem;
    cursor:pointer;
    text-align:center;
    text-decoration:none;
    color:#67bc98;
    &:hover {
        color:#7b7fda;
    }
`;

export default Navbar
