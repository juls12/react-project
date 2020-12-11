import React from "react";
import '../css/index.css';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Container } from 'reactstrap';

const AddCourse = (props) => {
  return (
    <Container fluid>
      <h3 style={{ marginBottom: '20px', marginTop: '20px' }}>Add a New Course</h3>
      <Form>
        <FormGroup row>
          <Label sm={2}>Title</Label>
          <Col sm={10}>
            <Input placeholder="Enter Title" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Duration</Label>
          <Col sm={10}>
            <Input placeholder="Enter Duration" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Image Path</Label>
          <Col sm={10}>
            <Input placeholder="Enter Image Path" />
          </Col>
        </FormGroup>
        <FormGroup check>
          <Input type="checkbox" name="check" id="exampleCheck" />
          <Label for="exampleCheck" check>Bookable</Label>
        </FormGroup>
        <br></br>
        <h5 style={{ marginBottom: '20px', marginTop: '20px' }}>Instructors</h5>
        <FormGroup check>
          <Col>
            <Input type="checkbox" name="check" id="exampleCheck" />
            <Label for="exampleCheck" check>John Tsevdos</Label>
          </Col>
          <Col>
            <Input type="checkbox" name="check" id="exampleCheck" />
            <Label for="exampleCheck" check>Yannis Nikolakopoulos</Label>
          </Col>
        </FormGroup>
        <br></br>
        <FormGroup row>
          <Label for="exampleText" sm={2}>Course Discription</Label>
          <Col sm={10}>
            <Input type="textarea" name="text" id="exampleText" />
          </Col>
        </FormGroup>
        <h5>Dates</h5>
        <FormGroup row>
          <Label sm={2}>Start Date</Label>
          <Col sm={10}>
            <Input placeholder="Enter Date" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>End Date</Label>
          <Col sm={10}>
            <Input placeholder="Enter Date" />
          </Col>
        </FormGroup>
        <h5>Price</h5>
        <FormGroup row>
          <Label sm={2}>Early Bird</Label>
          <Col sm={10}>
            <Input placeholder="Enter Price" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label sm={2}>Normal Price</Label>
          <Col sm={10}>
            <Input placeholder="Enter Price" />
          </Col>
        </FormGroup>
        <FormGroup row style={{ textAlign: "right" }}>
        <Col sm={{ size: 10, offset: 2 }}>
          <Button color="primary">Submit</Button>
        </Col>
      </FormGroup>
      </Form>
    </Container>
  );
}

export default AddCourse;