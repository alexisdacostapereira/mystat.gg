import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import NavComp from '../components/NavComp'
import bg from '../icons/fond.png'
import { Input, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite';
import logo from '../icons/logo.png'
import logoGoogle from '../icons/logoGoogle.png'
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Alert } from 'rsuite';


const SInput = styled(Input)`
  width: 25vw;
  height: 5vh;
  margin-bottom: 0vh;
`;

const SButton = styled(Button)`
  width: 15vw;
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

function Connection(props) {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState(null)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push({pathname: `/news`})
    }
  },  [])

  console.log(localStorage)
  function sendUser() {
    axios.post("http://localhost:8080/user/sign_in", {
      email: email,
      password: password
    }).then(res => {
      localStorage.setItem('token', res.data.success);
      localStorage.setItem('pseudo', res.data.pseudo);
      history.push({pathname: `/home`})
    }).catch(err => {
      console.log(err)
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
      <Title>Connexion</Title>
      <Form>
      <FormGroup>
        <ControlLabel>Email</ControlLabel>
        <SInput placeholder="Email" name="email" type="email" onChange={(event) => setEmail(event)}/>
      </FormGroup>

      <FormGroup>
        <ControlLabel>Mot de passe</ControlLabel>
        <SInput placeholder="Mot de passe" name="mot de passe" type="password" onChange={(event) => setPassword(event)}/>
      </FormGroup>
      </Form>
      <SButton style={{marginTop: '3vh'}} appearance="default" size="lg" onClick={sendUser} >Connexion</SButton>
      <SButton appearance="link">Mot de passe oublié ?</SButton>
      <Circle onClick={console.log("connecte depuis google")}> <img src={logoGoogle} alt="Connexion par Google" style={{marginLeft: '9px', marginTop: '8px'}} ></img> </Circle>
      <Button onClick={() => history.push({pathname: '/register'})} style={{width: '25vw', marginTop: '3vh'}} appearance="link">Vous n'avez pas de compte ? Inscrivez-vous</Button>
    </Container>
  )
}

export default Connection;