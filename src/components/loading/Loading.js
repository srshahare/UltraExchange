import React, { Component } from 'react'
import './Loading.css';

class Loading extends Component {
    render() {
        return (
            <div>
            <div className="backdrop">
            </div>
            <div class="loader">Loading...</div>
            </div>
          
        )
    }
}

export default Loading
