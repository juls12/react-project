import React from "react";
import '../css/index.css';
import { Col, Button, Form, FormGroup, Label, Input, Container, FormFeedback } from 'reactstrap';
import { Component } from "react";
import axios from 'axios';


class AddInstructor extends Component {
    state = {
        isEditMode: false,
        newInstructor: {
            gender: '',
            name: {
                first: '',
                last: '',
            },
            email: '',
            dob: '',
            bio: '',
            hobbies: '',
            linkedin: ''
        },
        fieldErrors: {
            gender: false,
            first: false,
            last: false,
            email: false,
            dob: false,
            bio: false,
            hobbies: false,
            linkedin: false
        }
    };

    componentDidMount() {
        const isEditMode = this.props.isEditMode ? true : false
    
        this.setState({ isEditMode })
    
        if (isEditMode) {
          this.setState({ newInstructor: this.props.newInstructor });
        }
      }

    onInputChange = ({target}) => {
        const { id, value } = target;
        console.log(id, value);

        let newInstructor = this.state.newInstructor;

        let fieldErrors = this.state.fieldErrors;
        fieldErrors[id] = false;
        this.setState({ fieldErrors })

        if (id === 'first' || id === 'last') {
            newInstructor.name[id] = value;
            this.setState({ newInstructor });
        }  else {
        newInstructor[id] = value;
        this.setState({newInstructor});
    }
    };

     

    submitForm = function () {
        const errorsExist = this.validateInputs();
        if (!errorsExist) {
            const newInstructor = this.state.newInstructor;
           

            if (this.state.isEditMode) {
                axios.put(`http://localhost:3001/instructors/` + this.state.newInstructor.id, newInstructor)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            } else {
                axios.post(`http://localhost:3001/instructors`, newInstructor)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(res => {
                    this.props.history.push('/addcourse');
                })
                .catch((err) => {
                    console.log(err);
                })
            }
        }
    }

    validateInputs = function () {

        let errorExists = false;
        let { fieldErrors } = this.state;

        
        if(!this.state.newInstructor.gender) {
            fieldErrors.gender = true;
            errorExists = true;
        }
        if(!this.state.newInstructor.name.first) {
            fieldErrors.first = true;
            errorExists = true;
        }
        if(!this.state.newInstructor.name.last) {
            fieldErrors.last = true;
            errorExists = true;
        }
        if(!this.state.newInstructor.email) {
            fieldErrors.email = true;
            errorExists = true;
        }
        if(!this.state.newInstructor.dob) {
            fieldErrors.dob = true;
            errorExists = true;
        }
        if(!this.state.newInstructor.bio) {
            fieldErrors.bio = true;
            errorExists = true;
        }
        if(!this.state.newInstructor.linkedin) {
            fieldErrors.linkedin = true;
            errorExists = true;
        }

        this.setState({fieldErrors});

        return errorExists;


    }

    render() {
        const newInstructor = this.state.newInstructor;
        return (
            <Container fluid>
                { !this.state.isEditMode &&
                  <h3 style={{ marginBottom: '20px', marginTop: '20px' }}>Add New Instructor</h3>
                }
                <Form>

                    {
                        [
                            {heading: null, label: 'Gender', field: 'gender', state: newInstructor.gender, type: 'text', placeholder: 'Enter Gender' , errorText: 'Gender is required', validationField: this.state.fieldErrors.gender},
                            {heading: 'Name', label: 'First', field: 'first', state: newInstructor.name.first, type: 'text', placeholder: 'Enter First Name' , errorText: 'First Name is required', validationField: this.state.fieldErrors.first},
                            {heading: null, label: 'Last', field: 'last', state: newInstructor.name.last, type: 'text', placeholder: 'Enter Last Name' , errorText: 'Last Name is required', validationField: this.state.fieldErrors.last},
                            {heading: null, label: 'Email', field: 'email', state: newInstructor.email, type: 'text', placeholder: 'Enter Email' , errorText: 'Email is required', validationField: this.state.fieldErrors.email},
                            {heading: null, label: 'Date of Birth', field: 'dob', state: newInstructor.dob, type: 'date', placeholder: 'dd-mm-yyyy' , errorText: 'Date of Birth is required', validationField: this.state.fieldErrors.dob},
                            {heading: null, label: 'Biography', field: 'bio', state: newInstructor.bio, type: 'text', placeholder: 'Enter Biography' , errorText: 'Biography is required', validationField: this.state.fieldErrors.bio},
                            {heading: null, label: 'Hobbies', field: 'hobbies', state: newInstructor.hobbies, type: 'text', placeholder: 'Enter Hobbies' , errorText: 'Hobbies is required', validationField: this.state.fieldErrors.hobbies},
                            {heading: null, label: 'LinkedIn', field: 'linkedin', state: newInstructor.linkedin, type: 'text', placeholder: 'Enter LinkedIn' , errorText: 'LinkedIn is required', validationField: this.state.fieldErrors.linkedin},

                        ].map(({ heading, label, field, state, type, placeholder, errorText, validationField}) => (
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
                            <Button color="primary" onClick={() => this.submitForm()}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>

            </Container>

        );
    }

}
export default AddInstructor;