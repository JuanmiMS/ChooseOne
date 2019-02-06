import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Toolbar from './Toolbar/Toolbar';
import QuestionComponent from './QuestionComponent/QuestionComponent';
import LoadQuestion from './LoadQuestion/LoadQuestion';
import AuthLayout from './Auth/Auth';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Toolbar/>
                <Switch>
                    <Route exact path="/" component={QuestionComponent} />
                    <Route exact path='/loadquestion' component={LoadQuestion} />
                </Switch>
                <AuthLayout/>
            </div>
        );
    }
}

export default App;
