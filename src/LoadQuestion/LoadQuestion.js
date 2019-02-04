import React, {Component} from 'react';
import imgDescarga from '../img/uploadImg.png';

class LoadQuestion extends Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.state = {
            img1: <img height="250" width="250" id="img1" src={imgDescarga}/>,
            img2: <img height="250" width="250" id="img2" src={imgDescarga}/>,
            defaultImgRoute: "../img/uploadImg.png"
        };
        this.handleInputQuestion = this.handleInputQuestion.bind(this);
        this.readImage = this.readImage.bind(this);
        this.sendQuestion = this.sendQuestion.bind(this);
        this.deleteQuestion = this.deleteQuestion.bind(this);
        this.inputErrorStyle = this.inputErrorStyle.bind(this);
        this.cleanInput = this.cleanInput.bind(this);
        this.checkQuestion = this.checkQuestion.bind(this);
    }

    inputErrorStyle() {
        this.input.current.style.borderColor = "red";
    }

    cleanInput() {
        this.input.current.value = "";
        this.input.current.style.borderColor = "";
    }

    checkQuestion() {
        var verify = 0;
        verify = this.state.img1.props.src !== this.state.defaultImgRoute ? verify + 1  : verify;
        verify = this.state.img2.props.src !== this.state.defaultImgRoute ? verify + 1 : verify;
        verify = this.input.current.value !== "" ? verify + 1: verify;
        return verify;
    }

    sendQuestion() {
        if (this.checkQuestion() === 3) {
            alert("¡Pregunta enviada!");
            this.cleanInput();
            this.deleteQuestion();
        }
        else{
            alert("Porfavor rellena todos los campos");
        }

    };


    deleteQuestion() {
        const initialState = {
            question: "",
            img1: <img height="250" width="250" id="img1" src={imgDescarga}/>,
            img2: <img height="250" width="250" id="img2" src={imgDescarga}/>,
        };
        this.setState({
            img1: initialState['img1'],
            img2: initialState['img2'],
        });
        this.cleanInput();
    };


    handleInputQuestion(e) {
        this.setState({
            question: e.target.value
        });
    }

    readImage(e) {
        const that = this;
        if (e.target.files[0]) {
            var reader = new FileReader();
            const imgName = e.target.name;

            reader.onload = function (e) {
                that.setState({
                    [imgName]: <img height="250" width="250" id={imgName} src={e.target.result}/>
                })
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }

    render() {
        return (
            <main className="container alert alert-info">
                <div id="preguntaContainer" className="col-12 mt-5 text-center">
                    <h2>Inserte una pregunta y dos imágenes como respuestas:</h2>
                    <form>
                        <div className="form-group">
                            <input ref={this.input} type="text" placeholder="Inserte pregunta aquí..."
                                   className="form-control"
                                   id="question"/>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-sm text-center">
                        <div className="image-upload">
                            <label htmlFor="file-input">
                                {this.state.img1}
                            </label>
                            <input id="file-input" onChange={this.readImage} name={"img1"} type="file"/>
                        </div>
                    </div>
                    <div className="col-sm text-center">
                        <button type="button" className="btn btn-primary btn-lg mt-5" onClick={this.sendQuestion}>Enviar
                            pregunta
                        </button>
                        <button type="button" className="btn btn-danger btn-lg mt-5"
                                onClick={this.deleteQuestion}>Borrar pregunta
                        </button>
                    </div>

                    <div className="col-sm text-center">
                        <div className="image-upload">
                            <label htmlFor="file-input1">
                                {this.state.img2}
                            </label>
                            <input id="file-input1" onChange={this.readImage} name={"img2"} type="file"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

}

export default LoadQuestion;