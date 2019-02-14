import React, {Component} from 'react';
import axios from 'axios'

class QuestionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : "",
            autor:"",
            enunciado: "",
            imgs : {
                path1: "",
                path2: "",
                votos1:0,
                votos2:0,
                img1Cargada : false,
                img2Cargada : false
            },
            vecesRespondida: 0,
            
        }
    }
    handleClick () {
        axios.get('http://localhost:8080/api/pregunta/1')
          .then(response => console.log(response.data['img']))
    }

    cargaDatos = () => {
        
        var x = Math.floor((Math.random() * 9) + 1);
        let url = 'http://localhost:8080/api/pregunta/notocar'+x

        axios.get(url)
          .then(response => {
              console.log(url, response)
              this.setState({
                id : response.data.id,
                autor: response.data.autor,
                enunciado: response.data.enunciado,
                imgs : {
                    path1: response.data.imgs[0].path,
                    path2: response.data.imgs[1].path,
                    votos1:response.data.imgs[0].votos,
                    votos2: response.data.imgs[1].votos
                    
                },
                img1Cargada : false,
                img2Cargada : false,
                vecesRespondida : response.data.vecesRespondida
              })
          }
              )
    }
    imgRespondida(respuesta){

        console.log("Pregunta",respuesta,"respondida");
        this.updateQuestion(respuesta);
        this.fakeCharge();
        this.cargaDatos();
    }

    updateQuestion = resp => {
        const model = {
            "id" : this.state.id,
            "pregunta" : {
                "id" : this.state.id,
                "imgs": [
                    {
                        "alt": "alt",
                        "path": this.state.imgs.path1,
                        "votos" : resp === "img1" ? this.state.imgs.votos1 + 1 : this.state.imgs.votos1,
                    },
                    {
                        "alt": "alt2",
                        "path": this.state.imgs.path2,
                        "votos" : resp === "img2" ? this.state.imgs.votos2 + 1 : this.state.imgs.votos2,
                    }
                ],
                "vecesRespondida": this.state.vecesRespondida +1,
                "enunciado": this.state.enunciado,
                "autor": this.state.autor
            }
          };

          axios.post(`http://localhost:8080/api/pregunta`, { model })
              .then(res => {
                  console.log("pregunta actualizada")
              }).catch( res => {
                  console.log("error actualizando la pregunta");
              }
              )
    }

    fakeCharge = _ => {

        document.getElementById("carga").style.display = "block";
        document.getElementById("pregunta").style.display = "none";

        setTimeout(function(){
            document.getElementById("carga").style.display = "none";
            document.getElementById("pregunta").style.display = "block";
        }, 1000);

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

    componentWillMount() {
        console.log('this.state', this.state)
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
                            <img onLoad={(e) => this.cargaImgs("img1")} src={this.state.imgs.path1} alt="img1" />              
                            <span>Veces respondida: {this.state.imgs.votos1}.</span>                        
                        </div>

                        <div onClick={this.handleClick} className="col-2 timerContainer mt-5"></div>

                        <div id="img2" onClick={(e) => this.imgRespondida("img2")} className="col-5">
                            <img onLoad={(e) => this.cargaImgs("img2")} src={this.state.imgs.path2} alt="img2" />              
                        <span>Veces respondida: {this.state.imgs.votos2}.</span>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}
export default QuestionComponent;