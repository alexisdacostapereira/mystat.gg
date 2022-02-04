import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Link, Switch, useLocation, Redirect } from "react-router-dom"

function PrivateRoute(props) {
  const location = useLocation()
  
  return localStorage.getItem('token') ? (
    <Route {...props}/>
  ) : (
    <Redirect to={{pathname: "/", state: { from: location}}}/>
  )
}

export default PrivateRoute