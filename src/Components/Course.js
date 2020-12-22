import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import "../css/courses.css"
import AddCourse from './AddCourse';
import { BsCheck, BsX } from "react-icons/bs";
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Course = (props) => {

    const [course, setCourse] = useState({});
    const [instructors, setInstructors] = useState([]);
    const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);

    let [refreshCourse, setRefreshCourse] = useState(0);


    const encodeQueryData = function (param, data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    


    useEffect(() => {
        async function fetchData() {
            axios.get(`http://localhost:3001/courses/${props.match.params.id}`)
                .then(res => {
                    console.log(res.data);
                    setCourse(res.data);
                    return res.data
                })
                .then(course => {
                    const queryParams = encodeQueryData('id', course.instructors)
                    console.log(queryParams);
                    if (queryParams) {
                        axios.get(`http://localhost:3001/instructors?${queryParams}`)
                            .then(res => {
                                console.log(res.data);
                                setInstructors(res.data);
                                // this.setState({ instructors: res.data });
                            })
                    } else {
                        setInstructors([])
                    }
                });
        }
        fetchData();

    }, [props.match.params.id, refreshCourse]); // Only re-subscribe if props.match.params changes


    const toggleModalEdit = function () {
        setModalIsOpenEdit(!modalIsOpenEdit);

        if (modalIsOpenEdit) {
            console.log('modal is closing, lets refresh course');
            // getCourseData(course.id);
            setRefreshCourse(refreshCourse += 1);
        }
    }

    const toggleModalDelete = function () {
        setModalIsOpenDelete(!modalIsOpenDelete)
    }

    const closeModalDelete = function () {
        setModalIsOpenDelete(false);
    }

    const deleteCourse = function (e) {
        const { match: { params } } = props;
        e.preventDefault();
        axios.delete(`http://localhost:3001/courses/${params.id}`)
            .then(() => {
                return axios.get(`http://localhost:3001/courses`)
            })
            .then(res => {
                console.log(res.data)
                setCourse({})
            })
            .then(res => {
                props.history.push('/courses');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const convertDate = function (dateString) {
        if (dateString) {
            return dateString.split("-").reverse().join("-");
        } else {
            return ''
        }
    }

    return (
        <Container fluid>
            <Card>
                <CardTitle className="text-center"><h1>{course.title}</h1></CardTitle>
                <CardBody>
                    <CardImg className="imgs1" src={course.imagePath} alt="Card image cap" />
                    <CardText>
                        <span style={{ fontWeight: "bold" }}>Price: {course.price?.normal}‎€</span>
                        <br />
                        <span style={{ fontWeight: "bold" }}> Bookable: {course.open ? <BsCheck /> : <BsX />}</span>
                        <br />
                        <span style={{ fontWeight: "bold" }}> Duration: {course.duration}</span>
                        <br />
                        <span style={{ fontWeight: "bold" }}> Dates: {convertDate(course.dates?.start_date)} - {convertDate(course.dates?.end_date)} </span>
                        <br />
                        <span style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: course.description }}></span>
                        <br />
                        <Button color="primary" onClick={toggleModalEdit.bind(this)}>Edit</Button>

                        <Modal isOpen={modalIsOpenEdit} size="lg">
                            <ModalHeader toggle={toggleModalEdit.bind(this)}>Edit Course</ModalHeader>
                            <ModalBody><AddCourse isEditMode={true} newCourse={course} /></ModalBody>
                        </Modal>

                        <Button color="danger" className="ml-3" onClick={toggleModalDelete.bind(this)}>Delete</Button>
                        <br />
                        <Modal isOpen={modalIsOpenDelete}>
                            <ModalHeader toggle={toggleModalDelete.bind(this)}>Delete Course</ModalHeader>
                            <ModalBody>
                                <h2>Are sure you want to delete this {course.title} course?</h2>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={deleteCourse.bind(this)}>Delete</Button>{' '}
                                <Button color="secondary" onClick={closeModalDelete.bind(this)} >Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </CardText>
                    <CardTitle tag="h3">Instructors</CardTitle>
                    {instructors.map(({ id, name, email, dob, bio, linkedin }) => (
                        <CardText key={id}>
                            <span style={{ fontWeight: "bold" }}> {name.first} {name.last} ({dob}) </span>
                            <br />
                            <span style={{ fontWeight: "bold" }}> <a href={email}>{email}</a> | <a href={linkedin}>Linkedin</a></span>
                            <br />
                            <span style={{ fontWeight: "bold" }}> {bio} </span>
                        </CardText>
                    ))}
                </CardBody>
            </Card>
        </Container>
    );
}

export default Course;