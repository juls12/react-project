import React from 'react';
import './index.css';
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link to="/courses">
                    <li>Courses</li>
                </Link>
                <Link to="/addcourse">
                    <li>AddCourse</li>
                </Link>
            </ul>
        </nav>
    )
}

export default Nav;