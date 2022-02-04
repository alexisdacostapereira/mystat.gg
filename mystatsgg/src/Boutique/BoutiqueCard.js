import React from 'react';
import Card from "react-bootstrap/Card";
import { Button} from 'react-bootstrap';


export const BoutiqueCard = ({ title,img, price, discount,link, description }) => {
    return (
      <>
      <Card style={{ width: '17rem', height: "auto", display:'inline-block', borderRadius:"30px", marginRight:"10px", marginLeft:"15px", marginBottom:"20px"}}>
      <Card.Img variant="top" src={img} style={{borderRadius:"30px"}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text> {price}€ | {discount}</Card.Text>
        <a class="btn btn-success" href={link} role="button">Acheter</a>
      </Card.Body>
      
    </Card>


    </>
    );

    }