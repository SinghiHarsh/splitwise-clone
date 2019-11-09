import React from 'react';
import '../CreateGroup/group.css'

class AddFriend extends React.Component {
    render(){
        return(
            <div className="add-group">
                <a href="#" className="btn-add-group" onClick={()=>{this.props.findFriends()}}>
                    Find Friends 
                </a>
            </div>
        )
    }
}
export default AddFriend;