import React, { Component } from 'react';
import Navbar from './Navbar.js';

class Results extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <h1> Results:</h1>
                <table className="table table-striped">
                    <thead style={{ background: "#6a98c7" }}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Year</th>
                            <th scope="col">Month</th>
                            <th scope="col">Day</th>
                            <th scope="col">Time</th>
                            <th scope="col">State</th>
                            <th scope="col">Type(0-5)</th>
                            <th scope="col">Injuries</th>
                            <th scope="col">Fatalities</th>
                            <th scope="col">Loss(million)</th>
                            <th scope="col">Start lat</th>
                            <th scope="col">End lat</th>
                            <th scope="col">Start long</th>
                            <th scope="col">End long</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props.location.state.params.map((x, i) =>
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{x.yr}</td>
                                <td>{x.mo}</td>
                                <td>{x.dy}</td>
                                <td>{x.time}</td>
                                <td>{x.st}</td>
                                <td>{x.mag}</td>
                                <td>{x.inj}</td>
                                <td>{x.fat}</td>
                                <td>{x.loss}</td>
                                <td>{x.slat != 0 ? x.slat : "/"}</td>
                                <td>{x.elat != 0 ? x.elat : "/"}</td>
                                <td>{x.slon != 0 ? x.slon : "/"}</td>
                                <td>{x.elon != 0 ? x.elon : "/"}</td>
                            </tr>
                        )}
                        {console.log(this.props.location.state.params)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Results;