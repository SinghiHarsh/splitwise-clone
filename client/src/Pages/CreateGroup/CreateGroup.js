import React from 'react';
import './group.css'
import Select from '../Select/Select';
import downArrow from '../../images/down-chevron.svg';

class CreateGroup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            selectedFriends:[]
        }
    }
    showDropDown = (e)=>{
        if(this.state.isOpen){
            this.setState({
                isOpen: false
            })
        }
        else {
            this.setState({
                isOpen: true
            })
        }
    }
    getUserId = (e) => {
        this.props.friends.map((element,index)=>{
            if(e.target.id == element._id){
                if(!this.state.selectedFriends.includes(element.name)){
                    this.setState({
                        selectedFriends: [...this.state.selectedFriends, element.name]
                    })
                }
            } 
        })
    }
    removeUser = (name) => {
        this.setState({
            selectedFriends: this.state.selectedFriends.filter((i,index)=>{
                return i !== name;
            })
        })
    }
    render(){
        console.log("checking right props", this.props)
        return(
            <div className="add-group">        
                <a href="#" className="btn-add-group" onClick={()=>{this.props.openModal(this.state.selectedFriends)}}>
                    Add new group
                </a>
                <div className="popup"
                    style={{
                        display: this.props.isShowing ? 'flex': 'none'
                    }}
                >
                <div className="popup-content"
                    style={{
                        display: this.props.isShowing ? 'flex': 'none'
                    }}
                    >
                    <form className="create-group-data">
                        <div className="form-group-1">
                            <span className="font-group-1">Create group</span>
                            <span className="font-group-2">Split money equally between your friends</span>
                        </div>
                        <div className="form-group-2">
                            <input type="text" placeholder="Group Name" name="groupName" onChange={(e)=>{this.props.handleChange(e)}} 
                                className="group-name"
                                value= {this.props.groupName}
                            />
                        </div>
                        <div className="form-group-3">
                            <div className="label-container">
                                <div className="align-label">
                                    {   
                                        this.props.selected.length > 0 ?
                                        (
                                            <div className="not-selected">No Friends selected</div>
                                        ): 
                                        this.state.selectedFriends && this.state.selectedFriends.length > 0 ?
                                        this.state.selectedFriends.map((element,index)=>{
                                            return(
                                                    <div className="label-wrapper">
                                                        <span className="inv-label">{element}</span>
                                                        <svg className="cross-icon" onClick={()=>{this.removeUser(element)}}>
                                                            <path className="color" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                                                        </svg>
                                                    </div>
                                            )
                                        })
                                        :(
                                            <div className="not-selected">No Friends selected</div>
                                        )
                                    }
                                </div>
                                <img className="dropdown-icon" onClick={this.showDropDown} src={downArrow} />    
                            </div>
                            <Select
                                options={this.props.friends ? this.props.friends : null}
                                open={this.state.isOpen}
                                getUserId={this.getUserId}
                            />
                        </div>
                        <div className="form-group-4">
                            <div className="close-btn">
                                <a onClick={()=>{this.props.closeModal()}} href="#" className="close-btn-disp">Close</a>
                            </div>
                            <div className="submit-btn">
                                <a href="#" className="submit-btn-disp" onClick={()=>{this.props.submitGroupForm(this.state.selectedFriends)}}>Submit</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}
export default CreateGroup;