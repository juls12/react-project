import React from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import "../css/courses.css"
import AddCourse from './AddCourse';
import { BsCheck, BsX } from "react-icons/bs";
import { Card, CardImg, CardText, CardBody, CardTitle, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class Course extends React.Component {
    state = {
        course: {},
        instructors: [],
        modalIsOpenEdit: false,
        modalIsOpenDelete: false
    };

    encodeQueryData(param, data) {
        const ret = [];
        for (let d in data)
            ret.push(encodeURIComponent(param) + '=' + encodeURIComponent(data[d]));
        return ret.join('&');
    }

    toggleModalEdit() {
        this.setState({
            modalIsOpenEdit: !this.state.modalIsOpenEdit
        });
        if (this.state.modalIsOpenEdit) {
            console.log('modal is closing');
            this.getCourseData(this.state.course.id);
        }
    }

    toggleModalDelete() {
        this.setState({
            modalIsOpenDelete: !this.state.modalIsOpenDelete
        });
    }

    closeModalDelete() {
        this.setState({
            modalisOpenDelete: false
        })
    }

    getCourseData(courseId) {
        console.log('Get course data')
        
        axios.get(`http://localhost:3001/courses/${courseId}`)
            .then(res => {
                console.log(res.data);
                this.setState({ course: res.data });
                return res.data
            })
            .then(course => {
                const queryParams = this.encodeQueryData('id', course.instructors)
                if (queryParams) {
                    axios.get(`http://localhost:3001/instructors?${queryParams}`)
                        .then(res => {
                            console.log(res.data);
                            this.setState({ instructors: res.data });
                        })
                } else {
                    this.setState({ instructors: [] });
                }
            });
    }

    // Server runs on port 3001
    //Get Course id and the data for their instructors
    componentDidMount() {
        const { match: { params } } = this.props;
        this.getCourseData(params.id);
    }

    deleteCourse(e) {
        const { match: { params } } = this.props;
        e.preventDefault();
        axios.delete(`http://localhost:3001/courses/${params.id}`)
            .then(() => {
                return axios.get(`http://localhost:3001/courses`)
            })
            .then(res => {
                console.log(res.data)
                this.setState({});
            })
            .then(res => {
                this.props.history.push('/courses');
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
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
                    <CardTitle className="text-center"><h1>{this.state.course.title}</h1></CardTitle>
                    <CardBody>
                        <CardImg className="imgs1" src={this.state.course.imagePath} alt="Card image cap" />
                        <CardText>
                            <span style={{ fontWeight: "bold" }}>Price: {this.state.course.price?.normal}‎€</span>
                            <br /> 
                            <span style={{ fontWeight: "bold" }}> Bookable: {this.state.course.open ? <BsCheck /> : <BsX />}</span>
                            <br /> 
                            <span style={{ fontWeight: "bold" }}> Duration: {this.state.course.duration}</span>
                            <br /> 
                            <span style={{ fontWeight: "bold" }}> Dates: {convertDate(this.state.course.dates?.start_date)} - {convertDate(this.state.course.dates?.end_date)} </span>
                            <br /> 
                            <span style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: this.state.course.description }}></span>
                            <br/>
                            <Button color="primary" onClick={this.toggleModalEdit.bind(this)}>Edit</Button>

                            <Modal isOpen={this.state.modalIsOpenEdit} >
                                <ModalHeader toggle={this.toggleModalEdit.bind(this)}>Edit Course</ModalHeader>
                                <ModalBody><AddCourse isEditMode={true} newCourse={this.state.course} /></ModalBody>
                            </Modal>

                            <Button color="danger" className="ml-3" onClick={this.toggleModalDelete.bind(this)}>Delete</Button>
                            <br />
                            <Modal isOpen={this.state.modalIsOpenDelete}>
                                <ModalHeader toggle={this.toggleModalDelete.bind(this)}>Delete Course</ModalHeader>
                                <ModalBody>
                                    <h2>Are sure you want to delete this {this.state.course.title} course?</h2>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.deleteCourse.bind(this)}>Delete</Button>{' '}
                                    <Button color="secondary" onClick={this.closeModalDelete.bind(this)} >Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </CardText>
                        <CardTitle tag="h3">Instructors</CardTitle>
                        {this.state.instructors.map(({ id, name, email, dob, bio, linkedin }) => (
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
}