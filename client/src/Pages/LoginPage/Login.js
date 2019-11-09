import React from 'react'
import axios from 'axios'
import './LoginStyle.css'
import leftImg from '../../images/illreg1.jpg'
import { Redirect, withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null){
            loggedIn = false
        } 
        this.state = {
            loggedIn
        }
    }
    handleChange = (e)=>{
        this.setState({
            [e.target.type]: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const body = {
            email_id: this.state.email,
            password: this.state.password
        }
        axios.post("/login",body)
        .then(res=>{
            console.log(res)
            if(res && res.data && res.data.token){
                localStorage.setItem('token',res.data.token.token)
                this.setState({
                    loggedIn:true,
                    data: res.data
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        if(this.state.loggedIn == true){
            return <Redirect 
                to={{
                    pathname: "/payment",
                    state: this.state.data
                }}
            />
        }
        return(
            <div className="inner-box">
                <div className="left">
                </div>
                <div className="right">
                    <img src={leftImg} alt="Loading"/>
                </div>
                <div className="login-form">
                    <div className="form">
                        <div className="form-ele-1">
                            <span className="login-font">Login</span>
                        </div>
                        <div className="form-ele-2">
                            <span className="welcome-font">Welcome back. Please login to your account</span>
                        </div>
                        <div className="form-ele-3">
                            <input required onChange={this.handleChange} className="email" type="email" value={this.state.email} placeholder="Email" />
                        </div>
                        <div className="form-ele-4">
                            <input required onChange={this.handleChange} className="password" type="password" value={this.state.password} placeholder="Password" />
                        </div>
                        <div className="form-ele-5">
                            <span><a className="forgot-password"href="#">Forgot your password?</a></span>
                        </div>
                        <div className="form-ele-6">
                            <a onClick={this.onSubmit} className="btn btn-color" href="#">Login</a>
                        </div>
                        <div className="form-ele-7">
                            <span>Don't have an account?
                            <a onClick={this.handleLoader} className="reg-a" href="/register">  Sign Up</a></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login