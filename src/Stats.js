import React from 'react';
import axios from 'axios';
import { Card, Row, Col, CardText, Badge } from 'reactstrap';

export default class Stats extends React.Component {
    state = {
        stats: []

    };

    // Server runs on port 3001

    componentDidMount() {
        axios.get(`http://localhost:3001/stats`)
            .then(res => {
                this.setState({ stats: res.data });
            });
    }

    render() {
        return (
            <Row className="stats-row">
                {this.state.stats.map(stat => 
                    <Col sm="3" key={stat.id}>
                        <Card body className="stats-body" > 
                        <CardText  className="stats-txt">{stat.title}  <Badge color="dark" pill> {stat.amount} </Badge></CardText>
                        </Card>
                    </Col>
                )}
            </Row>
        );
    }
}