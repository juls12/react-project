import React from 'react';
import axios from 'axios';
import { Table, Button, Col, Row, Container } from 'reactstrap';
import { BsCheck, BsX } from "react-icons/bs";

export default class TableStats extends React.Component {
    state = {
        tablestats: [],
    };

    // Server runs on port 3001

    componentDidMount() {
        axios.get(`http://localhost:3001/courses`)
            .then(res => {
                this.setState({ tablestats: res.data });
            });
    }

    render() {
        return (
            <Col  >
                <Row>
            <Table responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Bookable</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.tablestats.slice(-5).map(tablestat =>
                        <tr key={tablestat.id}>
                            <th scope="row"></th>
                            <td>{tablestat.title}</td>
                            <td style={{textAlign: "center"}}>{
                                tablestat.open ? <BsCheck /> : <p> <BsX /></p>
                            }</td>
                            <td>{tablestat.price.normal}</td>
                            <td>{tablestat.dates.start_date} - {tablestat.dates.end_date}</td>
                            <td><Button color="info">View Details</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
            </Row>
            </Col>
      
            
        );
    }
}