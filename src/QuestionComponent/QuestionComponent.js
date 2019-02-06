import React, {Component} from 'react';
import axios from 'axios'
import OptionImage from '../OptionImage/OptionImage';
import option1 from '../img/All_Might_sonriendo.png';
import option2 from '../img/superman-worlds-finest_1.jpg';

class QuestionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enunciado: "",
            img1: "",
            img2: "",
            title: "",
            respuestas: 0
        }
    }

    handleClick () {
        axios.get('http://localhost:8080/api/pregunta/1')
          .then(response => console.log(response.data['img']))
    }

    cargaDatos = () => {
        axios.get('http://localhost:8080/api/pregunta/1')
          .then(response => this.setState(
              {
                respuestas : response.data['vecesRespondida'],
                enunciado : response.data['enunciado']},
                )
              )
        
        axios.get('http://localhost:8080/api/pregunta/1/imgs/img1')
          .then(response => this.setState(
              {
                img1 : response.data['path']
            }
                )
              )
        axios.get('http://localhost:8080/api/pregunta/1/imgs/img2')
          .then(response => this.setState(
              {
                img2 : response.data['path']
            }
                )
              )
        
    }
    imgRespondida(){
        alert("Respuesta seleccionada!")
    }

    componentWillMount() {
        this.cargaDatos()
    }   

    render() {
        return (
            <main className="container">
                <div id="preguntaContainer" className="alert alert-info col-12 mt-5 text-center">
                    <h2>{this.state.enunciado}</h2>
                    Veces respondida: {this.state.respuestas}
                </div>
                <div className="row">
                    <div id="img1" onClick={this.imgRespondida} className="col-5">
                        <OptionImage imageUrl={option1}/>
                        ruta : {this.state.img1}
                    </div>
                    <div onClick={this.handleClick} className="col-2 timerContainer mt-5"></div>
                    <div id="img2" onClick={this.imgRespondida} className="col-5">
                        <OptionImage imageUrl={option2}/>
                        ruta : {this.state.img2}
                    </div>
                </div>
            </main>
        )
    }
}
export default QuestionComponent;