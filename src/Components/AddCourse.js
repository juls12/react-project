import React, { useEffect, useState } from 'react';
import '../css/index.css';
import { Col, Button, Form, FormGroup, Label, Input, Container, FormFeedback } from 'reactstrap';
import axios from 'axios';

const AddCourse = (props) => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [newCourse, setNewCourse] = useState(
    {
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
    }
  );

  const [fieldErrors, setFieldErrors] = useState(
    {
      title: false,
      duration: false,
      imagePath: false,
      description: false,
      start_date: false,
      end_date: false,
      early_bird: false,
      normal: false
    }
  );

  useEffect(() => {
    const isEditMode = props.isEditMode ? true : false

    setIsEditMode(isEditMode);

    if (isEditMode) {
      setNewCourse(props.newCourse);
    }

    axios.get(`http://localhost:3001/instructors/`)
      .then(res => {
        console.log(res.data);
        setInstructors(res.data)
      })
  }, [props.isEditMode, props.newCourse]);

  const onInputChange = ({ target }) => {
    const { id, value, checked } = target;
    console.log(id, value);

    let course = newCourse;

    // Reset errors on input change
    let errors = fieldErrors;
    errors[id] = false;
    setFieldErrors({ ...errors });

    if (id === 'start_date' || id === 'end_date') {
      course.dates[id] = value;
      setNewCourse({ ...course });

    } else if (id === 'normal' || id === 'early_bird') {
      course.price[id] = value;
      setNewCourse({ ...course });

    } else if (id === 'open') {
      console.log(checked);

      course[id] = checked;
      setNewCourse({ ...course });

    } else if (id === 'instructor') {
      const instructorId = target.name;
      console.log("instructorId: ", instructorId);

      // Checking if instuctor id is already in the array
      const index = newCourse.instructors.indexOf(instructorId);
      if (checked && index === -1) {
        // course.instructors.push(instructorId); // Adding instructor id to array
        course.instructors.push(instructorId);
      } else {
        course.instructors.splice(index); // Removing instructor id from array 
      }

      setNewCourse({ ...course });

    } else {
      course[id] = value;
      setNewCourse({ ...course })
    }
  };

  const sumbitForm = function () {
    console.log('submitForm');

    const errorsExist = validateInputs();

    if (!errorsExist) {

      newCourse.price.normal = parseInt(newCourse.price.normal);
      newCourse.price.early_bird = parseInt(newCourse.price.early_bird);

      if (isEditMode) {
        axios.put(`http://localhost:3001/courses/` + newCourse.id, newCourse)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios.post(`http://localhost:3001/courses`, newCourse)
          .then(function (response) {
            console.log(response);
          })
          .then(res => {
            props.history.push('/courses');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

  }

  const validateInputs = function () {

    let errorExists = false;

    if (!newCourse.title) {
      fieldErrors.title = true;
      errorExists = true;
    }

    if (!newCourse.duration) {
      fieldErrors.duration = true;
      errorExists = true;
    }

    if (!newCourse.imagePath) {
      fieldErrors.imagePath = true;
      errorExists = true;
    }

    if (!newCourse.description) {
      fieldErrors.description = true;
      errorExists = true;
    }

    if (!newCourse.dates.start_date) {
      fieldErrors.start_date = true;
      errorExists = true;
    }

    if (!newCourse.dates.end_date) {
      fieldErrors.end_date = true;
      errorExists = true;
    }

    if (!newCourse.price.early_bird) {
      fieldErrors.early_bird = true;
      errorExists = true;
    }

    if (!newCourse.price.normal) {
      fieldErrors.normal = true;
      errorExists = true;
    }

    setFieldErrors({ ...fieldErrors });

    return errorExists;
  }

  // render() {
  // const newCourse = this.state.newCourse;
  return (
    <Container fluid>
      { !isEditMode &&
        <h3 className="text-center text-focus-in" style={{ marginBottom: '20px', marginTop: '20px' }}>Add a New Course</h3>
      }
      <Form>
        {
          [
            { label: 'Title', field: 'title', state: newCourse.title, type: 'text', placeholder: 'Enter Title', errorText: 'Title is required', validationField: fieldErrors.title },
            { label: 'Duration', field: 'duration', state: newCourse.duration, type: 'text', placeholder: 'Enter Duration', errorText: 'Duration is required', validationField: fieldErrors.duration },
            { label: 'Image Path', field: 'imagePath', state: newCourse.imagePath, type: 'text', placeholder: '/imagepath.jpg', errorText: 'ImagePath is required', validationField: fieldErrors.imagePath },

          ].map(({ label, field, state, type, placeholder, errorText, validationField }) => (
            <FormGroup row key={field}>
              <Label for={field} sm={2}>{label}</Label>
              <Col sm={10}>
                <Input type={type} id={field} value={state} placeholder={placeholder} onChange={onInputChange} invalid={validationField} />
                <FormFeedback> {errorText} </FormFeedback>
              </Col>
            </FormGroup>
          ))
        }

        <FormGroup check>
          <Input type="checkbox" id="open" checked={newCourse.open} onChange={onInputChange} />
          <Label for="open" check>Bookable</Label>
        </FormGroup>

        <br />


        <h5 style={{ marginBottom: '20px', marginTop: '20px' }}>Instructors</h5>
        <FormGroup check>
          {
            instructors.map(instructor => (
              <Col key={instructor.id}>
                <Input type="checkbox" name={instructor.id} checked={newCourse.instructors.indexOf(instructor.id) > -1} id="instructor" onChange={onInputChange} />
                <Label check>{instructor.name.first} {instructor.name.last}</Label>
              </Col>
            ))
          }
        </FormGroup>

        <br />
        {
          [
            { heading: null, label: 'Course Description', field: 'description', state: newCourse.description, type: 'textarea', placeholder: 'Enter Description', errorText: 'Description is required', validationField: fieldErrors.description },
            { heading: 'Dates', label: 'Start Date', field: 'start_date', state: newCourse.dates.start_date, type: 'date', placeholder: 'dd-mm-yyyy', errorText: 'Date is required', validationField: fieldErrors.start_date },
            { heading: null, label: 'End Date', field: 'end_date', state: newCourse.dates.end_date, type: 'date', placeholder: 'dd-mm-yyyy', errorText: 'Date is required', validationField: fieldErrors.end_date },
            { heading: 'Price', label: 'Early Bird', field: 'early_bird', state: newCourse.price.early_bird, type: 'number', placeholder: '0', errorText: 'Price is required', validationField: fieldErrors.early_bird },
            { heading: null, label: 'Normal', field: 'normal', state: newCourse.price.normal, type: 'number', placeholder: '0', errorText: 'Price is required', validationField: fieldErrors.normal }

          ].map(({ heading, label, field, state, type, placeholder, errorText, validationField }) => (
            <React.Fragment key={field}>
              <h5>{heading}</h5>
              <FormGroup row >
                <Label for={field} sm={2}>{label}</Label>
                <Col sm={10}>
                  <Input type={type} id={field} value={state} placeholder={placeholder} onChange={onInputChange} invalid={validationField} rows="5" />
                  <FormFeedback> {errorText} </FormFeedback>
                </Col>
              </FormGroup>
            </React.Fragment>
          ))
        }

        <FormGroup row style={{ textAlign: "right" }}>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button color="primary" onClick={() => sumbitForm()}>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
}
// }


export default AddCourse;