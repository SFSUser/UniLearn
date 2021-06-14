import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { HashRouter, Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import MainPage from './MainPage';
import HomePage from './HomePage';
import { MainContext } from '../context/MainContext';
import LoginBL from '../BL/UserBL';
import LoaderBackdrop from '../component/utils/LoaderBackdrop';
import BasePageProp from '../entity/page/props/BasePageProp';
import BasePageState from '../entity/page/states/BasePageState';

export default class BasePage extends Component<BasePageProp, BasePageState> {  
    static contextType = MainContext;

    constructor(props: BasePageProp){
        super(props);
        this.state = new BasePageState();
    }

    componentDidMount(){
        let me = this;
        me.checkLogin();
    }

    private async checkLogin(){
        let me = this;
        let result = await LoginBL.check();
        me.setState({
            busy: false
        });
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
                {me.state.busy ? 
                    <LoaderBackdrop message="Cargando sitio" visible={true} translucid={false}/>
                :
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
                }
            </div>
        );
    }
}