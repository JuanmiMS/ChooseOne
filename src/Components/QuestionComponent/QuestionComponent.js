import React, {Component} from 'react';
import axios from 'axios'
import OptionImage from '../OptionImage/OptionImage';

class QuestionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autor:"",
            enunciado: "",
            img1: "",
            img2: "",
            vecesRespondida: 0
        }
    }

    handleClick () {
        axios.get('http://localhost:8080/api/pregunta/1')
          .then(response => console.log(response.data['img']))
    }

    cargaDatos = () => {        
        axios.get('http://localhost:8080/api/pregunta/amano')
          .then(response => {
            console.log("DATOS CARGADOS", response.data);
              this.setState({
                autor: response.data.autor,
                enunciado: response.data.enunciado,
                img1: response.data.imgs[0].path,
                img2: response.data.imgs[1].path,
                vecesRespondida : response.data.vecesRespondida
              })
          }
              )
    }
    imgRespondida(){
        // alert("Respuesta seleccionada!")
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
                    Veces respondida: {this.state.vecesRespondida}
                </div>
                <div className="row">
                    <div id="img1" onClick={this.imgRespondida} className="col-5">
                        <img src={this.state.img1} alt="img1" />              
                    </div>
                    <div onClick={this.handleClick} className="col-2 timerContainer mt-5"></div>
                    <div id="img2" onClick={this.imgRespondida} className="col-5">
                        <img src={this.state.img2} alt="img1" />              
                    </div>
                </div>
            </main>
        )
    }
}
export default QuestionComponent;