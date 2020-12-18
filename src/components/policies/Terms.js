import React, { Component } from 'react'
import { myFirebase } from '../../Firebase';

class Terms extends Component {

    constructor(props) {
        super(props);
        this.state = {
            terms: null
        }
    }

    componentDidMount() {
        myFirebase.firestore().collection("Admin").doc("0rzSJ55LVy38gl0ai23x").get().then(snapshot => {
            const terms = snapshot.get("terms");
            document.getElementById("termsShow").innerHTML = terms;
        })
    }

    render() {
        return (
            <div id="termsShow">
                
            </div>
        )
    }
}

export default Terms
