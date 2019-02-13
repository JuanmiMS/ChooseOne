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
            vecesRespondida: 0,
            img1Cargada : false,
            img2Cargada : false
        }
    }
    handleClick () {
        axios.get('http://localhost:8080/api/pregunta/1')
          .then(response => console.log(response.data['img']))
    }

    cargaDatos = () => {
        
        var x = Math.floor((Math.random() * 100) + 1);
        let url = 'http://localhost:8080/api/pregunta/notocar'+x

        axios.get(url)
          .then(response => {
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
    imgRespondida(respuesta){

        console.log("Pregunta",respuesta,"respondida");
        
        this.fakeCharge();
        this.cargaDatos();
    }

    fakeCharge = _ => {

        document.getElementById("carga").style.display = "block";
        document.getElementById("pregunta").style.display = "none";

        setTimeout(function(){
            document.getElementById("carga").style.display = "none";
            document.getElementById("pregunta").style.display = "block";
        }, 10000);

    }

    cargaImgs (img) {
        if (img === "img1"){
            this.setState({
                img1Cargada : true
            })
        }
        if (img === "img2"){
            this.setState({
                img2Cargada : true
            })
        }
        console.log(img, "cargada");
    
    }

    componentDidUpdate(){
        if(this.state.img1Cargada && this.state.img2Cargada) {
            document.getElementById("carga").style.display = "none";
            document.getElementById("pregunta").style.display = "block";
        }
    }

    componentDidMount(){
       
    }
    


    componentWillMount() {
        this.cargaDatos()
    }   

    render() {
        return (
            <main className="container">
            <img id="carga" src="https://3wga6448744j404mpt11pbx4-wpengine.netdna-ssl.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif" />
                <div id="pregunta" style={{display: "none"}}>
                    <div id="preguntaContainer" className="alert alert-info col-12 mt-5 text-center">
                        <h2>{this.state.enunciado}</h2>
                        Veces respondida: {this.state.vecesRespondida}
                    </div>
                    <div className="row">
                        <div id="img1" onClick={(e) => this.imgRespondida("img1")} className="col-5">
                            <img onLoad={(e) => this.cargaImgs("img1")} src={this.state.img1} alt="img1" />              
                        </div>

                        <div onClick={this.handleClick} className="col-2 timerContainer mt-5"></div>

                        <div id="img2" onClick={(e) => this.imgRespondida("img2")} className="col-5">
                            <img onLoad={(e) => this.cargaImgs("img2")} src={this.state.img2} alt="img2" />              
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
export default QuestionComponent;