import React, {Component} from 'react';
import './App.css';
import Toolbar from './Toolbar/Toolbar';
import QuestionComponent from './QuestionComponent/QuestionComponent';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Toolbar/>
                <QuestionComponent title={"Cuál es tu super héroe Favorito"}/>
            </div>
        );
    }
}

export default App;
