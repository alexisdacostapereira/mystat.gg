import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import NavComp from '../components/NavComp'
import bg from '../icons/fond.png'
import { Input, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite';
import logo from '../icons/logo.png'
import logoGoogle from '../icons/logoGoogle.png'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Alert } from 'rsuite';
import { Dropdown } from 'semantic-ui-react'

export const ForumContainer = styled.div`
margin-top: 5vh;
margin-left: 4vh;
padding: 1vh;
color: white;
height: auto;
width: 25vh;
background-color: #41E29B;
border-radius: 5px;
float: left;
font-size: 15px;
`

export const MessagesContainer = styled.div`
background-color: #141414;
opacity: 0.9;
border-radius: 20px;
width: 170vh;
height: 90vh;
margin-left: auto;
margin-right: 2vh;
margin-top: 10px;
overflow-x: hidden;
`


function Forum(props) {
    return (
        <div style={{backgroundImage: `url(${bg})`, width: '100%', height: '100%'}}>
        <NavComp/>
        <ForumContainer>
        <h1 style={{textAlign: "center"}}>Forums</h1>
            <Form>
            <Dropdown placeholder='Games' clearable fluid search  selection options={["Leagues of Legends", "Valorant"]}/>
            {/* <Button onClick={sendPreferences} style={{marginLeft: "1vh", marginTop: "2vh", width: '10vw'}} appearance="default">Envoyer</Button> */}
            </Form>
        </ForumContainer>
        
        <MessagesContainer></MessagesContainer>
    </div>)
}

export default Forum;