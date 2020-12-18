import React from "react";
import '../css/index.css';
import { Col, Button, Form, FormGroup, Label, Input, Container, FormFeedback } from 'reactstrap';
import { Component } from "react";
import axios from 'axios';

class AddCourse extends Component {

  state = {
    isEditMode: false,
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
        normal: '',
        early_bird: ''
      }
    },
    fieldErrors: {
      title: false,
      duration: false,
      imagePath: false,
      description: false,
      startDate: false,
      endDate: false,
      earlyBirdPrice: false,
      normalPrice: false
    }
  };

  componentDidMount() {
    const isEditMode = this.props.isEditMode ? true : false

    this.setState({ isEditMode })

    if (isEditMode) {
      this.setState({ newCourse: this.props.newCourse });
    }

    axios.get(`http://localhost:3001/instructors/`)
      .then(res => {
        console.log(res.data);
        this.setState({ instructors: res.data });
      })
  }

  onInputChange = ({ target }) => {
    const { id, value, checked } = target;
    let { newCourse } = this.state;

    console.log(id, value);

    // this.state.use.fieldErrors[id] = false;

    if (id === 'start_date' || id === 'end_date') {
      newCourse.dates[id] = value;
      this.setState({ newCourse });

    } else if (id === 'normal' || id === 'early_bird') {
      newCourse.price[id] = value;
      this.setState({ newCourse });

    } else if (id === 'open') {
      // console.log(checked);

      newCourse[id] = checked;
      this.setState({ newCourse });

    } else if (id === 'instructor') {
      const instructorId = target.name;
      // console.log(instructorId);

      // Checking if instuctor id is already in the array
      const index = this.state.newCourse.instructors.indexOf(instructorId);
      if (checked === false && index > -1) {
        this.state.newCourse.instructors.splice(index); // Removing instructor id from array 
      } else {
        this.state.newCourse.instructors.push(instructorId); // Adding instructor id to array
      }

      // console.log( this.state.newCourse.instructors)

    } else {

      newCourse[id] = value;
      this.setState({ newCourse });
    }
  };

  sumbitForm = function () {

    const errorsExist = this.validateInputs();

    if (!errorsExist) {

      axios.post(`http://localhost:3001/courses`, this.state.newCourse)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  }

  validateInputs = function () {

    let errorExists = false;

    let { fieldErrors } = this.state;

    if (!this.state.newCourse.title) {
      fieldErrors.title = true;
      errorExists = true;
    }

    if (!this.state.newCourse.duration) {
      fieldErrors.duration = true;
      errorExists = true;
    }

    if (!this.state.newCourse.imagePath) {
      fieldErrors.imagePath = true;
      errorExists = true;
    }

    if (!this.state.newCourse.description) {
      fieldErrors.description = true;
      errorExists = true;
    }

    if (!this.state.newCourse.dates.start_date) {
      fieldErrors.startDate = true;
      errorExists = true;
    }

    if (!this.state.newCourse.dates.end_date) {
      fieldErrors.endDate = true;
      errorExists = true;
    }

    if (!this.state.newCourse.price.early_bird) {
      fieldErrors.earlyBirdPrice = true;
      errorExists = true;
    }

    if (!this.state.newCourse.price.normal) {
      fieldErrors.normalPrice = true;
      errorExists = true;
    }

    this.setState({ fieldErrors });

    return errorExists;
  }

  render() {
    const newCourse = this.state.newCourse;
    return (
      <Container fluid>
        { !this.state.isEditMode &&
          <h3 style={{ marginBottom: '20px', marginTop: '20px' }}>Add a New Course</h3>
        }
        <Form>
          {
            [
              { label: 'Title', field: 'title', state: newCourse.title, type: 'text', placeholder: 'Enter Title', errorText: 'Title is required', validationField: this.state.fieldErrors.title },
              { label: 'Duration', field: 'duration', state: newCourse.duration, type: 'text', placeholder: 'Enter Duration', errorText: 'Duration is required', validationField: this.state.fieldErrors.duration },
              { label: 'Image Path', field: 'imagePath', state: newCourse.imagePath, type: 'text', placeholder: '/imagepath.jpg', errorText: 'ImagePath is required', validationField: this.state.fieldErrors.imagePath },

            ].map(({ label, field, state, type, placeholder, errorText, validationField }) => (
              <FormGroup row key={field}>
                <Label for={field} sm={2}>{label}</Label>
                <Col sm={10}>
                  <Input type={type} id={field} value={state} placeholder={placeholder} onChange={this.onInputChange} invalid={validationField} />
                  <FormFeedback> {errorText} </FormFeedback>
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
                  <Input type="checkbox" name={instructor.id} id="instructor" onChange={this.onInputChange} />
                  <Label check>{instructor.name.first} {instructor.name.last}</Label>
                </Col>
              ))
            }
          </FormGroup>

          <br></br>
          {
            [
              { heading: null, label: 'Course Description', field: 'description', state: newCourse.description, type: 'textarea', placeholder: 'Enter Description', errorText: 'Description is required', validationField: this.state.fieldErrors.description },
              { heading: 'Dates', label: 'Start Date', field: 'start_date', state: newCourse.dates.start_date, type: 'date', placeholder: 'dd-mm-yyyy', errorText: 'Date is required', validationField: this.state.fieldErrors.startDate },
              { heading: null, label: 'End Date', field: 'end_date', state: newCourse.dates.end_date, type: 'date', placeholder: 'dd-mm-yyyy', errorText: 'Date is required', validationField: this.state.fieldErrors.endDate },
              { heading: 'Price', label: 'Early Bird', field: 'early_bird', state: newCourse.price.early_bird, type: 'number', placeholder: '0', errorText: 'Price is required', validationField: this.state.fieldErrors.earlyBirdPrice },
              { heading: null, label: 'Normal', field: 'normal', state: newCourse.price.normal, type: 'number', placeholder: '0', errorText: 'Price is required', validationField: this.state.fieldErrors.normalPrice }

            ].map(({ heading, label, field, state, type, placeholder, errorText, validationField }) => (
              <React.Fragment key={field}>
                <h5>{heading}</h5>
                <FormGroup row >
                  <Label for={field} sm={2}>{label}</Label>
                  <Col sm={10}>
                    <Input type={type} id={field} value={state} placeholder={placeholder} onChange={this.onInputChange} invalid={validationField} rows="5" />
                    <FormFeedback> {errorText} </FormFeedback>
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