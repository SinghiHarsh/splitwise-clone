import React from 'react';
import './balance.css'

export default class DebtUser extends React.Component {
    render() {
        console.log(this.props);
        return(
            this.props.data && this.props.data.amountDebt.length > 0 ? this.props.data.amountDebt.map(user=>{
                return(
                    <div className="debt-block">
                        <span className="userName">
                            {this.props.data.groupUserId.name} owes <span className="amt">₹{user.debtAmount}</span> {user.amountDebtToId.name}
                        </span> 
                    </div>
                )
            })
            : null
        )
    }
}