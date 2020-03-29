import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Components/Main/Main.jsx';
import Chat from './Components/Chat/Chat.jsx';
import Navigation from './Components/Navigation/Navigation.jsx';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(<Main> </Main>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
