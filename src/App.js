import React, {Component} from 'react';
import './App.css';
import Toolbar from './Toolbar/Toolbar';
import QuestionComponent from './QuestionComponent/QuestionComponent';
import LoadQuestion from './LoadQuestion/LoadQuestion';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Toolbar/>
               <QuestionComponent title={"Cuál es tu super héroe Favorito"}/>
                {/* <LoadQuestion/> */}
            </div>
        );
    }
}

export default App;
