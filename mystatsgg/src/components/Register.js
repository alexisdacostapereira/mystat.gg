import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import NavComp from '../components/NavComp'
import bg from '../icons/fond.png'
import { Input, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite';
import logo from '../icons/logo.png'
import logoGoogle from '../icons/logoGoogle.png'
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios'
import { Alert } from 'rsuite';


const SInput = styled(Input)`
  width: 25vw;
  height: 5vh;
`;

const SButton = styled(Button)`
  width: 15vw;
  margin-top: 5vh;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 1;
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: white;
`;

const Title = styled.h1`
  color: white;
  font-size: 6vh;
  font-family: 'Rajdhani', sans-serif;
  margin-bottom: 3vh;
`;

function Register(props) {
  const history = useHistory()
  const location = useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pseudo, setPseudo] = useState("")
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push({pathname: `/news`})
    }
  },  [])

  function sendUser() {
    axios.post('http://localhost:8080/user/sign_up', {
      email: email,
      password: password,
      pseudo: pseudo
    }).then(res => {
      localStorage.setItem('token', res.data.success);
      localStorage.setItem('pseudo', res.data.pseudo);
      history.push({pathname: `/home`})
    }).catch(err => {
      setAlert(err.response.data.error)
    })
  }

  if (alert) {
    Alert.error(alert)
    setAlert(null)
  }

  return (
    <Container style={{backgroundImage: `url(${bg})`}}>
      <img src={logo} alt="Logo" style={{width: '20vw', height: '32vh', marginBottom: '3vh'}}></img>
      <Title>Inscription</Title>
      <Form>
      <FormGroup>
        <ControlLabel>Pseudo</ControlLabel>
        <SInput placeholder="Pseudo" name="pseudo" type="string" onChange={(event) => setPseudo(event)}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <SInput placeholder="Email" name="email" type="email" onChange={(event) => setEmail(event)}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Mot de passe</ControlLabel>
        <SInput placeholder="Mot de passe" name="mot de passe" type="password" onChange={(event) => setPassword(event)}/>
      </FormGroup>
    </Form>
    <SButton onClick={sendUser}>Inscription</SButton>

    </Container>
  )
}

export default Register;