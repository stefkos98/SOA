import React, { Component } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const s = { color: "#0DCAF0" };
<NavLink exact activeStyle={s} to="/"></NavLink>
class Navbar extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" exact activeStyle={s} to="/">WebDasboard</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact activeStyle={s} to="/getData">Get Data</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact activeStyle={s} to="/notifications">Notifications</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact activeStyle={s} to="/setOffset">Set Offset</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}
export default Navbar;