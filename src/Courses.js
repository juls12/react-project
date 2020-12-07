import React from 'react';
import ReactDOM from "react-dom";
import "./Box.css"
import { Card } from "react-bootstrap";
import { Button } from 'reactstrap';
import { Badge } from 'reactstrap';

// import {
//   Card, CardText, CardBody, CardLink,
//   CardTitle, CardSubtitle
// } from 'reactstrap';


    



const Courses = (props) => {
  const cardInfo = [
    {image: "scrum.png", title: "ghh", price:"hghghhjhhgjhjhg", bookable:"yes", duration:"2 days", dates:"27/9/2020 - 29/9/2020"},
    {image: "react.png", title: "gtt", price:"jtyytyytyt", bookable:"yes", duration:"2 days", dates:"27/9/2020 - 29/9/2020"},
    {image: "angular.png", title: "fgh", price:"nbbbnnbnbnbnb", bookable:"yes", duration:"2 days", dates:"27/9/2020 - 29/9/2020"},
    {image: "ui-ux.png", title: "fde", price:"gfgfthtthgfgf", bookable:"yes", duration:"2 days", dates:"27/9/2020 - 29/9/2020"},
    {image: "scrum.png", title: "ghh", price:"hghghhjhhgjhjhg", bookable:"yes", duration:"2 days", dates:"27/9/2020 - 29/9/2020"},
    
  ];

  const renderCard = (card, index) => {
    
   
    return (
     
      
      <Card style={{ width: '18rem' }} key={index} className="box">
        <Card.Title>{card.title}</Card.Title>
      <Card.Img variant="top" src="holder.js/100px180" src={card.image} />
      <Card.Body>
        
        <Card.Text>
          <div style={{fontWeight: "bold"}}>Price:  {card.price} </div>
          <div style={{fontWeight: "bold"}}>Bookable: {card.bookable} </div>
          <div style={{fontWeight: "bold"}}>Duration: {card.duration} </div>
          <div style={{fontWeight: "bold"}}>Dates: {card.dates} </div>
        </Card.Text>
        <Button style={{float: 'right'}} color="primary" variant="primary">View</Button>
      </Card.Body>
    </Card>
    

    )
  }
  return <div className="grid"> {
    
    cardInfo.map(renderCard)
  }</div>
};

export default Courses;