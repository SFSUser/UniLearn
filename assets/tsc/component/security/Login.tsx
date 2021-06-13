import React, { Component } from "react";
import { Button, Form, Tabs, Tab, Alert } from "react-bootstrap";
import { Center } from '../utils/Fragment';
import { LogIn } from 'react-feather';
import LoginProp from "../../entity/security/props/LoginProp";
import LoginState from "../../entity/security/states/LoginState";
import SRouter from "../../helper/SRouter";
import UserBL from "../../BL/UserBL";
import { HttpResponse } from "../../entity/common/HttpEntity";

export default class Login extends Component<LoginProp, LoginState> {
    constructor(props: LoginProp) {
        super(props);
        this.state = new LoginState();
        SRouter.load();
    }

    private async handleRegister(e: any){
        e.preventDefault();
        let me = this;
        const result = await UserBL.register(me.state.user) as HttpResponse;
        console.log(result);
        if(!result.OK){
            me.setState({
                error: result.message
            });
        }
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
        return (
            <>
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="login" title="Iniciar sesión">
                        <div className="p-2 mt-3">
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Correo electrónico</Form.Label>
                                    <Form.Control required={true} type="email" placeholder="Ingresar correo" />
                                    <Form.Text className="text-muted">
                                        Nunca compartas tu cuenta con nadie mas
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control required={true} type="password" placeholder="Ingresar contraseña" />
                                </Form.Group>
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