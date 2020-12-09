import React from 'react';
// import {Params} from 'react-router-dom';
import axios from 'axios';
import { Container } from 'reactstrap';

export default class Course extends React.Component {
    state = {
        course: []

    };

    // Server runs on port 3001

    componentDidMount() {
        const { match: { params } } = this.props;
        console.log(params);
        axios.get(`http://localhost:3001/courses/${params.id}`)
            .then(res => {
                console.log(res.data);
                this.setState({ course: res.data });
            });
    }

    render() {
        return (
            <Container fluid>
                <h1>course page</h1>
            </Container>
        );
    }
}