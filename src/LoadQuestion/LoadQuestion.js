import React,{Component} from 'react';

class LoadQuestion extends Component{
    constructor(props){
        super(props);
        this.state = {
            question:"",
            img1:<img height="250" width="250" id="img1" src="../img/descarga.png"/>,
            img2:<img height="250" width="250" id="img2" src="../img/descarga.png"/>
        };
        this.handleInputQuestion = this.handleInputQuestion.bind(this);
        this.readImage = this.readImage.bind(this);
    }

    handleInputQuestion(e) {
        this.setState({
            question:e.target.value
        })
    }

    readImage(e) {
        const that = this;
        if (e.target.files[0]) {
            var reader = new FileReader();
            const imgNode = e.target.name == "img1" ? this.state.img1: this.state.img2;
            const imgName = e.target.name;

            reader.onload = function (e) {
                if(imgName == "img1") {
                    that.setState({
                        img1: <img height="250" width="250" id={imgName} src={e.target.result}/>
                    })
                }
                else {
                    that.setState({
                        img2: <img height="250" width="250" id={imgName} src={e.target.result}/>
                    })
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    }
    render() {
        return (
            <main className="container">
                <div id="preguntaContainer" className="alert alert-info col-12 mt-5 text-center">
                    <h2>Choose One</h2>
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Inserte pregunta aquí..." className="form-control"
                                   id="question" onBlur={this.handleInputQuestion}/>
                        </div>
                    </form>
                </div>
                <div className="row col-12">
                    <div className="col-5 text-center">
                        <h2>INSERTA IMAGEN 01</h2>
                        <div className="image-upload">
                            <label htmlFor="file-input">
                                {this.state.img1}
                            </label>
                            <input id="file-input" onChange={this.readImage} name={"img1"} type="file"/>
                        </div>
                    </div>
                    <button type="button" className="btn btn-success col-2">Success</button>
                    <div className="col-5 text-center">
                        <h2>INSERTA IMAGEN 02</h2>
                        <div className="image-upload">
                            <label htmlFor="file-input1">
                                {this.state.img2}
                            </label>
                            <input id="file-input1" onChange={this.readImage} name={"img2"}   type="file"/>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

}

export default LoadQuestion;