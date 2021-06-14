import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import MainPage from './MainPage';
import HomePage from './HomePage';
import { MainContext } from '../context/MainContext';
import LoginBL from '../BL/UserBL';

export default class BasePage extends Component {  
    static contextType = MainContext;

    componentDidMount(){
        let me = this;
        me.checkLogin();
    }

    private async checkLogin(){
        let me = this;
        let result = await LoginBL.check();
        me.context.main.Login = result.OK;
        console.log("check_login", result.OK);
    }

    private async logout(){
        let me = this;
        let result = await LoginBL.logout();
        me.context.main.Login = false;
        ///console.log("logout", result);
    }

    render (){
        let me = this;
        return (
            <div>
                <HashRouter>
                    <Navbar bg="light" variant="light">
                        <Navbar.Brand href="#home">UniLearn</Navbar.Brand>
                        <Nav className="mr-auto">
                            <Link className="nav-link" to="/">Inicio</Link>
                            { me.context.main.Login &&
                                <a onClick={ e => me.logout() } className="nav-link">Cerrar sesión</a>
                            }
                        </Nav>
                    </Navbar>
                    <Switch>
                        <Route exact path="/login">
                            <MainPage/>
                        </Route>
                        { me.context.main.Login ? 
                            <Route exact path="/">
                                <HomePage/>
                            </Route>
                            :
                            <Redirect to="/login"/>
                        }
                    </Switch>
                </HashRouter>
            </div>
        );
    }
}