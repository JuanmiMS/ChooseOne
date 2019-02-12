import React, {Component} from 'react';
import axios from 'axios'
import OptionImage from '../OptionImage/OptionImage';

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
        console.log(this.state.img1)
        return (
            <main className="container">
                <div id="preguntaContainer" className="alert alert-info col-12 mt-5 text-center">
                    <h2>{this.state.enunciado}</h2>
                    Veces respondida: {this.state.respuestas}
                </div>
                <div className="row">
                    <div id="img1" onClick={this.imgRespondida} className="col-5">
                        <OptionImage imageUrl={"https://firebasestorage.googleapis.com/v0/b/chooseone-60d71.appspot.com/o/fotos%2F921319.jpg?alt=media&token=76c8a41f-ed00-4ccf-a61f-10c380f474b4"}/>
                        ruta : {this.state.img1}
                    </div>
                    <div onClick={this.handleClick} className="col-2 timerContainer mt-5"></div>
                    <div id="img2" onClick={this.imgRespondida} className="col-5">
                        <OptionImage imageUrl={"https://firebasestorage.googleapis.com/v0/b/chooseone-60d71.appspot.com/o/fotos%2F542652.jpg?alt=media&token=c21f7849-3128-42d7-b7dd-802fe9158d5a"}/>
                        ruta : {this.state.img2}
                    </div>
                </div>
            </main>
        )
    }
}
export default QuestionComponent;