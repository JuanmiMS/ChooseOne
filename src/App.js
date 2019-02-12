import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import QuestionComponent from './Components/QuestionComponent/QuestionComponent';
import LoadQuestion from './Components/LoadQuestion/LoadQuestion';
import AuthLayout from './Components/ToolbarAuth/ToolbarAuth';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AuthLayout/>
                <Switch>
                    <Route exact path="/" component={QuestionComponent} />
                    <Route exact path='/loadquestion' component={LoadQuestion} />
                </Switch>
            </div>
        );
    }
}

export default App;
