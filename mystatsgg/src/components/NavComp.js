import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { Container, Header, Content, Footer, Nav, Navbar, Icon, Dropdown} from 'rsuite'
import { ReactComponent as LolSvg } from "../icons/lol.svg"
import { ReactComponent as ApexSvg } from "../icons/apex.svg"
import { ReactComponent as ValSvg } from "../icons/valorant.svg"
import { ReactComponent as RLSvg } from "../icons/rl.svg" 
import { ReactComponent as CSSvg } from "../icons/cs.svg"
import '../CSS/font.css'
import bg from '../icons/fond.png'
import logo from '../icons/logoGG.png'
import { ReactComponent as ChatSvg } from "../icons/chat.svg"
import { useHistory } from "react-router-dom";
import Axios from "axios";
import ChangePSD from "./ChangePSD";

function NavComp(props) {

  const handleDisconnection = () => {
    Axios.defaults.headers.common["API"] = localStorage.getItem('token');
    Axios.delete(`http://localhost:8080/user/disconnect`)
      .then(localStorage.clear(), history.push({pathname:`/`}, console.log(localStorage.getItem('token'))))
      .catch(err => {
        console.log(err.response.data.error)
    }) 
  }

  const history = useHistory()
  const [clicked, setClicked] = useState(false)

  return (
    <Navbar appearance="inverse" style={{backgroundColor: "#0DD9C4"}} className="font">
      <Navbar.Header>
        <img src={logo} alt="Logo" onClick={() => history.push({pathname: `/home`})} style={{width: '50px', height: '50px', marginLeft: '5px', marginTop: '3px'}}></img>
      </Navbar.Header>
      <Navbar.Body >
        <Nav>
          <Dropdown title="Jeux" trigger="hover">
            <Dropdown.Item onClick={() => history.push({pathname: `/lol`})}><LolSvg/> League of Legends</Dropdown.Item>
            <Dropdown.Item onClick={() => history.push({pathname: `/pubg`})}><ValSvg/> PUBG</Dropdown.Item>
            <Dropdown.Item onClick={() => history.push({pathname: `/overwatch`})}><CSSvg/> OVERWATCH</Dropdown.Item>
          </Dropdown>
          <Nav.Item onClick={() => history.push({pathname: '/forum'})} icon={<Icon icon="chat" />}>Forum</Nav.Item>
          <Nav.Item onClick={() => history.push({pathname: '/news'})} icon={<Icon icon="newspaper-o"/>}>News</Nav.Item>
          <Nav.Item onClick={() => history.push({pathname: '/boutique'})} icon={<Icon icon="shopping-cart"/>}>Boutique</Nav.Item>
        </Nav>
        <Nav pullRight>
          <Dropdown title={localStorage.getItem('pseudo')} trigger="hover" placement='bottomEnd'>
            <Dropdown.Item onClick={() => history.push({pathname: `/parametres`})} icon={<Icon icon='cog'/>}> Paramètres</Dropdown.Item>
            <Dropdown.Item onClick={() => setClicked(true)} > Changer de mot de passe</Dropdown.Item>
            {clicked ? <ChangePSD setClicked={setClicked}></ChangePSD> : null}
            <Dropdown.Item onClick={handleDisconnection} icon={<Icon icon='exit'/>}> Déconnexion</Dropdown.Item>
          </Dropdown>
        </Nav>
      </Navbar.Body>
    </Navbar>
  )
}

export default NavComp;