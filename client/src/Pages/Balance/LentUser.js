import React from 'react';
import './balance.css'

export default class LentUser extends React.Component {
    render() {
        return(
            this.props.data && this.props.data.amountLent.length > 0 ? this.props.data.amountLent.map(user=>{
                return(
                    <div className="debt-block">
                        <span className="userName">
                            {this.props.data.groupUserId.name} gets back <span className="amt">₹{user.lentAmount}</span> {user.amountLentToId.name}
                        </span> 
                    </div>
                )
            })
            : null
        )
    }
}