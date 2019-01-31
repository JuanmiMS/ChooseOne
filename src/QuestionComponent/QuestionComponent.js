import React, {Component} from 'react';
import axios from 'axios'
import OptionImage from '../OptionImage/OptionImage';
import option1 from '../img/All_Might_sonriendo.png';
import option2 from '../img/superman-worlds-finest_1.jpg';

class QuestionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option1: "",
            option2: "",
            title: ""
        }
    }

    handleClick () {
        axios.get('http://172.16.6.41:8080/api')
          .then(response => console.log(response.data['message'])).catch(alert("error"))
    }


    componentWillMount() {
        this.setState({
            title: this.props.title
        })
    }   

    render() {
        return (
            <main className="container">
                <div id="preguntaContainer" className="alert alert-info col-12 mt-5 text-center">
                    <h2>{this.state.title}</h2>
                </div>
                <div className="row">
                    <div id="img1" className="col-5">
                        <OptionImage imageUrl={option1}/>
                    </div>
                    <div onClick={this.handleClick} className="col-2 timerContainer mt-5"></div>
                    <div id="img2" className="col-5">
                        <OptionImage imageUrl={option2}/>
                    </div>
                </div>
            </main>
        )
    }
}
export default QuestionComponent;