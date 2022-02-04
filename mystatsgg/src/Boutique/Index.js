
import React, { useState, useEffect } from "react";
import {BoutiqueCard} from './BoutiqueCard';
import NavComp from '../components/NavComp'
import {Filter} from './BoutiqueFilter'
import { BoutiqueWrapper, BoutiqueBg } from "./BoutiqueElement";
import bg from '../icons/fond.png'
import Axios from "axios";
import styled from 'styled-components'
import { Input, Button, Form, Slider, RangeSlider} from 'rsuite';

export const ParamsDiv = styled.div`
margin-top: 5vh;
margin-left: 4vh;
padding: 1vh;
color: white;
height: auto;
width: 20vh;
background-color: #41E29B;
border-radius: 5px;
float: left;
font-size: 15px;
`

const Boutique = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1)

  

  const getGames = () => {
    Axios.defaults.headers.common["API"] = localStorage.getItem('token');
    Axios.get(`http://localhost:8080/games/page=${page}`)
      .then(res => {
          setGames(res.data.success)
          setPage(page + 1)
      })
  }

  useEffect(() => {
    getGames()
  }, [])


  function handleScroll(event) {
    const target = event.target
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      getGames(page)
      
    }
  }

  const [name, setName] = useState('');
  const [min_price, setMin_price]= useState(0);
  const [max_price, setMax_price]= useState(100);

  const handleInpunt = () => {
    Axios.defaults.headers.common["API"] = localStorage.getItem('token');
    Axios.post(`http://localhost:8080/games/page=1`,{
      name: name,
      min_price: min_price,
      max_price: max_price
    })
    .then(res => {
      setGames(res.data.success)
      
    })
}

function setPrice (e){
  setMin_price(e[0])
  setMax_price(e[1])
}

  return (
     <>
     <div style={{backgroundImage: `url(${bg})`, width: '100%', height: '100%'}}>
     <NavComp/>
     <ParamsDiv>
          <h1 style={{textAlign: "center"}}>Recherche</h1>
            <Form>
            <Input   onChange={(e) => setName(e)} />
            <hr/>
            <p>Prix min - max :</p>
            <RangeSlider defaultValue={[min_price, max_price]} onChange={(e) => setPrice(e)}/>
            <p style={{float:"left"}}>{min_price}</p>
            <p style={{textAlign:"right", float:"right" }}>{max_price}</p>
            <Button  onClick= {() => handleInpunt()} style={{marginLeft: "1vh", marginTop: "2vh", width: '8vw'}} appearance="default">Envoyer</Button>
            </Form>
      </ParamsDiv>
     
      <BoutiqueBg onScroll= {(event) => handleScroll(event)}>
      
        {games.map((game) => (
            <BoutiqueCard
              img={game.imglink}
              title={game.name}
              price={game.price}
              discount={game.promo}
              link={game.link}
              key={game.id}
            />
          ))}
      </BoutiqueBg>
      </div>
    </>
   );
  };

  export default Boutique;