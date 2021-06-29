import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GetData from './GetData';
import Notifications from './Notifications';
import Results from './Results';
import Offset from './Offset';
import reportWebVitals from './reportWebVitals';
import { Switch, BrowserRouter as Router,Route } from 'react-router-dom';

const SwitchDemo = () => (
  <Switch>
    <Route exact path="/" component={GetData} />
    <Route exact path="/getData" component={GetData} />
    <Route exact path="/results" component={Results} />
    <Route exact path="/notifications" component={Notifications} />
    <Route exact path="/setOffset" component={Offset}/>
  </Switch>
)
ReactDOM.render(
    <React.StrictMode> 
      <Router>
      <SwitchDemo />
      </Router>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
