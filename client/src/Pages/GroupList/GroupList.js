import React, { Component } from 'react'
import './card.css'

export default class GroupList extends Component {
    constructor(props) {
        super(props)
        this.state ={
            pressedItem : ""
        }
    }
    handleClick = (item) => {
        console.log(item)
        this.setState({
            pressedItem : item._id
        })
        this.props.showGroupInfo(item)
    }
  render() {
    if(this.props && this.props.type ==="group"){
        if(this.props.groupList && this.props.groupList.length !== 0){
            return(
                <div className="list">
                {
                    this.props.groupList.map((item,index)=>{
                        if(item._id == this.state.pressedItem) {
                            return(
                                <div 
                                    className="card__item"  
                                    key={index} 
                                    onClick={()=>{this.handleClick(item)}}
                                    style={{ backgroundColor : "rgba(246,247,249,0.2)"}}
                                > 
                                    <span className="font-group">{item.groupName}</span>
                                    <span className="font-group__1">{item.groupMembers.length + " members"}</span>
                                </div>
                                )
                            }
                            else {
                                return(
                                    <div 
                                        className="card__item" 
                                        key={index} 
                                        onClick={()=>{this.handleClick(item)}}
                                        style={{
                                            backgroundColor : "white"
                                        }}
                                    > 
                                        <span className="font-group">{item.groupName}</span>
                                        <span className="font-group__1">{item.groupMembers.length + " members"}</span>
                                    </div>
                                    )
                                }
                            })
                        }
                    </div>
                )
            }
        else {
            return (
                <div className="list disp">
                    <span className="no-group">No new groups</span>  
                </div>
              )
        }
    }
    else if(this.props && this.props.type ==="addFriend"){
        if(this.props.showFriends==false && this.props.pendingRequests){
            console.log("check props",this.props.pendingRequests)
            return(
                <div className="list">
                {
                    this.props.pendingRequests.map((item,index)=>{
                        return(
                            <div className="card__item__friends" key={index}> 
                                <span className="font-group__friend">{item.request_sent.name}</span>
                                <a className="font-group__friend1" href="#" onClick={()=>{this.props.acceptRequest(item.request_sent._id)}}>Accept</a>
                            </div>
                        )
                    })
                }
                </div>
            )
        }
        else if(this.props.showFriends == true && this.props.foundFriendList && this.props.foundFriendList.length!==0 ){
            let data = this.props.foundFriendList
            if(data === "Already Friends" || data ==="No users found"){
                return(
                    <div className="list disp">
                    <span className="no-group">{data}</span>  
                </div>
                )
            }
            return(
                <div className="list">
                    <div className="card__item__friends"> 
                        <span className="font-group__friend">{data.username}</span>
                        <a className="font-group__friend1" href="#" onClick={()=>{this.props.sendRequest(data._id)}}>Send Request</a>
                    </div>
                </div>
            )
        }
        else {
            return(
                <div className="list disp">
                    <span className="no-group">No results</span>  
                </div>
            )
        }
    }
  }
}
