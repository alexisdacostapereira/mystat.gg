import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import NavComp from '../components/NavComp'
import { Button, Dropdown, Input, InputGroup } from 'rsuite';
import bg from '../icons/fond.png'
import LolLogo from '../icons/Lol.png'
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Loader } from 'rsuite';


const Grid = styled.div`
  display: grid;
  grid-template-columns: 5vw 8vw 7vw 3vw 65vw;
  grid-template-rows: 8vh 10vh 70vh;
  grid-gap: 1vw;
`;

const Logo = styled.img`
  width: 90px;
  height: 90px;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  display: inline-block;
`;

const Pseudo = styled.h2`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
  font-family: 'Bebas Neue', sans-serif;
  color: white;
  margin-top: 5vh;
`;

const SideStat = styled.div`
  display: grid;
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 4;
  color: #F7F7F7;
  border-radius: 5px 5px 5px 5px;
  font-family: 'Lexend Exa', sans-serif;
  background-color: #0DD9C4;
  margin-top: 2vh;
  grid-template-rows: 3vh 11vh 11vh 11vh 11vh 21vh;
  grid-template-columns: 16vw;
`;

const Hist = styled.div`
  display: grid;
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 3;
  grid-row-end: 4;
  font-family: 'Lexend Exa', sans-serif;
  color: white;
  border-radius: 5px 5px 5px 5px;
  background-color: #3E3D3D;
  margin-top: 2vh;
  grid-template-rows: 4vh 8vh 8vh 8vh 8vh 8vh 8vh 8vh 8vh;
  grid-template-columns: 65vw;
`;

const SideTitle = styled.h6`
  grid-row-start: 1;
  font-family: 'Bebas Neue', sans-serif;
  grid-row-end: 2;
  margin: auto;
  font-opacity: 0.9;
  border-bottom: 1px solid white;
`;

const SideBlock = styled.div`
  width: 100%;
  grid-row-start: ${props => props.start};
  grid-row-end: ${props => props.end};
  border-bottom: 1px solid white;
  
`;

const SBText = styled.div`
  width: ${props => props.w ? props.w : "70%"};
  margin-left: ${props => props.left ? props.left : "2.5vw"};
  font-size: ${props => props.size};
  color: ${props => props.clr};
  margin-top: ${props => props.mt ? props.mt : "1vh"};
`;

const SBTextTop = styled.div`
  margin-left: ${props => props.left ? props.left : "2.5vw"};
  font-size: ${props => props.size};
  color: ${props => props.clr};
  margin-top: ${props => props.mt ? props.mt : "1vh"};
  grid-column-start: ${props => props.Cstart};
  grid-column-end: ${props => props.Cend};
  grid-row-start: ${props => props.Rstart};
  grid-row-end: ${props => props.Rend};
  white-space: nowrap; 
`;


const SBTextContainer = styled.div`
  display: grid;
  grid-template-columns: 8vh 18vh;
  grid-template-rows: 3.5vh 6vh 6vh 6vh;
  grid-row-start: 6;
  grid-row-end: 7;
`;

const Block = styled.div`
  width: 100%;
  grid-row-start: ${props => props.start};
  grid-row-end: ${props => props.end};
  border-bottom: 1px solid #1F1F1F;
  display: grid;
  grid-template-columns: 2.5vw 40vw 15vw 15vw;
  grid-template-rows: 4vh 4vh;
`;

const BText = styled.div`
  grid-column-start: ${props => props.Cstart};
  grid-column-end: ${props => props.Cend};
  grid-row-start: ${props => props.Rstart};
  grid-row-end: ${props => props.Rend};
  font-size: ${props => props.size ? props.size : "1.4em"};
  color: ${props => props.clr};
  margin-top: 4px;
`;

const Title = styled.h6`
  margin-top: 1px;
  grid-row-start: 1;
  grid-row-end: 2;
  margin: auto;
  font-opacity: 0.9;
  border-bottom: 1px solid white;
  font-size: 1.3em;
  font-family: 'Bebas Neue', sans-serif;
`;

const SLoader = styled(Loader)`
  margin-right: 50%;
  margin-left: 50%;
  margin-bottom: 50%;
  margin-top: 25%
`;

const RefreshButton = styled(Button)`
  grid-column-start: 5;
  grid-column-end: 6;
  grid-row-start: 2;
  grid-row-end: 3;
  width: 7vw;
  height: 5vh;
  margin-top: 5vh;
`;

