import React from 'react';
import { Jumbotron } from 'reactstrap';

const Banner = (props) => {
  return (
    <div>
      <Jumbotron className="jumbo-style">
        <h1 className="display-8">Welcome to Code.Hub Dashboard!</h1>
        <p className="lead">Manage everything and have fun!</p>
      </Jumbotron>
    </div>
  );
};

export default Banner;