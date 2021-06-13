import React, { Component } from "react";
import { Col, Row, Card } from "react-bootstrap";
import Login from '../component/security/Login'

export default class MainPage extends Component {
    render(){
        return (
            <div className="fixer">
                <Row>
                    <Col></Col>
                    <Col>
                        <Card className="mt-2">
                            <Card.Header>
                                Iniciar sesión
                            </Card.Header>
                            <Card.Body>
                                <Login />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );    
    }
}