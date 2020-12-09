import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Courses from "./Courses.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';




const App = () => {
    
    return (
        
        <div> <Courses/> </div>
       
    );
};






ReactDOM.render(<App />, document.getElementById("root"));
    
