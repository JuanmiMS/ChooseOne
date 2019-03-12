import Loader from 'react-loader-spinner'
import React, {Component} from 'react';

const style= {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1040,
    width: '100vw',
    height: '100vh',
    backgroundColor: '#000',
    opacity:0.7
};
export default class App extends Component {
    render() {
        return (
            <div style={style}>
                <Loader
                    id="loader"
                    type="Triangle"
                    color="#00BFFF"
                    height="50vh"
                    width="50vw"
                />
            </div>
        );
    }
}