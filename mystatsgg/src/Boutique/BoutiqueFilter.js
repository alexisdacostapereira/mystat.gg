import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form"
import React, { useState, useEffect } from "react";

export const Filter =() => {
    const [value, setValue] = useState("")

    return (
        <div className="searchbar">
        <Card style={{width: "30vh", height: "auto"}}>
            
            <Card.Body>
            <Card.Title>Recherche</Card.Title>
            <input
            style={{ width: "40%" }}
            type="text"
            placeholder="Entrer un mot clé"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        </Card.Body>
        </Card>
    </div>
    )
}