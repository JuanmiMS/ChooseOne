import React, {Component} from 'react';
import './App.css';
import QuestionComponent from './QuestionComponent/QuestionComponent';
import LoadQuestion from './LoadQuestion/LoadQuestion';
import AuthLayout from './ToolbarAuth/ToolbarAuth';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AuthLayout/>,
               {/* <QuestionComponent title={"Cuál es tu super héroe Favorito"}/>*/}
                <LoadQuestion/>
            </div>
        );
    }
}

export default App;
