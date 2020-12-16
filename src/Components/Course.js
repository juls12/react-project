import React from 'react';
// import {Params} from 'react-router-dom';
import axios from 'axios';
import { Container, Button } from 'reactstrap';
import "../css/courses.css"
import { BsCheck, BsX } from "react-icons/bs";
import  { ModalDelete } from './ModalDelete.js';
//import  { useState } from 'react';
import { Card } from "react-bootstrap";







export default class Course extends React.Component {
    state = {
        course: {},
        instructors: []
        
    };
    
    


    // Server runs on port 3001
    //Get Course id and the data for their instructors
    componentDidMount() {
        
        const { match: { params } } = this.props;
        axios.get(`http://localhost:3001/courses/${params.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ course: res.data });
            })
            .then( () => {
                axios.get(`http://localhost:3001/courses/${params.id}/instructors/`)
                    .then(res => {
                        console.log(res.data);
                        this.setState({ instructors: res.data });
                    })
            });
           

           
    }

    render() {

        const convertDate = function (dateString) {
            return dateString.split("-").reverse().join("-");
        }
       
        
        //const{setShow} = this.state;
        //const closeModalHandler = () => setShow(false);

        
        
        return (
            <Container fluid>
                
                
             <h1>{this.state.course.title}</h1>
             <img className="imgs" src={this.state.course.imagePath} />
             <p style={{ fontWeight: "bold" }} >Price: {this.state.course.price?this.state.course.price.normal:""} <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> Duration: {this.state.course.duration} </p>
             <p style={{ fontWeight: "bold" }}> Bookable: {this.state.course.open ? <BsCheck /> :  <BsX /> }</p>

             <p style={{ fontWeight: "bold" }}> Duration: {this.state.course.duration}</p>
             <p style={{ fontWeight: "bold" }}> Dates: {convertDate(this.state.course.dates?this.state.course.dates.start_date:"")} - {convertDate(this.state.course.dates?this.state.course.dates.end_date:"")} </p>
             <div style={{ fontWeight: "bold" }} dangerouslySetInnerHTML={{ __html: this.state.course.description }}></div>
             
            
             <button className="btn btn-primary m-1" > Edit</button>
             <button className="btn btn-danger m-1"> Delete</button>
            
            
             
             <h1>Instructors</h1>
             {this.state.instructors.map(({id, gender, name, email, dob, bio, linkedin, hobbies }) => (
                 <Card key={id}>
                 <Card.Title></Card.Title>
                 <Card.Body>
                     <Card.Text>
                         <span style={{ fontWeight: "bold" }}> {name.first} {name.last} ({dob})</span> 
                         <span style={{ fontWeight: "bold" }}>  <a href="#">{email}</a> | <a href="https://www.linkedin.com/sample"> LinkedIn</a> </span>
                         <span style={{ fontWeight: "bold" }}> {bio}</span>
                     </Card.Text>
                 </Card.Body>
             </Card>
                 
             ))}
            </Container>
            
        );
    }
}
