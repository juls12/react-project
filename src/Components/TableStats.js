import React from 'react';
import axios from 'axios';
import { Table, Button, Container, UncontrolledTooltip } from 'reactstrap';
import { BsCheck, BsX, BsExclamationCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';


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

        const convertDate = function (dateString) {
            return dateString.split("-").reverse().join("-");
        }

        const generateTooltipId = function(id) {
            return "tooltipId_" + id;
        }


        return (
            <Container fluid>

                <Table responsive >
                    <thead>

                        <tr>
                            <td colSpan="6" style={{ backgroundColor: "lightgray" }}>Last {this.state.tablestats.slice(-5).length} Courses</td>
                        </tr>
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
                                <th scope="row">
                                    <p id={generateTooltipId(tablestat.id)}> <BsExclamationCircle /></p>
                                    <UncontrolledTooltip placement="right" target={generateTooltipId(tablestat.id)}>
                                        {tablestat.title} </UncontrolledTooltip></th>
                                <td>{tablestat.title}</td>
                                <td style={{ textAlign: "center" }}>{
                                    tablestat.open ? <BsCheck /> : <p> <BsX /> </p>
                                }</td>
                                <td>{tablestat.price.normal}</td>
                                <td>{convertDate(tablestat.dates.start_date)} - {convertDate(tablestat.dates.end_date)}</td>
                                <td><Button color="info">View Details</Button></td>
                            </tr>
                        )}
                        <tr>
                            <td colSpan="6" style={{ backgroundColor: "lightgray", textAlign: "right" }} > <Button color="primary" tag={Link} to="/courses">View all</Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

        );
    }
}