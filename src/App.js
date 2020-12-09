import React from 'react';
import './index.css';
import MyNav from './MyNav';
import Courses from './Courses';
import Course from './Course'
import AddCourse from './AddCourse';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Banner from "./Banner";
import Stats from './Stats';
import TableStats from './TableStats';

function App() {
  return (
    <Router>
    <div className="App">
     <MyNav />
     <Switch>
     <Route path="/" exact component={Home}/>
     <Route path="/courses" component={Courses} />
     <Route path="/course/:id" component={Course} />
     <Route path="/addcourse" component={AddCourse} />
     </Switch>
    </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <Banner />
    <Stats />
    <TableStats />
  </div>
);

export default App;
