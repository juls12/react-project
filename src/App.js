import React from 'react';
import './index.css';
import MyNav from './MyNav';
import Courses from './Courses';
import AddCourse from './AddCourse';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';



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
    <h1>Home Page</h1>
  </div>
);

export default App;
