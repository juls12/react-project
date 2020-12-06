import React from 'react';
import './index.css';
import MyNav from './MyNav';
import Courses from './Courses';
import AddCourse from './AddCourse';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Banner from "./Banner";

function App() {
  return (
    <Router>
    <div className="App">
     <MyNav />
     <Switch>
     <Route path="/" exact component={Home}/>
     <Route path="/courses" component={Courses} />
     <Route path="/addcourse" component={AddCourse} />
     </Switch>
    </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <Banner />
  </div>
);

export default App;
