import React, { Component } from 'react';
import './Navbar.css';
import socketIOClient from 'socket.io-client';
import Navbar from './Navbar';
let socket;

class Notifications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            length: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        console.log(e);
        var notifications = [e, ...this.state.notifications];
        this.setState({ notifications: notifications.slice(0, 20), length: this.state.length + 1 });
    }
    componentDidMount() {
        socket = socketIOClient("http://localhost:4000");
        socket.on('newNotification', (data) => {
            this.handleChange(data);
        })
    }
    componentWillUnmount() {
        socket.disconnect();
    }
    render() {
        return (<div style={{ textAlign: "center" }}>
            <Navbar />
            <h1> Notifications:</h1>
            <table className="table table-striped" style={{ width: "50%", textAlign: "center", border: "3px solid navy", margin: "auto" }}>
                <thead style={{ background: "#6a98c7" }}>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Detected Event</th>
                        <th scope="col">Type of Damage</th>
                        <th scope="col">Type of tornado</th>
                        <th scope="col">Injuries</th>
                        <th scope="col">Fatalities</th>
                        <th scope="col">Loss(million)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.notifications.map((x, i) =>
                        <tr key={i} style={{ animation: "drop 500ms" }}>
                            <th scope="row">{i + 1}</th>
                            <td>{x.command}</td>
                            <td>{x.payload.damageType}</td>
                            <td>{x.payload.mag}</td>
                            <td>{x.payload.inj}</td>
                            <td>{x.payload.fat}</td>
                            <td>{x.payload.loss}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>)
    }
}
export default Notifications;
