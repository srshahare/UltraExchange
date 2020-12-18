import React, { Component } from 'react'
import { myFirebase } from '../../Firebase';

class Faq extends Component {   

    componentDidMount() {
        myFirebase.firestore().collection("Admin").doc("0rzSJ55LVy38gl0ai23x").get().then(snapshot => {
            const faq = snapshot.get("faq");
            document.getElementById("faqShow").innerHTML = faq;
        })
    }

    render() {
        return (
            <div id="faqShow">
                
            </div>
        )
    }
}

export default Faq
