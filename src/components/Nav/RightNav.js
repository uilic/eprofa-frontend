import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from '../context/AuthProvider'
import { setCookie, useCookies, removeCookie } from 'react-cookie';


const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin-right: ${({ auth }) => auth ? '0px' : '30px'};

  a {
    padding: 18px 10px;
    text-decoration: none;
    font-size: 17px;
  }

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #2c456b;
    position: fixed;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;

  }
`;


const DropContent = styled.div`
  display: ${({ menuClicked }) => menuClicked ? 'block' : 'none'};
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  a {
    float: none;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
    font-size: 15px;
    text-align: center;
  }

  a:hover {
    background-color: #ddd;
  }
`


const Drowdown = styled.div`
  float: left;
  overflow: hidden;
  min-width:120px;

  .dropbtn {
    font-size: 18px;
    border: none;
    outline: none;
    color: white;
    padding: 14px 16px;
    background-color: #2c456b;
    font-family: inherit; /* Important for vertical align on mobile phones */
    margin:0 auto;
    display:block;
    border-radius:23px;
    width:45px;
    height:20px;
    display:flex;
    justify-content:center;
    align-items: center;
    margin-top: 5px;
    padding-bottom:30px;
  }
  .dropbtn:hover {
    cursor:pointer
  }

}

`
const RightNav = ({ open }) => {
  const { auth, user } = useContext(AuthContext);
  const [menuClicked, setMenuClicked] = useState(false)
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const logout = async () => {
    removeCookie("jwt", { path: '/' })
  }

  const handleClick = () => {
    setMenuClicked(!menuClicked);
    console.log(menuClicked)
  };

  return (
        <Ul auth={auth} open={open}>
          <Link to='/'>Home</Link>
          <Link to='/o-nama'>O namaaa</Link>
          <Link to='/pitanja'>Pitanja</Link>
          {auth ?
          <Drowdown>
            <button class="dropbtn" onClick={handleClick}>{String(user.first_name).charAt(0).toUpperCase()}
              <i class="fa fa-caret-down"></i>
            </button>
            <DropContent menuClicked={menuClicked}>
              <a href="#">Casovi</a>
              <a href="#">Porukice</a>
              <Link to='/postani-tutor'>Postani tutor</Link>
              <a href="#">Podesavanja</a>
              <a href="/" onClick={() => logout()}>Odjava</a>
            </DropContent>
          </Drowdown>
          : 
          <Link to='/prijava'>Prijava</Link>
          }
        </Ul>
  )
}

export default RightNav
