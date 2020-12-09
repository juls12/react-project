import React, { useEffect, useState } from 'react';
import "../css/courses.css"
import { Card, Row, Col } from "react-bootstrap";
import { Button } from 'reactstrap';

// import {
//   Card, CardText, CardBody, CardLink,
//   CardTitle, CardSubtitle
// } from 'reactstrap';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/courses")
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
            });
    }, []);

    return (
         
        <div>            
            <h1>All Courses </h1>

            <div className="cards">
            <Col xs="12">
                 <Row>
                {courses.length && courses.map(({ id, title, imagePath, price, duration, dates }) => (
                    <Card style={{ width: '20rem' }} key={id} className="box">
                        <Card.Title>{title}</Card.Title>
                        <Card.Img variant="top" src={imagePath} />
                        <Card.Body>
                            <Card.Text>
                                <span style={{ fontWeight: "bold" }}> Price:  {price.normal} / Bookable:  </span>
                                <span style={{ fontWeight: "bold" }}> Duration: {duration} </span>
                                <span style={{ fontWeight: "bold" }}> Dates: {dates.start_date} - {dates.end_date} </span>
                            </Card.Text>
                            <Button style={{ float: 'right' }} color="primary">View</Button>
                        </Card.Body>
                    </Card>
                ))}
                </Row>
             </Col>
            </div>
            
        </div>
    );

};

export default Courses;
