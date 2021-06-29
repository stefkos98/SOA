import React, { Component } from 'react';
import Navbar from './Navbar.js';

class Offset extends Component {
    static defaultProps = {
        action: "http://localhost:4000/api/postMetaDataCommand",
        method: "POST"
    }
    constructor(props) {
        super(props);
        this.state = {
            interval: 1,
            method: "POST",
            action: "postMetaDataCommand",
            data: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);

    }
    handleChange(e) {
        if (e.target.name == "method") {
            if (e.target.value = "PUT") {
                this.setState({ action: "putMetaDataCommand" });
            }
            else if (e.target.value == "POST") {
                this.setState({ action: "postMetaDataCommand" });
            }
        }
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = { interval: this.state.interval * 1000 };
        fetch("http://localhost:4000/api/" + this.state.action, {
            method: this.state.method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        )
            .then(
                (result) => {
                    this.props.history.push("/");
                })
    }
    handleSubmit2(e) {
        e.preventDefault();
        fetch("http://localhost:4000/api/getMetaDataCommand", {
            method: 'GET'
        }
        ).then(res => res.json())
            .then(
                (result) => {
                    this.setState({ data: result })
                })
    }
    render() {
        return (
            <div>
                <Navbar />
                <div style={{ margin: "auto", width: "50%", textAlign: "center" }}>
                    <h1> Set new Offset for Sensor(in seconds):</h1>
                    <form onSubmit={this.handleSubmit} >
                        <div className='form-group'>
                            <input type='number' min="1" className='form-control' name='interval' value={this.state.interval} onChange={this.handleChange} />
                        </div>
                        <label>Select request type:</label>
                        <select className="form-select" name="method" value={this.state.method} onChange={this.handleChange}>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                        </select>
                        <div className='form-group'> <button className='btn btn-lg btn-info btn-block form-control' type='submit' style={{ marginTop: "5%" }} onClick={this.onSubmit}>Change Offset</button>  </div>
                    </form>
                    {this.state.data != '' ?
                        <div style={{marginTop:"3%"}}><h3>Current Meta Data:</h3><h6>Id: {this.state.data.meta.id}</h6>   
                                             <h6>Type of sensor: {this.state.data.meta.type}</h6>

                        <h6>Interval of Sampling: {this.state.data.meta.interval/1000} s</h6>
                        </div>:
                        <form onSubmit={this.handleSubmit2} style={{marginTop:"1%"}}>
                            <button onClick={this.onSubmit}  className='btn btn-lg btn-success btn-block form-control'>Get Meta Data</button>
                        </form>
                    }
                </div>
            </div>
        )
    }
}
export default Offset;