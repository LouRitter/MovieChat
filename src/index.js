import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App.jsx';
import Chat from './Components/Chat/Chat.jsx';

import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";




ReactDOM.render((
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/movies/:id" component={Chat} />
    </Switch>

    </BrowserRouter>

  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
