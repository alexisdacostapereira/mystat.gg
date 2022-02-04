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
import { Dropdown, Container } from 'semantic-ui-react'

function Home(props) {
    return (
        <div style={{backgroundImage: `url(${bg})`, width: '100%', height: '100%'}}>
        <NavComp/>
        <h1 style={{color: "white", textDecoration: "underline"}}>Welcome {localStorage.getItem('pseudo')} !</h1>
    </div>)
}

export default Home;