import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase/app';

firebase.initializeApp({
    apiKey: "AIzaSyAofQ-s3wfaf7avPgT4tE1JlqbXMg5q97U",
    authDomain: "chooseone-60d71.firebaseapp.com",
    databaseURL: "https://chooseone-60d71.firebaseio.com",
    projectId: "chooseone-60d71",
    storageBucket: "chooseone-60d71.appspot.com",
    messagingSenderId: "302774920695"

});


ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
