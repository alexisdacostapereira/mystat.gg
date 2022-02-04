import React, { useState, useEffect } from "react";
import styled from 'styled-components'
import { BrowserRouter, Route, Link, useHistory, useParams } from "react-router-dom"
import bg from '../icons/fond.png'
import NavComp from './NavComp'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import Axios from "axios";
import { Alert } from 'rsuite';
import { Dropdown } from 'semantic-ui-react'
import { Input, Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock } from 'rsuite';

const NF = styled.h1`
    margin-left: 3vw;
    color: white;
`;

function NotFound(props) {

    return (
        <div style={{backgroundImage: `url(${bg})`, width: '100%', height: '100%'}}>
            <NF>404 Vous n'êtes pas sur la bonne page !</NF>
        </div>
    )
}

export default NotFound