import React from 'react';
import './showBal.css'

export default class ShowBalances extends React.Component {
    render() {
        console.log("check props",this.props);
        if(this.props.calcData && this.props.calcData.length > 0){
            return (
                <div className="balances">
                    {
                        this.props.calcData.length > 0 && this.props.calcData.map(el=>{
                            return(
                                <div className="balance__container">
                                {
                                    el.finalValue.getBacksValue ? 
                                    <span className="userName">
                                        {el.userData[0].name} {"gets back"} <span className="amt">{"₹" + el.finalValue.getBacksValue === undefined ? "₹0" : "₹" + el.finalValue.getBacksValue}</span>
                                    </span>
                                    : 
                                    <span className="userName">
                                        {el.userData[0].name} {"owes"} <span className="amt">{el.finalValue.owesValue === undefined ? "₹0" : "₹"  + el.finalValue.owesValue}</span>
                                    </span>
                                }
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
        else{
            return (
                <div className="balances">
                    <span>No Balances</span>
                </div>
            )
        }
    }
}