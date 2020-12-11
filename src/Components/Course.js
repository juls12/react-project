import React from 'react';
// import {Params} from 'react-router-dom';
import axios from 'axios';
import { Container } from 'reactstrap';

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
            .then(() => {
                axios.get(`http://localhost:3001/courses/${params.id}/instructors/`)
                    .then(res => {
                        console.log(res.data);
                        this.setState({ instructors: res.data });
                    })
            });
    }

    render() {
        return (
            <Container fluid>
                <h1>{this.state.course.title}</h1>
            </Container>
        );
    }
}