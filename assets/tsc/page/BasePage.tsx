import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import MainPage from './MainPage';

export default class BasePage extends Component {
    render (){
        return (
            <div>
                <HashRouter>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand href="#home">UniLearn</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route exact path="/">
                            <MainPage/>
                        </Route>
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}