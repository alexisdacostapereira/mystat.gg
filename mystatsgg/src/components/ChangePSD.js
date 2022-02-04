import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import NavComp from '../components/NavComp'
import bg from '../icons/fond.png'
import { Input, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite';
import logo from '../icons/logo.png'
import logoGoogle from '../icons/logoGoogle.png'
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios'
import { Alert, Modal } from 'rsuite';

function ChangePSD(props) {
    const [pwd, setPwd] = useState()
    const [infos, setInfos] = useState(true)
    const [alert, setAlert] = useState(null)
    const [success, setSuccess] = useState(null)

    const handleClose = () => {
        setInfos(!infos)
        props.setClicked(false)
    }

    function handleClick() {
        if (!pwd || pwd.length < 6) {
            setAlert("Le mot de passe doit faire au moins 6 caractères")
            return
        }
        axios.defaults.headers.common["API"] = localStorage.getItem('token');
        axios.post('http://localhost:8080/user/update_password', {
            password: pwd
        }).then(res => {
            Alert.success("Mot de passe changé")
            handleClose()
        }).catch(err => {
            if (err.response)
                setAlert(err.response.data.error)
            else
                setAlert("ERROR")
        })
    }

    if (success) {
        Alert.success(success)
        setSuccess(null)
    }

    if (alert) {
        Alert.error(alert)
        setAlert(null)
    }

    return (
        <Modal show={infos} onHide={handleClose}>
            <Modal.Title>Changer de mot de passe</Modal.Title>
            <Input size="lg" name="Password" Type="Password" onChange={(event) => setPwd(event)}></Input>
            <Button appearance='primary' onClick={handleClick} style={{marginTop: "3vh"}}>Appliquer</Button>
        </Modal>
    )
}

export default ChangePSD