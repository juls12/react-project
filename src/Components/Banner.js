import React from 'react';
import { Jumbotron, Container } from 'reactstrap';


const Banner = (props) => {
  return (
    <div>
      <Container fluid>
        <Jumbotron className="jumbo-style">
       
          <h1 className="text-focus-in">Welcome to Code.Hub Dashboard!</h1>
          <p className="text-focus-in lead" >Manage everything and have fun!</p>
        </Jumbotron>
      </Container>
    </div>
  );
};
export default Banner;