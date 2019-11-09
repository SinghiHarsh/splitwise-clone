import React from 'react';
import "./expense.css";
import downArrow from '../../images/down-chevron.svg';
import Select from '../Select/Select';
// import Select from '../Select/Select';

class AddExpense extends React.Component {
    constructor(props){
        super(props)
            this.state = {
                isOpen1: false,
                isOpen2: false,
                splitBetween:[],
                paidBy:""
            }
        }
    showDropDown1 = (e)=>{
        console.log("hello")
        if(this.state.isOpen1){
            this.setState({
                isOpen1: false
            })
        }
        else {
            this.setState({
                isOpen1: true
            })
        }
    }
    showDropDown2 = (e)=>{
        console.log("hello1")
        if(this.state.isOpen2){
            this.setState({
                isOpen2: false
            })
        }
        else {
            this.setState({
                isOpen2: true
            })
        }
    }
    getUserId1 = (e) => {
        this.props.groupInfo.groupMembers.map((element,index)=>{
            if(e.target.id == element._id){
                this.setState({
                    paidBy: element.name
                })
            } 
        })
    }
    getUserId2 = (e) => {
        this.props.groupInfo.groupMembers.map((element,index)=>{
            if(e.target.id == element._id){
                if(!this.state.splitBetween.includes(element.name)){
                    this.setState({
                        splitBetween: [...this.state.splitBetween, element.name]
                    })
                }
            } 
        })
    }
    removeUser = (name) => {
        this.setState({
            splitBetween: this.state.splitBetween.filter((i,index)=>{
                return i !== name;
            })
        })
    }
    removeUser1 = (name) => {
        this.setState({
            paidBy: ""
        })
    }
    render(){
        console.log(this.props)
        return(
            <div className="top-buttons">
                <div className="add-expense">
                    <a href="#" className="add-exp" onClick={()=>{this.props.addExpense()}}>Add Expense</a>
                </div>
                <div className="popup"
                    style={{
                        display: this.props.expenseModal ? 'flex': 'none'
                    }}
                >
                {
                    this.props.groupInfo ? (
                        <div className="popup-content"
                        style={{
                            display: this.props.expenseModal ? 'flex': 'none'
                        }}
                    >
                        <form className="create-group-data">
                            <div className="form-group-1">
                                <span className="font-group-1">Add Expense</span>
                                <span className="font-group-2">{this.props.groupInfo.groupName}</span>
                            </div>
                            <div className="form-group-2">
                                <input type="text" placeholder="Description" name="description" onChange={(e)=>{this.props.handleChange(e)}} 
                                    className="group-name"
                                    value= {this.props.description}
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
                                        this.state.paidBy  ?
                                            (
                                                <div className="label-wrapper">
                                                    <span className="inv-label">{this.state.paidBy}</span>
                                                    <svg className="cross-icon" onClick={()=>{this.removeUser1(this.state.paidBy)}}>
                                                        <path className="color" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path>
                                                    </svg>
                                                </div>
                                            )
                                        :(
                                            <div className="not-selected">No Friends selected</div>
                                        )
                                    }
                                </div>
                                <img className="dropdown-icon" onClick={this.showDropDown1} src={downArrow} />    
                            </div>
                                <Select                                   
                                    options={this.props.groupInfo.groupMembers}
                                    open={this.state.isOpen1} 
                                    getUserId={this.getUserId1}                               
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
                                            this.state.splitBetween && this.state.splitBetween.length > 0 ?
                                            this.state.splitBetween.map((element,index)=>{
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
                                    <img className="dropdown-icon" onClick={this.showDropDown2} src={downArrow} />    
                                </div>
                                <Select 
                                    options={this.props.groupInfo.groupMembers}                                    
                                    open={this.state.isOpen2}  
                                    getUserId={this.getUserId2}                              
                                />
                            </div>
                            <div className="form-group-2">
                                <input type="number" placeholder="Paid Amount" name="amount" onChange={(e)=>{this.props.handleChange(e)}} 
                                    className="group-name"
                                    value= {this.props.amount}
                                />
                            </div>
                            <div className="form-group-4">
                                <div className="close-btn">
                                    <a onClick={()=>{this.props.closeExpense()}} href="#" className="close-btn-disp">Close</a>
                                </div>
                                <div className="submit-btn">
                                    <a href="#" className="submit-btn-disp" onClick={()=>{this.props.submitExpenseForm(this.state.paidBy, this.state.splitBetween)}}>Submit</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    )
                    :
                    (
                        <div className="popup-content"
                        style={{
                            display: this.props.expenseModal ? 'flex': 'none'
                        }}
                    >
                        <form className="create-group-data">
                            <div className="form-group-1">
                                <span className="font-group-1">No Group selected</span>
                            </div>
                            <div className="form-group-4">
                                <div className="submit-btn">
                                    <a onClick={()=>{this.props.closeExpense()}} href="#" className="submit-btn-disp">Close</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    )
                }
            </div>
        </div>
        )
    }
}
export default AddExpense;
/*
<div className="add-payment">
                    <a href="#" className="add-pay">Add payment</a>
                </div>
*/