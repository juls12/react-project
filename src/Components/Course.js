import React from 'react';
import axios from 'axios';
import { Container } from 'reactstrap';
import "../css/courses.css"
import { BsCheck, BsX } from "react-icons/bs";
import { Card, CardImg, CardText, CardBody,CardTitle, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class Course extends React.Component {
    state = {
        course: {},
        instructors: [],
        modalisOpen: false
    };
    toggleModalEdit() {
        this.setState({
            modalisOpen: !this.state.modalisOpen
        });
    }
    toggleModalDelete() {
        this.setState({
            modalisOpen: !this.state.modalisOpen
        });
    }
    closeModal() {
        this.setState({
            modalisOpen: false
        })
    }
    // Server runs on port 3001
    //Get Course id and the data for their instructors
    componentDidMount() {
        const { match: { params } } = this.props;
        axios.get(`http://localhost:3001/courses/${params.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ course: res.data });
            })
            .then(() => {
                axios.get(`http://localhost:3001/courses/${params.id}/instructors/`)
                    .then(res => {
                        console.log(res.data);
                        this.setState({ instructors: res.data });
                    })
            });
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
                    <CardTitle><h1>{this.state.course.title}</h1></CardTitle>
                    <CardBody>
                        <CardImg src={this.state.course.imagePath} alt="Card image cap"/>
                        <CardText>
                            <span style={{ fontWeight: "bold" }}>Price: {this.state.course.price?.normal}‎€</span>
                            <br /> <br/> 
                            <span style={{ fontWeight: "bold" }}> Bookable: {this.state.course.open ? <BsCheck /> : <BsX />}</span>
                            <br/> <br/> 
                            <span style={{ fontWeight: "bold" }}> Duration: {this.state.course.duration}</span>
                            <br/> <br/> 
                            <span style={{ fontWeight: "bold" }}> Dates: {convertDate(this.state.course.dates?.start_date)} - {convertDate(this.state.course.dates?.end_date)} </span>
                            <br/> <br/> 
                            <span style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: this.state.course.description }}></span>
                            <Button color="primary" onClick={this.toggleModalEdit.bind(this)}>Edit</Button>
                            <button className="btn btn-danger m-1" onClick={this.toggleModalDelete.bind(this)}> Delete</button>
                            <br />
                            <Modal isOpen={this.state.modalisOpen}>
                                <ModalHeader toggle={this.toggleModalDelete.bind(this)}>Delete Course</ModalHeader>
                                <ModalBody>
                                    <h2>Are sure you want to delete this {this.state.course.title} course?</h2>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.deleteCourse.bind(this)}>Delete</Button>{' '}
                                    <Button color="secondary" onClick={this.closeModal.bind(this)} >Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </CardText>
                        <CardTitle tag="h3">Instructors</CardTitle>
                        {this.state.instructors.map(({ id, gender, name, email, dob, bio, linkedin, hobbies }) => (
                            <CardText key={id}>
                                <span style={{ fontWeight: "bold" }}> {name.first} {name.last} ({dob}) </span>
                               <br/>
                                <span style={{ fontWeight: "bold" }}> <a href={email}>{email}</a> | <a href={linkedin}>Linkedin</a></span>
                                <br/>
                                <span style={{ fontWeight: "bold" }}> {bio} </span>
                            </CardText>
                        ))}
                    </CardBody>
                </Card>
            </Container>
        );
    }
}