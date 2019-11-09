import React from 'react'
import axios from 'axios';

import './style.css'
import group from '../../images/group.svg'
import addFriend from '../../images/add-contact.svg'
import profit from '../../images/profit.svg'
import loss from '../../images/loss.svg'
import { Redirect ,withRouter } from 'react-router-dom'
import GroupList from '../GroupList/GroupList';
import CreateGroup from '../CreateGroup/CreateGroup';
import AddFriend from '../AddFriend/AddFriend';
import AddExpense from '../AddExpense/AddExpense';
import Transaction from '../Transactions/Transaction';
import Balance from '../Balance/Balance';
import ShowBalances from '../ShowBalances/ShowBalances';

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
            loggedIn = false
        } 
        this.state = {
            loggedIn,
            friends:[],
            email: "",
            groups: [],
            isShowing: false,
            groupName: "",
            selected:[],
            type: "group",
            pendingRequests:[],
            searchName: "",
            foundFriendList:[],
            showFriends:false,
            expenseModal: false,
            groupTransaction:[],
            balances:[]
        }
    }
    openModal = (selectedFriends)=> {
        if(selectedFriends.length > 0){
            this.setState({
                selected:[]
            })
        }
        this.setState({
            isShowing:true,
            groupName: "",
            isShowing: true
        })
    }
    closeModal = ()=> {
        this.setState({
            isShowing:false,
            groupName: ""
        })
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitGroupForm = (selectedFriends) => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        this.setState({
            selectedFriends:selectedFriends
        })
        var finalArray = []
        selectedFriends.forEach((element,index)=>{
            this.state.friends.forEach((element1,index1)=>{
                if(element === element1.name){
                    finalArray.push(element1._id)
                }
            })
        })
        const body1 =  {
            groupName: this.state.groupName,
            groupMembers: finalArray
        }
        axios.post("/create-group",body1, axiosConfig)
        .then(res=>{
            console.log(res)
            this.closeModal();
            this.makeApiCall();
            this.setState({
                groupName: ""
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    submitExpenseForm = (paidBy, splitBetween) => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        console.log(paidBy)
        let paidById
        this.state.groupInfo.groupMembers.forEach((element)=>{
            if(paidBy === element.name){
                paidById = element._id
            }
        })
        var finalArray = []
        splitBetween.forEach((element,index)=>{
            this.state.groupInfo.groupMembers.forEach((element1,index1)=>{
                if(element === element1.name){
                    finalArray.push(element1._id)
                }
            })
        })
        var totalAmountPaid = parseInt(this.state.amount)
        var amountDebt = totalAmountPaid / splitBetween.length;
        var amountLent
        if(splitBetween.includes(paidBy)){
            amountLent = amountDebt
        }
        else{
            amountLent = totalAmountPaid / splitBetween.length;
        }
        const body = {
            createdAt: new Date(),
            groupId: this.state.groupInfo._id,
            description: this.state.description,
            amountPaidBy: paidById,
            totalAmountPaid: parseInt(totalAmountPaid),
            splitBetween: finalArray,
            debtValue: parseInt(amountDebt),
            lentValue: parseInt(amountLent)
        }
        axios.post("/add-expense", body, axiosConfig)
        .then(res=>{
            console.log("expense created",res)
            this.setState({
                expenseData: res
            })
            this.showBalances(this.state.groupInfo._id);
            this.showTransactions(this.state.groupInfo._id);
            this.closeExpense();
        })
        .catch(err=>{
            console.log(err)
        })
    }
    makeApiCall = ()=> {
                const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        axios.post("/user",{},axiosConfig)
        .then(res=>{
            console.log("check res",res)
            let data = res.data
            this.setState({
                email: data.email_id,
                friends:data.friends,
                name: data.name,
                groups: data.groups.reverse()
            })
        })
        .catch(err=>{
            console.log(err)
        })  
    }
    findFriends = ()=>{
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        const body =  {
            search_user: this.state.searchName
        }
        axios.post("/search-user",body,axiosConfig)
        .then(res=>{
            console.log("no res",res)
            this.setState({
                foundFriendList: res.data,
                showFriends:true,
                searchName:""
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    sendRequest = (id) => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        const body = {id}
        axios.post("/sendrequest",body,axiosConfig)
        .then(res=>{
            console.log(res)
            this.setState({
                foundFriendList:[]
            },()=>{
                console.log(this.state.findFriends)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    addExpense = () => {
        this.setState({
            expenseModal: true
        })
    }
    closeExpense = () => {
        this.setState({
            expenseModal: false
        })
    }
    acceptRequest = (acceptId) => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        const body = {
            reqSentId: acceptId
        }
        axios.post("/accept-request",body,axiosConfig)
        .then(res=>{
            this.showPendingRequestList()
            this.makeApiCall()
        })
        .catch(err=>{
            console.log(err)
        })
    }
    componentDidMount(){
        this.makeApiCall();
    }
    showPendingRequestList = () => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        axios.post("/showrequests",{},axiosConfig)
        .then(res=>{
            console.log("main res",res);
            this.setState({
                showFriends:false,
                pendingRequests: res.data
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    changeType = (msg) => {
        msg === "group" ? this.setState({type:msg}) :
        msg === "addFriend" ? this.setState({type: msg}) :
        this.setState({type:"group"})
        if(msg==="addFriend"){
            this.showPendingRequestList()
        }
        else if(msg === "group"){
            this.makeApiCall();
        }
    }
    showTransactions = (id) => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        const data = {
            groupId:id
        }
        axios.post("/show-transactions",data,axiosConfig)
        .then(res=>{
            console.log("transaction",res.data);
            this.setState({
                groupTransaction:res.data.reverse()
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    showBalances = (id) => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        const data = {
            groupId:id
        }
        axios.post("/balances",data,axiosConfig)
        .then(res=>{
            this.setState({
                balances: res.data.reverse()
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    showFinalCalc = (id) => {
        const axiosConfig = {
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": localStorage.getItem("token")
            }
        }
        const data = {
            groupId:id
        }
        axios.post("/final-calc",data,axiosConfig)
        .then(res=>{
            this.setState({
                finalCalc: res.data
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    showGroupInfo = (groupInfo) => {
        this.setState({
            groupInfo
        })
        const body = {
            groupId: groupInfo._id
        }
        this.showTransactions(body.groupId)
        this.showBalances(body.groupId)
        this.showFinalCalc(body.groupId)
    } 
    render(){
        if(this.state.loggedIn === false){
            return <Redirect to="/" />
        }
        return(
            <div className="main-page">
                <div className="div-1">
                    <div className="logo">
                        <span className="logo-font">Splito</span>
                    </div>
                    <div className="activity">
                        <div className="menu">
                            <span className="menu-font">MENU</span>
                            <div className="field">
                                <div className="icon-1">
                                    <img className="svg-icon" src={group} alt="loading" />
                                    <span className="field-1" onClick={()=>{this.changeType("group")}}>Groups</span>
                                </div>
                                <div className="icon-1">
                                    <img className="svg-icon" src={addFriend} alt="Loading" />
                                    <span className="field-1" onClick={()=>{this.changeType("addFriend")}} >Add Friend</span>
                                </div>
                            </div>
                        </div>
                        <div className="recent-activity">
                            <span className="recent-font">FRIENDS</span>
                            {
                                this.state.friends ? this.state.friends.map((element,index)=>{
                                    return(
                                        <div className="friend__title">
                                            <span className="friend__name">{element.name}</span>
                                        </div>
                                    )
                                })
                                : (
                                    <div>
                                        No Friends
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className="profile">
                        <div className="details">
                            <span className="font-1">{this.state.name ? this.state.name : null}</span>
                            <span className="font-2">{this.state.email ? this.state.email : null}</span>
                            <div className="btn-e">
                                <span className="size-btn">Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div-2">
                    <div className="search">
                        <input 
                            name="searchName"
                            className="search-field"
                            type="text" 
                            placeholder="Enter for search..." 
                            onChange={(e)=>{this.setState({[e.target.name]:e.target.value})}}
                            value={this.state.searchName}
                        />
                    </div>
                    {
                        this.state.type === "group" ? 
                        <CreateGroup 
                            friends = {this.state.friends}
                            submitGroupForm = {this.submitGroupForm}
                            openModal = {this.openModal}
                            isShowing = {this.state.isShowing}
                            closeModal = {this.closeModal}
                            groupName = {this.state.groupName}
                            handleChange = {this.handleChange}
                            selected = {this.state.selected}
                        />
                        : this.state.type === "addFriend" ?
                            <AddFriend 
                                findFriends={this.findFriends}
                            />
                        :
                        <CreateGroup 
                            friends = {this.state.friends}
                            submitGroupForm = {this.submitGroupForm}
                            openModal = {this.openModal}
                            isShowing = {this.state.isShowing}
                            closeModal = {this.closeModal}
                            groupName = {this.state.groupName}
                            handleChange = {this.handleChange}
                            selected = {this.state.selected}
                        />
                    }
                    <GroupList 
                        groupList = {this.state.groups}
                        type = {this.state.type}
                        pendingRequests = {this.state.pendingRequests}
                        acceptRequest={this.acceptRequest}
                        foundFriendList = {this.state.foundFriendList}
                        showFriends = {this.state.showFriends}
                        sendRequest = {this.sendRequest}
                        showGroupInfo = {this.showGroupInfo}
                    />
                </div>
                <div className="div-3">
                    <AddExpense 
                        groupInfo = {this.state.groupInfo}
                        addExpense = {this.addExpense}
                        expenseModal = {this.state.expenseModal}
                        closeExpense={this.closeExpense}
                        friends = {this.state.friends}
                        selected = {this.state.selected}
                        handleChange = {this.handleChange}
                        submitExpenseForm={this.submitExpenseForm}
                    />
                    <ShowBalances 
                        calcData = {this.state.finalCalc}
                    />
                    <div className="transactions">
                        <Transaction 
                            transactionData = {this.state.groupTransaction}
                        /> 
                        <Balance 
                            balances = {this.state.balances}
                        />                   
                    </div>
                </div>
            </div>
        )
    }
}
export default MainPage  
                                