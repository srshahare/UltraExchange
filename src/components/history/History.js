import React, { Component } from 'react'
import { myFirebase } from '../../Firebase';
import Loading from '../loading/Loading';
import './History.css';
import Item from './Item';

class History extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        myFirebase.firestore().collection("GiftRequests").get().then(snapshot => {
            const docs = [];
            snapshot.forEach(doc => {
                docs.push(doc.data());
            })
            this.setState({items: docs, isLoading: false})
        })
    }

    render() {
        return (
            <div className="History">
                <h1>History</h1>
                {this.state.isLoading?
                <Loading />:
                <div className="List">
                    {
                        this.state.items.map(item => (
                            <Item key={item.uid} item={item} />
                        ))
                    }
                </div>
                }
            </div>
        )
    }
}

export default History;
