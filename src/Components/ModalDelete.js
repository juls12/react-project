import React from "react";
import  { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Container} from 'reactstrap';


const ModalDelete = (props) => {
    const {
        buttonLabel,
        className
    }= props;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    return (
        <Container fluid>


<div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Course</ModalHeader>
        <ModalBody>
            <h2>Are sure you want to delete this "React" course?</h2>   
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={toggle}>Delete</Button>{' '}
            <Button color="secondary" onClick={() => setModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>

           
        </Container>


    );

}

export default ModalDelete;