import React from "react";
import '../css/index.css';
import { Col, Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { Component } from "react";
import axios from 'axios';

class AddCourse extends Component {
  state = {
    instructors: [],
    newCourse: {
      title: '',
      duration: '',
      imagePath: '',
      open: false,
      instructors: [],
      description: '',
      dates: {
        start_date: '',
        end_date: ''
      },
      price: {
        normal: null,
        early_bird: null
      }
    }
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/instructors/`)
      .then(res => {
        console.log(res.data);
        this.setState({ instructors: res.data });
      })
  }

  onInputChange = ({ target }) => {
    const { id, value, checked } = target;
    let { newCourse } = this.state;

    if (id === 'start_date' || id === 'end_date') {
      newCourse.dates[id] = value;
      this.setState({ newCourse });

    } else if (id === 'normal' || id === 'early_bird') {
      newCourse.price[id] = value;
      this.setState({ newCourse });

    } else if (id === 'open') {
      // console.log(id, checked);

      newCourse[id] = checked;
      this.setState({ newCourse });

    } else if (id === 'instructor') {
      const instructorId = target.name;
      // console.log(id, checked, instructorId);

      // Checking if instuctor id is already in the array
      const index = this.state.newCourse.instructors.indexOf(instructorId);
      if (checked === false && index > -1) {
        this.state.newCourse.instructors.splice(index); // Removing instructor id from array 
      } else {
        this.state.newCourse.instructors.push(instructorId); // Adding instructor id to array
      }

      // console.log( this.state.newCourse.instructors)

    } else {
      // console.log(id, value);
      newCourse[id] = value;
      this.setState({ newCourse });
    }
  };

  sumbitForm = function () {
    axios.post(`http://localhost:3001/courses`, this.state.newCourse)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  render() {
    const newCourse = this.state.newCourse;
    return (
      <Container fluid>
        <h3 style={{ marginBottom: '20px', marginTop: '20px' }}>Add a New Course</h3>
        <Form>
          {
            [
              { label: 'Title', field: 'title', state: newCourse.title, type: 'text', placeholder: 'Enter Title' },
              { label: 'Duration', field: 'duration', state: newCourse.duration, type: 'text', placeholder: 'Enter Duration' },
              { label: 'Image Path', field: 'imagePath', state: newCourse.imagePath, type: 'text', placeholder: '/imagepath.jpg' },

            ].map(({ label, field, state, type, placeholder }) => (
              <FormGroup row key={field}>
                <Label for={field} sm={2}>{label}</Label>
                <Col sm={10}>
                  <Input type={type} id={field} value={state} placeholder={placeholder} onChange={this.onInputChange} />
                </Col>
              </FormGroup>
            ))
          }

          <FormGroup check>
            <Input type="checkbox" id="open" onChange={this.onInputChange} />
            <Label for="open" check>Bookable</Label>
          </FormGroup>

          <br></br>


          <h5 style={{ marginBottom: '20px', marginTop: '20px' }}>Instructors</h5>
          <FormGroup check>
            {
              this.state.instructors.map(instructor => (
                <Col key={instructor.id}>
                  <Input type="checkbox" name={instructor.id} id="instructor" onChange={this.onInputChange}/>
                  <Label check>{instructor.name.first} {instructor.name.last}</Label>
                </Col>
              ))
            }
          </FormGroup>

          <br></br>
          {
            [
              { heading: null, label: 'Course Discription', field: 'description', state: newCourse.description, type: 'textarea', placeholder: 'Enter Discription' },
              { heading: 'Dates', label: 'Start Date', field: 'start_date', state: newCourse.dates.start_date, type: 'text', placeholder: 'dd-mm-yyyy' },
              { heading: null, label: 'End Date', field: 'end_date', state: newCourse.dates.end_date, type: 'text', placeholder: 'dd-mm-yyyy' },
              { heading: 'Price', label: 'Early Bird', field: 'early_bird', state: newCourse.early_bird, type: 'number', placeholder: '0' },
              { heading: null, label: 'Normal', field: 'normal', state: newCourse.normal, type: 'number', placeholder: 'Enter Normal price' }

            ].map(({ heading, label, field, state, type, placeholder }) => (
              <React.Fragment key={field}>
                <h5>{heading}</h5>
                <FormGroup row >
                  <Label for={field} sm={2}>{label}</Label>
                  <Col sm={10}>
                    <Input type={type} id={field} value={state} placeholder={placeholder} onChange={this.onInputChange} />
                  </Col>
                </FormGroup>
              </React.Fragment>
            ))
          }
          <FormGroup row style={{ textAlign: "right" }}>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button color="primary" onClick={() => this.sumbitForm()}>Submit</Button>
            </Col>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

export default AddCourse;