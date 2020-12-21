import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, CardText, Badge, Container } from 'reactstrap';

const Stats = (props) => {

    const [stats, setStats] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios(`http://localhost:3001/stats`);
            setStats(result.data);
        }
        fetchData();
    }, []);

    return (
        <Container fluid>
            <Col md="12">
                <Row className="stats-row">
                    {stats.map(stat =>
                        <Col key={stat.id}>
                            <Card body className="stats-body" >
                                <CardText className="stats-txt">{stat.title}  <Badge color="dark" pill> {stat.amount} </Badge></CardText>
                            </Card>
                        </Col>
                    )}
                </Row>
            </Col>
        </Container>
    );
}

export default Stats;