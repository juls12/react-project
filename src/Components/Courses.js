import React, { useEffect, useState } from 'react';
import "../css/courses.css"
import { Card, Row, Col } from "react-bootstrap";
import { Button, Container } from 'reactstrap';
import { BsCheck, BsX } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    const [searchText, setSearchField] = useState('');

    useEffect(() => {
        fetch("http://localhost:3001/courses")
            .then((res) => res.json())
            .then((data) => {
                setCourses(data);
            });
    }, []);

    const convertDate = function (dateString) {
        return dateString.split("-").reverse().join("-");
    }

    const generateCourseLink = function (id) {
        return `course/${id}`
    }

    const filterCourses = ({ target }) => {
        const searchText = target.value;
        console.log(searchText);

        setSearchField(searchText);
    }

    return (
        <div>
            <h1 className="text-center text-focus-in">All Courses </h1>

            <div className="cards">
                <Container fluid>
                    <Col xs="12">
                        <section> <input className="searchbox" placeholder="Search Course" onChange={filterCourses} /></section>
                        <Row>
                            {
                                courses.filter(course => {
                                    return course.title.toLowerCase().includes(searchText.toLowerCase())
                                }).map(({ id, title, imagePath, price, duration, open, dates }) => (
                                    <Card style={{ width: '20rem' }} key={id} className="box">
                                        <Card.Title>{title}</Card.Title>
                                        <Card.Img variant="top" src={imagePath} />
                                        <Card.Body>
                                            <Card.Text>
                                                <span style={{ fontWeight: "bold" }}> Price:  {price.normal} | Bookable: {open ? <BsCheck /> : <BsX />}</span>
                                                <br />
                                                <span style={{ fontWeight: "bold" }}> Duration: {duration}  </span>
                                                <br />
                                                <span style={{ fontWeight: "bold" }}> Dates: {convertDate(dates.start_date)} - {convertDate(dates.end_date)} </span>
                                            </Card.Text>
                                            <Button style={{ float: 'right' }} color="primary" tag={Link} to={generateCourseLink(id)} >View</Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                        </Row>
                    </Col>
                </Container>
            </div>
        </div>
    );
};

export default Courses;
