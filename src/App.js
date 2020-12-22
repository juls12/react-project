import React from 'react';
import './css/index.css';
import MyNav from './Components/MyNav';
import Courses from './Components/Courses';
import Course from './Components/Course'
import AddCourse from './Components/AddCourse';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Banner from "./Components/Banner";
import Stats from './Components/Stats';
import TableStats from './Components/TableStats';
import AddInstructor from './Components/AddInstructor';

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
     <Route path="/addinstructor" component={AddInstructor} />
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
