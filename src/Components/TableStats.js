import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Container, UncontrolledTooltip } from 'reactstrap';
import { BsCheck, BsX, BsExclamationCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';

const TableStats = (props) => {

    const [tablestats, setTableStats] = useState([]);


    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios('http://localhost:3001/courses',);
            setTableStats(result.data);
        }
        fetchData();
    }, []);


    //     useEffect(async () => {

    //     const fetchData = async () => {
    //         const result = await axios('http://localhost:3001/courses',);
    //         setTableStats(result.data);
    //     };

    //     fetchData();
    // }, []);


    const convertDate = function (dateString) {
        return dateString.split("-").reverse().join("-");
    }
    // Generate unique id for every tooltip    
    const generateTooltipId = function (id) {
        return "tooltipId_" + id;
    }

    const generateCourseLink = function (id) {
        return `course/${id}`
    }

    //Table reponsives makes it horizontally scrollable on small screen devices
    return (
        <Container fluid>
            <Table responsive >
                <thead>
                    <tr>
                        <td colSpan="6" style={{ backgroundColor: "#e9ecef" }}>Last {tablestats.slice(-5).length} Courses</td>
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
                    {tablestats.slice(-5).map(tablestat =>
                        <tr key={tablestat.id}>
                            <th scope="row">
                                <p id={generateTooltipId(tablestat.id)}> <BsExclamationCircle /></p>
                                <UncontrolledTooltip placement="right" target={generateTooltipId(tablestat.id)}>
                                    {tablestat.duration} </UncontrolledTooltip></th>
                            <td>{tablestat.title}</td>
                            <td style={{ textAlign: "center" }}>{
                                tablestat.open ? <BsCheck /> : <p> <BsX /> </p>
                            }</td>
                            <td>{tablestat.price.normal}‎ €</td>
                            <td>{convertDate(tablestat.dates.start_date)} - {convertDate(tablestat.dates.end_date)}</td>
                            <td><Button color="info" tag={Link} to={generateCourseLink(tablestat.id)}>View Details</Button></td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan="6" style={{ backgroundColor: "#e9ecef", textAlign: "right" }} > <Button color="primary" tag={Link} to="/courses">View all</Button></td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
}

export default TableStats;