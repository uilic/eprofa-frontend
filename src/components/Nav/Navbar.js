import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';

import {useEffect, useContext} from 'react'
import axios from '../api/axios';

import AuthContext from '../context/AuthProvider'

import logo from './logo.png'

const Nav = styled.nav`
  background-color: white;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding-top:3px;

  img {
    margin-left:20px;
  }

`

const USER_URL = "api/auth/user"

const Navbar = () => {
  const { setAuth, setUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(USER_URL,
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
      );
      console.log(response.status)
      setAuth(true)
      setUser(response.data)
    }
    fetchUser()
  }, []);

  return (
    <Nav>
      <img src={logo} alt="logooo"/>
      <Burger />
    </Nav>
  )
}

export default Navbar
