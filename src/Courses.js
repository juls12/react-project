import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
import "./Box.css"
import { Card } from "react-bootstrap";
import { Button } from 'reactstrap';
import { Badge } from 'reactstrap';

// import {
//   Card, CardText, CardBody, CardLink,
//   CardTitle, CardSubtitle
// } from 'reactstrap';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch ("http://localhost:3001/courses")
        .then((res) => res.json())
        .then((data) => {
            setCourses(data);
        });
    }, []);

    return (
        <div>
            <h1>All Courses </h1>
            <div class="row">
    <div class="col-sm-12 d-flex justify-content-center">
               
                        
                {courses.length &&
                courses.map(({ id, title, imagePath, price, open, duration, dates}) => (
                    <Card style={{ width: '20rem' }} key={id} className="box">
                    <Card.Title>{title}</Card.Title>
                    <Card.Img variant="top" src={imagePath} />
                    <Card.Body>
        
                    <Card.Text>
                        <p style={{fontWeight: "bold"}}>Price:  {price.normal} / Bookable: {open}  </p>
                        <div style={{fontWeight: "bold"}}>Duration: {duration} </div>
                        <div style={{fontWeight: "bold"}}>Dates: {dates.start_date} - {dates.end_date} </div>
                    </Card.Text>
                        <Button style={{float: 'right'}} color="primary" key={id} variant="primary">View</Button>
                        
                    </Card.Body>
                    </Card>
                ))}
               
               
            </div>
            </div>
        </div>
    );

};

export default Courses;
