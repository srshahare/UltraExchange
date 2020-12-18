import React from 'react'
import './History.css';

function Item(props) {
    const {item} = props;
    return (
        <div className="Item" key={item.uid}>
            <div>
                <h3>{item.giftName}</h3>
                <p>Card Type: {item.giftType}</p>
                <p>Value: {item.giftValue } {item.selectedCur}</p>
                <p>Date: {item.date.toDate().toLocaleString()}</p>
                {item.status === "Approved"?
                <h4 className="green">Order Status: {item.status}</h4>:
                <h4>Order Status: {item.status}</h4>
                }
            </div>
            <img src={item.giftFile} alt={item.giftName}></img>
        </div>
    )
}

export default Item
