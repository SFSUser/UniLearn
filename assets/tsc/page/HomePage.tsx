import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import UserBL from '../BL/UserBL';

export default class HomePage extends Component {
    render() {
        let me = this;
        return (
            <div className="fixer pt-2">
                <Card>
                    <Card.Header>Bienvenido, {`${UserBL.SessionData.firstName} ${UserBL.SessionData.lastName}`}</Card.Header>
                    <Card.Body>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sed quaerat, consectetur repellendus nulla, nostrum aperiam cum quae, velit itaque accusantium a? Repellat optio iusto ratione beatae incidunt nisi itaque.
                    </Card.Body>
                </Card>
            </div>
        );
    }
}