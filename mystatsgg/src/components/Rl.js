import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import NavComp from '../components/NavComp'
import { Dropdown, Input, InputGroup, Button } from 'rsuite';
import bg from '../icons/fond.png'
import RlLogo from '../icons/RlLogo.png'
import { useHistory } from "react-router-dom";


const Container = styled.div`
  width: 100%;
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 1;
`;

const SInput = styled(Input)`
  width: 50vw;
  height: 8vh;
  border-radius: 0 0 0 0;
`;

const SDropdown = styled(Dropdown)`
  margin: auto;
  
`;

const Filter = styled.div`
  background-color: #0DD9C4;
  height: 8vh;
  width: 10vw;
  border-radius: 5px 0% 0% 5px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 6vh;
  margin-bottom: 0;
  margin-top: 3vh;
  font-family: 'Bebas Neue', sans-serif;
  grid-column-start: 2;
  grid-column-end: 3;
`;

const SubTitle = styled.p`
  font-size: 1em;
  color: white;
  opacity: 0.5;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  font-family: 'Bebas Neue', sans-serif;
`;

const Img = styled.img`
  width: 112px;
  height: 112px;
  grid-column-start: 1;
  grid-column-end: 2;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 10vw 35vw;
  grid-template-rows: 10vh 8vh;
  grid-gap: 1vw;
  margin-right: 15vw;
  margin-bottom: 6vh;
`;

const SButton = styled(Button)`
  background-color: #0DD9C4;
  color: #424242;
  width: 10vw;
  height: 8vh;
  font-size: 2vw;
  font-family: 'Bebas Neue', sans-serif;
  border-radius: 5px 0% 0% 5px;
`;

const GOButton = styled(Button)`
  background-color: #0DD9C4;
  color: #424242;
  width: 8vw;
  height: 8vh;
  font-size: 3vw;
  font-family: 'Bebas Neue', sans-serif;
  border-radius: 0 5px 5px 0;
`;

function Rl(props) {
    const [plat, setPlat] = useState("Plateforme")
    const [input, setInput] = useState("")
    const history = useHistory()  

    return (
      <div style={{backgroundImage: `url(${bg})`, width: '100%', height: '100%'}}>
        <NavComp/>
        <Container>
            <Grid>
              <Img src={RlLogo} alt="Logo_rl"></Img>
              <Title>ROCKET LEAGUE STATS</Title>
              <SubTitle>Les stats complètes de votre compte</SubTitle>
            </Grid>
            <div style={{display: "flex"}}>
              <Filter>
              <SDropdown renderTitle={children => {return <SButton appearance="primary">{plat}</SButton>}}>
                <Dropdown.Item onSelect={() => setPlat('EPIC')}>Epic Games</Dropdown.Item>
                <Dropdown.Item onSelect={() => setPlat('XBOX')}>Xbox Live</Dropdown.Item>
                <Dropdown.Item onSelect={() => setPlat('PSN')}>PSN</Dropdown.Item>
              </SDropdown>
              </Filter>
              <SInput size="lg" placeholder="Pseudo..."></SInput>
              <GOButton onClick={() => history.push({pathname: `/rocketleague/${input}`})}>GO</GOButton>
            </div>
        </Container>
        </div>
    )
}

export default Rl;