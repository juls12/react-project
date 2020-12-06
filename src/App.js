import React from 'react';
import './index.css';
import Nav from './Nav';
import Courses from './Courses';
import AddCourse from './AddCourse';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



function App() {
  return (
    <Router>
    <div className="App">
     <Nav />
     <Route path="/courses" component={Courses} />
    </div>
    </Router>
  );
}

export default App;
