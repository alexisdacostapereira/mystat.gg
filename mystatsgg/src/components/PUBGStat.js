import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import NavComp from '../components/NavComp'
import { Button, Dropdown, Input, InputGroup } from 'rsuite';
import bg from '../icons/fond.png'
import PUBGLogo from '../icons/PUBG.png'
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Loader } from 'rsuite';
import { Table } from 'rsuite';

const { Column, HeaderCell, Cell, Pagination } = Table;

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
  grid-column-start: 1;
  grid-column-end: 5;
  height: 30vh;
  grid-row-start: 3;
  color: #F7F7F7;
  border-radius: 5px 5px 5px 5px;
  font-family: 'Lexend Exa', sans-serif;
  background-color: #0DD9C4;
  margin-top: 2vh;
  margin-left: 2vw;
  margin-right: 2vw;
  grid-template-rows: 4vh 4vh 4vh 4vh 2vh 7vh 6vh;
  grid-template-columns: 1vw 2vw 2vw 2vw 2vw 2vw 2vw 2vw 2vw 2vw 2vw 1vw;
  
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
  grid-column-start: 1;
  grid-column-end: 13;
  margin: auto;
  font-opacity: 0.9;
  border-bottom: 1px solid white;
`;

const SideBlock = styled.div`
  width: 100%;
  grid-row-start: 2;
  grid-row-end: 6;
  grid-column-start: 1;
  grid-column-end: 13;
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

const PlacementSide = styled.div`
  grid-column-start: 2;
  grid-column-end: 5;
  grid-row-start: 2;
  grid-row-end: 3;
  font-size 150%;
`;

const PctCube = styled.div`
  grid-column-start: ${props => props.start};
  grid-column-end: ${props => props.end};
  border: solid 1px grey;
  margin-left: 0.1vw;
  grid-row-start: ${props => {
    if (props.index > 10)
      return ('4')
    else
      return ('3')
  }};
  grid-row-end: ${props => {
    if (props.index > 10)
      return ('5')
    else
      return ('4')
  }};
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


function PUBGStat(props) {
  let { id } = useParams()
  const history = useHistory()
  const [alert, setAlert] = useState(null)
  const [stats, setStats] = useState()
  const [cubes, setCubes] = useState(20)

  useEffect(() => {

    /*axios.defaults.headers.common["API"] = localStorage.getItem('token');
    axios.post("http://localhost:8080/stats/pubg", {
      pseudo: id
    }).then(res => {
      setStats(res.data.success)
    }).catch(err => {
      setAlert(err.response.data.error)
    })*/
  }, [])

  //if (!stats)
  //  return(<SLoader size="lg" content="Chargement..."/>)

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
        <Logo src={PUBGLogo} alt="PUBG_logo"></Logo>
        <Pseudo>{id}</Pseudo>
        <SideStat>
          <SideTitle>Vos stats général sur les 20 dernières games</SideTitle>
          <PlacementSide>#{23}</PlacementSide>
          <PctCube index={1} start={1 + 1} end={1 + 2}>20</PctCube>
          <PctCube index={1} start={2 + 1} end={2 + 2}>99</PctCube>

          <SideBlock start={2} end={3}>
          </SideBlock>

          
        </SideStat>
        <Hist>
          <Title>Sur vos 20 derniers matches</Title>
          <Table
          height={475}>
          <Column width={70} align="center" fixed>
            <HeaderCell>Mode</HeaderCell>
            <Cell dataKey="" />
          </Column>

          <Column width={200}>
            <HeaderCell>#PLACEMENT</HeaderCell>
            <Cell dataKey="" />
          </Column>

          <Column width={200}>
            <HeaderCell>KILLS</HeaderCell>
            <Cell dataKey="" />
          </Column>

          <Column width={200}>
            <HeaderCell>DAMAGES</HeaderCell>
            <Cell dataKey="" />
          </Column>

          <Column width={200}>
            <HeaderCell>DISTANCE</HeaderCell>
            <Cell dataKey="" />
          </Column>

          <Column width={200}>
            <HeaderCell>TIME</HeaderCell>
            <Cell dataKey="" />
          </Column>

          </Table>
        </Hist>
      </Grid>
    </div>
  )
}

export default PUBGStat