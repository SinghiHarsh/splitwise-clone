import React from 'react';
import './transaction.css'

class Transaction extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        console.log("right check",this.props.transactionData)
        if(this.props.transactionData && this.props.transactionData.length > 0){
            return(
                <div className="transaction__1">
                    {
                        this.props.transactionData.map(el=>{
                            return(
                                <div className="transaction__container">
                                    <div className="details-amt">
                                        <span className="desc">{el.description}</span>
                                        <span className="paid-by">Paid By {el.amountPaidBy.name}</span>
                                    </div>
                                    <div className="amount">
                                        <span> ₹ {el.totalAmountPaid}</span>
                                    </div>
                                </div>
                            )
                        })
                    }                      
                </div>
            )
        }
        else{
            return(
                <div className="transaction__1">
                    <span className="no-group">No Transactions</span>
                </div>
            )
        }
    }
}
export default Transaction;
            


/*
<div className="description">
<span>Hello</span>
<span>Hello</span>
</div>
<div>
<span>Hello</span>
</div>
*/