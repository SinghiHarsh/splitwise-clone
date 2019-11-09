import React from 'react';
import ReactDOM from 'react-dom';
import {Route,BrowserRouter as Router, Switch} from 'react-router-dom';

// Components
// import App from './App';
import Login from './Pages/LoginPage/Login';
import Register from './Pages/RegisterPage/Register';
import MainPage from './Pages/MainPage/Page';

const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/payment" component={MainPage} />
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

