import React, { Component } from "react";
import { Button, Form, Tabs, Tab, Alert } from "react-bootstrap";
import { Center } from '../utils/Fragment';
import { LogIn } from 'react-feather';
import LoginProp from "../../entity/security/props/LoginProp";
import LoginState from "../../entity/security/states/LoginState";
import SRouter from "../../helper/SRouter";
import UserBL from "../../BL/UserBL";
import { Redirect } from "react-router";
import { MainContext } from '../../context/MainContext';
import { HttpResponse } from "../../entity/common/HttpEntity";

export default class Login extends Component<LoginProp, LoginState> {
    static contextType = MainContext;

    constructor(props: LoginProp) {
        super(props);
        this.state = new LoginState();
        SRouter.load();
    }

    private async handleRegister(e: any){
        e.preventDefault();
        let me = this;
        const result = await UserBL.register(me.state.user);
        console.log(result);
        if(!result.OK){
            me.setState({
                error: result.message
            });
        } else {
            me.setState({
                register: false,
                message: "Ya create tu cuenta, ahora puede iniciar sesión"
            });
        }
    }

    private async handleLogin(e: any){
        e.preventDefault();
        let me = this;
        const result: HttpResponse = await UserBL.login(me.state.user);
        console.log(result);
        me.context.main.Login = result.OK;
        console.log("Context", me.context.main);
    }

    private setUser(event: any){
        let me = this;
        let dom = event.target;
        let user: any = me.state.user;
        user[dom.name] = dom.value;
        me.setState({
            user: user
        });
    }

    render() {
        let me = this;

        if(me.context.main.Login){
            return <Redirect to='/' />
        }

        return (
            <>
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="login" title="Iniciar sesión">
                        <div className="p-2 mt-3">
                            <Form onSubmit={ e => me.handleLogin(e) }>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control required={true}  value={ me.state.user.username } onChange={ e => me.setUser(e) } name="username" placeholder="Ingresar usuario" />
                                    <Form.Text className="text-muted">
                                        Nunca compartas tu cuenta con nadie mas
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control required={true}  value={ me.state.user.password } onChange={ e => me.setUser(e) } name="password" type="password" placeholder="Ingresar contraseña" />
                                </Form.Group>
                                { me.state.message && 
                                    <Alert variant="info">{me.state.message}</Alert>
                                }
                                <Center>
                                    <Button variant="primary" type="submit">
                                        <LogIn /> Iniciar sesión
                                    </Button>
                                </Center>
                            </Form>
                        </div>
                    </Tab>
                    <Tab eventKey="register" title="Registrarme">
                        <div className="p-2 mt-3">
                            <Form onSubmit={ e => me.handleRegister(e) }>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control value={ me.state.user.username } onChange={ e => me.setUser(e) } name="username" required={true} type="text" placeholder="Nombres" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Nombres</Form.Label>
                                    <Form.Control value={ me.state.user.firstName } onChange={ e => me.setUser(e) } name="firstName" required={true} type="text" placeholder="Nombres" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Apellidos</Form.Label>
                                    <Form.Control value={ me.state.user.lastName } onChange={ e => me.setUser(e) } name="lastName" required={true} type="text" placeholder="Apellidos" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control value={ me.state.user.email } onChange={ e => me.setUser(e) } required={true} type="email" name="email" placeholder="Ingresar correo" />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control value={ me.state.user.password } onChange={ e => me.setUser(e) } required={true} type="password" name="password" placeholder="Ingresar contraseña" />
                                </Form.Group>
                                { me.state.error && 
                                    <Alert variant="danger">{me.state.error}</Alert>
                                }
                                <Center>
                                    <Button variant="primary" type="submit">
                                        <LogIn /> Registrarme
                                    </Button>
                                </Center>
                            </Form>
                        </div>
                    </Tab>
                </Tabs>
            </>
        )
    }
}