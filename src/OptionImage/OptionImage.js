import React,{Component} from 'react';

class OptionImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "",
            data: []
        }
    }

    componentWillMount() {
        this.setState({
            imageUrl: this.props.imageUrl,
            data: this.props.data
        })
    }
    render() {
        return(
            <img alt="" src={this.state.imageUrl} />
        )
    }
}

export default OptionImage;