function LolStat(props) {
  let { id } = useParams()
  const history = useHistory()
  const [alert, setAlert] = useState(null)
  const [stats, setStats] = useState()

  useEffect(() => {
    axios.defaults.headers.common["API"] = localStorage.getItem('token');
    axios.post("http://localhost:8080/stats/lol", {
      server: history.location.state.detail.reg,
      pseudo: id
    }).then(res => {
      setStats(res.data.success)
    }).catch(err => {
      setAlert(err.response.data.error)
    })
  }, [])

  if (!stats)
    return(<SLoader size="lg" content="Chargement..."/>)

  if (alert) {
    Alert.error(alert)
    setAlert(null)
  }

  function refresh() {
    window.location.reload();
  }

  return (
    <div style={{backgroundImage: `url(${bg})`, width: '100%', height: '100%'}}>
      <NavComp/>
      <Grid>
        <RefreshButton onClick={() => refresh()}>Refresh</RefreshButton>
        <Logo src={LolLogo} alt="Logo_lol"></Logo>
        <Pseudo>{id}</Pseudo>
        <SideStat>
          <SideTitle>Vos stats général</SideTitle>
          <SideBlock start={2} end={3}>
            <SBText size={"1em"} clr={"#303030"}>Win %</SBText>
            <SBText size={"1.5em"} clr={"#ffffff"}>{stats.ratio_win_lose ? stats.ratio_win_lose : "Unranked"}</SBText>
          </SideBlock>
          <SideBlock start={3} end={4}>
            <SBText size={"1em"} clr={"#303030"}>KDA</SBText>
            <SBText size={"1.1em"} clr={"#ffffff"}>{stats.avg_kill + "/" + stats.avg_death + "/" + stats.avg_assist}</SBText>
          </SideBlock>
          <SideBlock start={4} end={5}>
            <SBText size={"1em"} clr={"#303030"}>League Points</SBText>
            <SBText size={"1.5em"} clr={"#ffffff"}>{stats.LP ? stats.LP : "Unranked"}</SBText>
          </SideBlock>
          <SideBlock start={5} end={6}>
            <SBText size={"1em"} clr={"#303030"}>Rank</SBText>
            <SBText size={"1.5em"} clr={"#ffffff"}>{stats.rank ? stats.rank : "Unranked"}</SBText>
          </SideBlock>
          <SBTextContainer>
            <SBTextTop Cstart={1} Cend={3} Rstart={1} Rend={2} mt={"0"} left={"0.9vw"} size={"1.3vw"} clr={"#303030"}>Top champions</SBTextTop>
            <SBTextTop Cstart={1} Cend={2} Rstart={2} Rend={3} size={"80%"}  left={"0.2vw"} clr={"#303030"}>{stats.top_champions[0].name}</SBTextTop>
            <SBTextTop Cstart={2} Cend={3} Rstart={2} Rend={3} size={"0.85vw"} left={"1.2vw"} clr={"#ffffff"}>KDA {stats.top_champions[0].kda} | WR {stats.top_champions[0].win_ratio}</SBTextTop>
            <SBTextTop Cstart={1} Cend={2} Rstart={3} Rend={4} size={"80%"} left={"0.2vw"} clr={"#303030"}>{stats.top_champions[1].name}</SBTextTop>
            <SBTextTop Cstart={2} Cend={3} Rstart={3} Rend={4} size={"0.85vw"} left={"1.2vw"} clr={"#ffffff"}>KDA {stats.top_champions[1].kda} | WR {stats.top_champions[1].win_ratio}</SBTextTop>
            <SBTextTop Cstart={1} Cend={2} Rstart={4} Rend={5} size={"80%"} left={"0.2vw"} clr={"#303030"}>{stats.top_champions[2].name}</SBTextTop>
            <SBTextTop Cstart={2} Cend={3} Rstart={4} Rend={5} size={"0.85vw"} left={"1.2vw"} clr={"#ffffff"}>KDA {stats.top_champions[2].kda} | WR {stats.top_champions[2].win_ratio}</SBTextTop>
          </SBTextContainer>

        </SideStat>
        <Hist>
          <Title>Sur vos 8 derniers matches</Title>
            {stats.last_games.map((item, ind) => {
              if (ind >= 8)
                return (<></>)
              return (
              <Block start={2 + ind} end={3 + ind}>
                <BText Cstart={2} Cend={3}>{stats.last_games[ind].type}</BText>
                <BText Cstart={2} Cend={3} Rstart={2} Rend={3} size={"1.1em"} clr={"#8C722F"}>{stats.last_games[ind].champion} | {stats.last_games[ind].result} | {stats.last_games[ind].date.substr(0,stats.last_games[ind].date.indexOf(' '))} | {stats.last_games[ind].time}</BText>
                <BText Cstart={3} Cend={4} size={"1.1em"} clr={"#8C722F"}>CS</BText>
                <BText Cstart={4} Cend={5} size={"1.1em"} clr={"#8C722F"}>{stats.last_games[ind].kda}</BText>
                <BText Cstart={3} Cend={4} Rstart={2} Rend={3}>{stats.last_games[ind].cs}</BText>
                <BText Cstart={4} Cend={5} Rstart={2} Rend={3}>{stats.last_games[ind].kill}/{stats.last_games[ind].death}/{stats.last_games[ind].assist}</BText>
              </Block>
            )})}
        </Hist>
      </Grid>
    </div>
    )
}

export default LolStat