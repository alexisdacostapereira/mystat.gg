import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { BrowserRouter, Route, Link, useHistory, useParams } from "react-router-dom"
import bg from '../icons/fond.png'
import NavComp from './NavComp'
import Axios from "axios";
import { Alert } from 'rsuite';
import { Dropdown, Dimmer, Loader, Image, Segment }  from 'semantic-ui-react'
import { Input, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite';

export const NewsContainer = styled.div`
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
export const NewsCard = styled.div`
&:hover {
  background-color: #302e30;
}
background-color: #141214;
border-radius: 20px;
margin: 2vh;
display: grid;
grid-template-columns: 1fr 2fr;
`

export const NewsImage = styled.image`
  border-radius: 5px;
  background-size: cover;
  max-width: 400px;
  height: 233px;
  grid-column: 1;
`

export const NewsTextContainer = styled.div`
width: 58vw;
grid-column: auto;
padding-top: 1vh;
`


export const NewsTitle = styled.h3`
color: white;
`
export const NewsDate = styled.p`
color: white;
font-style: italic;
`

export const NewsGame = styled.h2`
color: white;
font-style: italic;
`

export const NewsDescription = styled.p`
color: white;
font-size: 20px;
`

export const ParamsDiv = styled.div`
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


export const NewsButton = styled.button`
  background-color: white;
  border-radius: 15px;
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
`

const News = () => {
  const [page, setPage] = useState(1);
  const [actualities, setActualities] = useState([]);
  const [pref, setPref] = useState([])
  const [alert, setAlert] = useState(null)
  const [options, setOptions] = useState([])
  const [values, setValues] = useState([])

  const getNews = () => {
    Axios.defaults.headers.common["API"] = localStorage.getItem('token');
    Axios.get(`http://localhost:8080/actualities/page=${page}`)
        .then(res => {
          setActualities(res.data)
          setPage(page + 1)
        }).catch(err => {
        setAlert(err.response.data.error)
      })
  }

  console.log(localStorage.getItem('token'))

  if (alert) {
    Alert.error(alert)
    setAlert(null)
  }

  const getPrefs = () => {
    Axios.defaults.headers.common["API"] = localStorage.getItem('token');
    Axios.get(`http://localhost:8080/actualities/get_preferences`)
        .then(res => {
          setPref(res.data.success)
          const arrayOptions = []
          const arrayValues = []
          Object.entries(res.data.success).map(value => {
            if (value[1] == false) {
              arrayOptions.push({key: value[0], text: formatString(value[0]), value: value[0]})
            }
            else {
              console.log(value[0])
              arrayValues.push(<span>{value[0]}</span>)
            }
          })
          setOptions(arrayOptions)
          setValues(arrayValues)
        })
  }

  function formatString(str) {
    let real = str.replace("Actu", "").charAt(0).toUpperCase() +  str.replace("Actu", "").slice(1).replace(/([A-Z]|[0-9])/g, ' $1').trim()
    return real
  }

  function unformatString(str) {
    
  }

  useEffect(() => {
    getPrefs()
    getNews()
  }, [])

  function handleScroll(event) {
    const target = event.target
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      getNews(page)
    }
  }
  async function sendPreferences() {
    Axios.defaults.headers.common["API"] = localStorage.getItem('token');
    await Axios.put(`http://localhost:8080/actualities`, values)
        .then(res => {
          console.log("PREFERENCES MODIFIED")
          
        }).catch(err => {
          setAlert(err.response.data.error)
    })
    await Axios.get(`http://localhost:8080/actualities/page=${1}`)
        .then(res => {
          setActualities(res.data)
          setPage(1)
        }).catch(err => {
          setAlert(err.response.data.error)
      })
  }

  function handlePrefChange(event) {
    setValues(values.concat(event.target))
  }


  let isLoaded = actualities.length == 0 ? <Dimmer active>
  <Loader size='massive'>Loading</Loader>
  </Dimmer> : actualities.map((val, key) => {
                      
                      return (
                        <>
                            <NewsCard>
                              <NewsImage style={{backgroundImage: `url(${val.img})`}}/>
                              <NewsTextContainer onClick={() => window.location=val.link}>
                                <NewsGame>
                                {val.game}
                                </NewsGame>
                                <NewsTitle>
                                  {val.title}
                                </NewsTitle>
                                <NewsDate>
                                  {val.date}
                                </NewsDate>
                                <NewsDescription>
                                  {val.description}
                                </NewsDescription>
                              </NewsTextContainer>
                            </NewsCard>
                      </>
                      );
                  })



  return (
      <div style={{backgroundImage: `url(${bg})`, width: '100%', height: '100%'}}>
          <NavComp/>
          <ParamsDiv>
          <h1 style={{textAlign: "center"}}>Préférences</h1>
            <Form>
            <Dropdown placeholder='Games' clearable fluid search multiple selection onChange={(event) => handlePrefChange(event)}  options={options}/>
            <Button onClick={sendPreferences} style={{marginLeft: "1vh", marginTop: "2vh", width: '10vw'}} appearance="default">Envoyer</Button>
            </Form>
          </ParamsDiv>
          <NewsContainer class="shadow" onScroll={(event) => handleScroll(event)}>
          {isLoaded}
          </NewsContainer>
          </div>
  )
}

export default News;