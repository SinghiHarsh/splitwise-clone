import React from 'react'
// import {Link} from 'react-router-dom';
import './RegisterStyle.css'
import rightImg from '../../images/reg.jpg'
import Axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom';

class Register extends React.Component {
    state = {
        username: "",
        name: "",
        phonenumber:"",
        email:"",
        password:"",
        isRegister:false
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = () =>{
        const body = {
            username: this.state.username,
            name: this.state.name,
            mobile_number: this.state.phonenumber,
            email_id: this.state.email,
            password:this.state.password
        }
        Axios.post("/register",body)
        .then(res=>{
            this.setState({
                isRegister: true
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        if(this.state.isRegister == true){
            return <Redirect 
            to={{
                pathname: "/"
            }}
        />
        }
      return (
        <div>
          <div className="main-layout">
            <div className="left-layout"></div>
            <div className="right-layout">
                <img src={rightImg} alt="Loading"/>
            </div>
            <div className="register-form">
                    <div className="reg-form">
                        <div className="form-element-1">
                            <span className="register-font">Register</span>
                        </div>
                        <div className="form-element-2">
                            <span className="font">Welcome back. Please login to your account</span>
                        </div>
                        <div className="form-element-3">
                            <input required className="username" value={this.state.username} onChange={this.handleChange} type="text" name="username" placeholder="Username" />
                        </div>
                        <div className="form-element-4">
                            <input required className="name" value={this.state.name} onChange={this.handleChange} type="text" name="name" placeholder="Name" />
                        </div>
                        <div className="form-element-5">
                            <input required className="phone-number" value ={this.state.phonenumber} onChange={this.handleChange} type="text" name="phonenumber" placeholder="Phone" />
                        </div>
                        <div className="form-element-6">
                            <input required className="email-id" value={this.state.email} onChange={this.handleChange} type="email" name="email" placeholder="Email" />
                        </div>
                        <div className="form-element-7">
                            <input required className="password-reg" value={this.state.password} onChange={this.handleChange} type="password" name="password" placeholder="Password" />
                        </div>
                        <div className="form-element-8">
                            <a onClick={this.handleClick} className="btn btn-color" href="#">Register</a>
                        </div>
                        <div className="form-element-9">
                            <span>Already have an account?
                                <a href="/" className="reg-link">  Sign In</a></span>
                        </div>
                    </div>
                </div>
          </div>
        </div>
      )
    }
}
export default Register