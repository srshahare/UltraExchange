import React, { Component } from 'react';
import "./Contact.css";
import Email from '../../assets/email.png';
import {myFirebase} from '../../Firebase';
import { Alert, AlertTitle } from '@material-ui/lab';

import cooo from '../../assets/coo.jpg'

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: '',
            last: '',
            email: '',
            company: '',
            about: '',
            alert: false
        }
    }

    inputChange = (e) => {
        const name = e.target.name;
        switch(name) {
            case 'first':
                this.setState({first: e.target.value})
                break;
            case 'last':
                this.setState({last: e.target.value})
                break;
            case 'email':
                this.setState({email: e.target.value})
                break;
            case 'company':
                this.setState({company: e.target.value})
                break;
            case 'about':
                this.setState({about: e.target.value})
                break;
            default:
                console.log("wrong input")
        }
    }

    submitBtn = (e) => {
        e.preventDefault()
        const ref = myFirebase.firestore().collection("Contacts");
        const docId = ref.doc().id;
        const {first, last, email, about} = this.state;
        if(first === "" || last === '' || email === '' || about === '') {
            alert("Plese fill all the input")
        }else {
        ref.doc(docId).set({
            first,
            last,
            email,
            // company,
            about,
            docId,
            date: new Date()
        }).then(docRef => {
            this.setState({
                first: '',
                last: '',
                email: '',
                about: '',
                alert: true
            })
        })
    }
    }

    render() {
        return(
            <div className="Contact">
                <div className="Head">
                    <img src={cooo} alt="about"></img>
                    <div className="backdrop">
                    </div>
                    <div className="title">
                        <h1>Contact Us</h1>
                        <p>Do you have any issues with our services or features then fill the form and hit submit</p>
                    </div>
                </div>
                <div className="Main">
                    <div className="First">
                        <img src={Email} alt="email"></img>
                        <br></br>
                        <div>
                            <p style={{textAlign: 'center', color: 'black'}}>Let’s get in touch.</p>
                            <div style={{display: 'flex', flexFlow: 'column'}}>
                                <a href="/">Email: sachin@gmail.com</a>
                                <a href="/">Telegram: s9999999999</a>
                                <a href="/">Whatsap: 56465656556</a>
                            </div>
                        </div>
                    </div>
                    <div className="Second">
                        <p>Contact us for more information</p>
                        <form>
                        <div className="Name">
                            <input required type='text' placeholder="First Name" name="first" onChange={this.inputChange} value={this.state.first} />
                            <input required type='text' placeholder="Last Name" name="last" onChange={this.inputChange} value={this.state.last} />
                        </div>
                        <div className="Mail">
                            <input required type='text' placeholder="Email Address" name="email" onChange={this.inputChange} value={this.state.email} />
                            {/* <input required type='text' placeholder="Company Name" name="company" onChange={this.inputChange} value={this.state.company} /> */}
                        </div>
                        <div className="Area">
                            <textarea required placeholder="Describe your issues here" name="about" onChange={this.inputChange} value={this.state.about} ></textarea>
                        </div>
                        <button onClick={this.submitBtn}>Submit</button>
                        </form>
                    </div>
                </div>
                {
                    this.state.alert?
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Your response has been recorded — <strong>Thank You!</strong>
                    </Alert>:
                    ""
                }
            </div>
        )
    }
}

export default Contact;