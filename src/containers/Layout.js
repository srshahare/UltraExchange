import React, { Component } from 'react'
import MainImage from '../assets/back.png'
import vectorImage from '../assets/card.png';
import GiftCards from '../components/grid/GiftsGrid';
import './Layout.css';

import First from '../assets/first.png';
import Second from '../assets/second.png';
import Third from '../assets/third.png';
import Fourth from '../assets/fourth.png';
import { myFirebase } from '../Firebase';
import FormDialog from '../components/formDialog/FormDialog';
import Loading from '../components/loading/Loading';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.ref = myFirebase.firestore().collection("GiftCards");
        this.giftRef = myFirebase.firestore().collection("GiftRequests");
        this.curRef = myFirebase.firestore().collection("Currencies");
        this.storage = myFirebase.storage();
        this.state = {
            gifts: [],
            currencies: [],
            selectedCur: '',
            open: false,
            giftName: 'Gift Card',
            giftDesc: 'Description of Gift Card',
            giftPreview: '',
            giftUid: '',
            giftType: "ECode",
            giftPin: '',
            giftCode: '',
            giftCvv: '',
            giftDate: '',
            giftValue: '',
            payAddress: '',
            visiblePhysical: false,
            visiblePin: false,
            visibleCvv: false,
            giftFile: "",
            loading: false,
            error: false,
            success: false
        }
    }

    componentDidMount() {
        this.ref.get().then(snapshot => {
            const docs = [];
            snapshot.forEach(doc => {
                docs.push(doc.data());
            })
            this.setState({ gifts: docs })
        })

        //fetching currencies
        this.curRef.get().then(snapshot => {
            const docs = [];
            snapshot.forEach(doc => {
                docs.push(doc.data());
            })

            this.setState({ currencies: docs })
        })
    }

    dialogHandler = () => {
        if(this.props.loginState){
            this.setState({open: true})
            console.log("logout")
        }else {
            this.props.history.push('/signin')
        }
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleSelectChange = (e) => {
        const name = e.target.name;
        switch(name) {
            case "giftname":
                this.ref.doc(e.target.value).get().then(snapshot => {
                    const name = snapshot.get("name");
                    const desc = snapshot.get("desc");
                    const preview = snapshot.get("url");
                    this.setState({giftName: name, giftDesc: desc, giftPreview: preview, giftUid: e.target.value});
                })
                break;
            case "gifttype":
                this.setState({giftType: e.target.value})
                if(e.target.value === "Physical") {
                    this.setState({visiblePhysical: true})
                }else {
                    this.setState({visiblePhysical: false})
                }
                break;
            case "currency":
                this.setState({selectedCur: e.target.value})
                break;
            case "checkedPin":
                console.log(e.target.checked)
                if(e.target.checked) {
                    this.setState({visiblePin: true})
                }else{
                    this.setState({visiblePin: false})
                }
                break;
            case "checkedCvv":
                console.log(e.target.checked)
                if(e.target.checked) {
                    this.setState({visibleCvv: true})
                }else{
                    this.setState({visibleCvv: false})
                }
                break;
            default: 
                console.log("wrong input")
        }
    }

    fileChangeHandler = (e) => {
        const file = e.target.files[0];
        this.setState({
            giftFile: file
        })
    }

    inputHandler = (e) => {
        const name = e.target.name;
        switch(name) {
            case "code":
                this.setState({giftCode: e.target.value})
                break;
            case "pin":
                this.setState({giftPin: e.target.value})
                break;
            case "cvv":
                this.setState({giftCvv: e.target.value})
                break;
            case "date":
                this.setState({giftDate: e.target.value})
                break;
            case "value":
                this.setState({giftValue: e.target.value})
                break;
            case "pay":
                this.setState({payAddress: e.target.value})
                break;
            default: 
                console.log("Wrong input");
        }
    }

    handleProceed = () => {
        this.setState({loading: true, open: false});
        const { giftFile, giftName, giftUid, giftType, giftCode, giftCvv, giftPin, giftDate, giftValue, selectedCur, payAddress } = this.state;
        let uid = this.giftRef.doc().id;
        if ( this.state.giftType === "Physical") {
            this.curRef.doc(selectedCur).get().then(snap => {
                const cu = snap.get("symbol");
                this.giftRef.doc(uid).set({
                    giftName,
                    giftUid,
                    giftType,
                    giftFile: "",
                    giftCode,
                    giftCvv,
                    giftPin, 
                    giftDate, 
                    giftValue,
                    selectedCur: cu,
                    payAddress,
                    status: "Pending",
                    userId: this.props.user.uid,
                    date: new Date(),
                    uid
                }).then((docRef) => {
                    const uploadTask = this.storage.ref(`/cards/${uid}`).put(giftFile);
                    uploadTask.on('state_changed', (snapshot) => {
                        console.log(snapshot)
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                        console.log('Upload is ' + progress + '% done');
                    }, err => {
                        console.log(err);
                        this.setState({error: true, success: false, loading: false })
                    }, () => {
                        uploadTask.snapshot.ref.getDownloadURL()
                        .then(firebaseUrl => {
                            this.giftRef.doc(uid).update({
                                giftFile: firebaseUrl
                            })
                            .then(docRef => {
                                this.setState({loading: false, success: true, error: false})
                                this.setState({
                                    giftName: "",
                                    giftUid: "",
                                    giftType: "",
                                    giftFile: "",
                                    giftCode: "",
                                    giftCvv: "",
                                    giftPin: "", 
                                    giftDate: "", 
                                    giftValue: "",
                                    selectedCur: "",
                                    giftPreview: ""
                                })
                            })
                        })
                    })
                })
                .catch(err => {
                    this.setState({error: true, success: false, loading: false})
                    this.setState({
                        giftName: "",
                        giftUid: "",
                        giftType: "",
                        giftFile: "",
                        giftCode: "",
                        giftCvv: "",
                        giftPin: "", 
                        giftDate: "", 
                        giftValue: "",
                        selectedCur: "",
                        giftPreview: ""
                    })
                })
            })
        }else {
            this.curRef.doc(selectedCur).get().then(snap => {
                const cu = snap.get("symbol");
                this.giftRef.doc(uid).set({
                    giftName,
                    giftUid,
                    giftType,
                    giftFile: "",
                    giftCode,
                    giftCvv,
                    giftPin, 
                    giftDate, 
                    giftValue,
                    selectedCur: cu,
                    payAddress,
                    status: "Pending",
                    userId: this.props.user.uid,
                    date: new Date(),
                    uid
                }).then((docRef) => {
                   this.setState({error: false, success: true, loading: false})
                   this.setState({
                        giftName: "",
                        giftUid: "",
                        giftType: "",
                        giftFile: "",
                        giftCode: "",
                        giftCvv: "",
                        giftPin: "", 
                        giftDate: "", 
                        giftValue: "",
                        selectedCur: "",
                        giftPreview: ""
                    })
                }).catch(err => {
                    this.setState({error: true, success: false, loading: false})
                    this.setState({
                        giftName: "",
                        giftUid: "",
                        giftType: "",
                        giftFile: "",
                        giftCode: "",
                        giftCvv: "",
                        giftPin: "", 
                        giftDate: "", 
                        giftValue: "",
                        selectedCur: "",
                        giftPreview: ""
                    })
                })
            })
        }
    }

    render() {
        return (
            <div className="Layout">
                {this.state.open?
                <FormDialog 
                    open={this.state.open}
                    gifts={this.state.gifts}
                    curs={this.state.currencies}
                    handleChange={this.handleSelectChange}
                    giftName={this.state.giftName}
                    giftDesc={this.state.giftDesc}
                    giftPreview={this.state.giftPreview}
                    visiblePhysical={this.state.visiblePhysical}
                    visiblePin={this.state.visiblePin}
                    visibleCvv={this.state.visibleCvv}
                    onFileChange={this.fileChangeHandler}
                    inputChange={this.inputHandler}
                    handleClose={this.handleClose} 
                    handleProceed={this.handleProceed}
                    />:
                <div>
                    {this.state.loading?
                    <Loading />:
                    ""
                    }
                    {this.state.error?
                    <Alert severity="error">This is an error alert — check it out!</Alert>
                    : ""
                    }
                    {this.state.success?
                    <Alert severity="success">This is a success alert — check it out!</Alert>
                    : ""
                    }
                    <div className="Header">
                        <img src={MainImage} alt="background of gift card" />
                    </div>
                    <div className="HeaderContext">
                        <div className="Left">
                            <h1>SELL GIFT CARDS &<br></br> VOUCHERS</h1>
                            <button onClick={this.dialogHandler}>SELL GIFT CARD</button>
                        </div>
                        <div className="Right">
                            <img src={vectorImage} alt="gift vector" />
                        </div>
                    </div>

                    <div className="HowItWorks">
                        <h1>HOW IT WORKS</h1>
                        <div className="WorkFlow">
                            <div>
                                <img src={First} alt="Gift card button" />
                                <h3>1. Sell your gift card by clicking the above button.</h3>
                            </div>
                            <div>
                                <img src={Second} alt="Gift card button" />
                                <h3>2. Make sure the Gift Card is valid and legal.</h3>
                            </div>
                            <div>
                                <img src={Third} alt="Gift card button" />
                                <h3>3. Wait for the approval from the administration. (It may take arount 45 minutes)</h3>
                            </div>
                            <div>
                                <img src={Fourth} alt="Gift card button" />
                                <h3>4. Your money will be transfered once the gift card is approved.</h3>
                            </div>
                        </div>
                    </div>

                    <div className="AcceptGifts">
                        <h1>Accepted Gift Cards</h1>
                        <GiftCards tiles={this.state.gifts} />
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(Layout);
