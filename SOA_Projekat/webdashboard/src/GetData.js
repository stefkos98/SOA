import React, { Component } from 'react';
import Navbar from './Navbar';
//import InputForm from './InputForm';

class GetData extends Component {
  static defaultProps = {
    action: "http://localhost:4000/api/data/Data",  // 'internal/gateway/api/data/Data'
    method: "GET"
  }
  constructor(props) {
    super(props);
    this.state = {
      date: 1950,
      st: 'NONE',
      mag: '',
      inj: '',
      fat: '',
      loss: '0'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    var link = "?";
    if (this.state.date !== '') {
      link += `yr=${this.state.date}&`
    }
    if (this.state.st !== "NONE") {
      link += `st=${this.state.st}&`
    }
    if (this.state.mag !== '') {
      link += `mag=${this.state.mag}&`
    }
    if (this.state.inj !== '') {
      link += `inj=${parseInt(this.state.inj)}&`
    }
    if (this.state.fat !== '') {
      link += `fat=${parseInt(this.state.fat)}&`
    }
    if (this.state.loss !== '0') {
      link += `loss=${parseInt(this.state.loss)}`
    }
    if (link[link.length - 1] === '&') {
      link = link.slice(0, link.length - 1);
    }
    fetch(this.props.action + link, {
      method: 'GET'
    }
    )

      .then(res => res.json())
      .then(
        (result) => {
          this.props.history.push("/results", { params: result });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    return (
      <div>
        <Navbar />
        <div style={{ width: "35%", margin: "auto" }}>
          <h2 style={{ textAlign: "center" }}>Retrieve data from Sensor</h2>

          <form action={this.props.action} method={this.props.method} onSubmit={this.handleSubmit} >

            <label>Select year of tornado:</label>
            <div className='form-group'><input type='number' min='1950' max='2021' value={this.state.date} onChange={this.handleChange} className='form-control' name='date' /></div>

            <label>Select state:</label>
            <select className="form-select" name="st" value={this.state.st} onChange={this.handleChange}>
              <option value="NONE">All states</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            <label>Select tornado type by Fujita scale (from 0 to 5):</label>
            <div className='form-group'><input type='number' min="0" max="5" className='form-control' name='mag' value={this.state.mag} onChange={this.handleChange} /></div>

            <label>Minimum Injuries :</label>
            <div className='form-group'><input type='number' min="0" className='form-control' name='inj' value={this.state.inj} onChange={this.handleChange} /></div>

            <label>Minimum Deaths:</label>
            <div className='form-group'><input type='number' min="0" className='form-control' name='fat' value={this.state.value} onChange={this.handleChange} /></div>

            <label>Select type of loss:</label>
            <select className="form-select" name="loss" value={this.state.loss} onChange={this.handleChange}>
              <option value='0'>Any</option>
              <option value='1'>under 50$</option>
              <option value='2'>between 50$ and 500$</option>
              <option value='3'>between 500$ and 5k$</option>
              <option value='4'>between 5k$ and 50k$</option>
              <option value='5'>between 50k$ and 500k$</option>
              <option value='6'>between 500k$ and 5m$</option>
              <option value='7'>between 5m$ and 50m$</option>
              <option value='8'>between 50m$ and 500m$</option>
              <option value='9'>more than 500m$</option>
            </select>
            <div className='form-group'> <button className='btn btn-lg btn-info btn-block form-control' type='submit' style={{ marginTop: "5%" }} onClick={this.onSubmit}>Get Results</button>  </div>

          </form>
        </div>)
      </div>
    )
  }
}
export default GetData;
