import React, {Fragment} from 'react';
import './balance.css'
import LentUser from './LentUser';
import DebtUser from './DebtUser';

class Balance extends React.Component{
    render(){
        if(this.props.balances.length > 0){
            return(
                <div className="transaction__1">
                    {
                        this.props.balances.map(el=>{
                            return(
                                <div className="user-block">
                                    <LentUser data={el} />
                                    <DebtUser data={el} />
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
                    <span className="no-group">No Balances</span>
                </div>
            )
        }
    }
}

export default Balance;