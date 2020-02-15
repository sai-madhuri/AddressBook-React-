import Home from "./App.js";
import DisplaySelectedContact from "./App";
import DetailsForm from "./DetailsForm";
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/displaySelectedContact" component={DisplaySelectedContact}></Route>
                    <Route path="/detailsForm" component={DetailsForm}></Route>
                </Switch>
            </Router>
        );
    }
}

export default App;