import React from "react";
import "bootstrap"
import {SERVER_IP_ADDRESS} from "../constants";
import $ from 'jquery';
import logo from '../logo.ico'

export class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.registerModal = this.registerModal.bind(this);
        this.loginModal = this.loginModal.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.renderNotLoggedIn = this.renderNotLoggedIn.bind(this);
        this.handleLogout = this.handleLogout.bind(this);

        let loggedIn = localStorage.getItem("auth_token") != null;
        this.state = {
            "loginErrors": "",
            "registerErrors": "",
            loggedIn
        }
    }

    render() {
        let loggedIn = this.state.loggedIn;
        if (loggedIn)
            return this.renderLoggedIn();
        else
            return this.renderNotLoggedIn();
    }

    renderNotLoggedIn() {
        let registerModal = this.registerModal();
        let loginModal = this.loginModal();
        let modals = (<div>
            {registerModal}
            {loginModal}
        </div>);
        return (
            <div className="">
                {modals}
                <button type="button"
                        className="mr-1 btn btn-primary rounded-pill"
                        data-toggle="modal"
                        data-target="#registerModal">
                    Register
                </button>
                <button type="button"
                        className="btn btn-primary rounded-pill"
                        data-toggle="modal"
                        data-target="#loginModal">
                    Login
                </button>
            </div>
        );
    }

    registerModal() {
        let errors = this.state.registerErrors;
        return (
            <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog"
                 aria-labelledby="registerModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                        }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="registerModalLabel">Register</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="text-left">
                                        <ul className="text-danger">
                                            {errors === "" ? "" :
                                                errors.split("\n").map((x, index) =>
                                                    <li key={index}>{x}</li>)
                                            }
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <input type="text" placeholder="Name" name="name" id="registerName"
                                               className="form-control rounded-pill"/>
                                    </div>
                                    <div className="row">
                                        <input type="text" placeholder="Username" name="username" id="registerUsername"
                                               className="form-control rounded-pill"/>
                                    </div>
                                    <div className="row">
                                        <input type="password" placeholder="Password" name="password"
                                               id="registerPassword"
                                               className="form-control rounded-pill"/>
                                    </div>
                                    <div className="row">
                                        <input type="password" placeholder="Confirm password" name="re_password"
                                               id="registerRePassword" className="form-control rounded-pill"/>
                                    </div>
                                    <div className="row">
                                        <input type="email" placeholder="Email" name="email" id="registerMail"
                                               className="form-control rounded-pill"/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary"
                                        onClick={this.handleRegister}>Register
                                </button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }

    loginModal() {
        let errors = this.state.loginErrors;
        return (
            <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog"
                 aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="text-left">
                                        <ul className="text-danger">
                                            {errors === "" ? "" :
                                                errors.split("\n").map((x, index) =>
                                                    <li key={index}>{x}</li>)
                                            }
                                        </ul>
                                    </div>
                                    <div className="row">
                                        <input type="text" placeholder="Username" name="username" id="loginUsername"
                                               className="form-control rounded-pill"/>
                                    </div>
                                    <div className="row">
                                        <input type="password" placeholder="Password" name="password" id="loginPassword"
                                               className="form-control rounded-pill"/>
                                    </div>

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={this.handleLogin}>Login</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    handleRegister() {
        let name = document.getElementById("registerName").value;
        let username = document.getElementById("registerUsername").value;
        let password = document.getElementById("registerPassword").value;
        let re_password = document.getElementById("registerRePassword").value;
        let email = document.getElementById("registerMail").value;
        let data = {name, username, password, re_password, email};
        let url = "http://" + SERVER_IP_ADDRESS + '/auth/register';
        console.log("sending request to " + url);
        $.post(url, data).done(response => {
            console.log(typeof response);
            console.log(response);
            if (response.success) {
                localStorage.setItem("auth_token", response.data.token);
                localStorage.setItem("auth_name", response.data.name);
                localStorage.setItem("auth_username", response.data.username);
                $('#registerModal').modal('hide');
                this.setState({
                    loggedIn: true
                });
            } else {
                this.setState({
                    "registerErrors": response.message
                })
            }
        })
    }

    handleLogin() {
        let username = document.getElementById("loginUsername").value;
        let password = document.getElementById("loginPassword").value;
        let data = {username, password,};
        let url = "http://" + SERVER_IP_ADDRESS + '/auth/login';
        console.log("sending request to " + url);
        $.post(url, data).done(response => {
            console.log(typeof response);
            console.log(response);
            if (response.success) {
                localStorage.setItem("auth_token", response.data.token);
                localStorage.setItem("auth_name", response.data.name);
                localStorage.setItem("auth_username", response.data.username);
                $('#loginModal').modal('hide');
                this.setState({
                    loggedIn: true
                });

            } else {
                this.setState({
                    "loginErrors": response.message
                })
            }
        })
    }

    renderLoggedIn() {
        return (
            <div className="">
                <div className="dropdown">
                    <div className="btn-group">
                        <img className="icon dropdown-toggle"
                             role="button"
                             style={{
                                 height: 40,
                                 cursor: "pointer",
                                 filter: "invert(100%)"
                             }}
                             src={logo}
                             alt="Failed to load"
                             data-toggle="dropdown"
                             data-display="static"
                             aria-haspopup="true"
                             aria-expanded="false"/>
                        <div className="dropdown-menu dropdown-menu-lg-right">
                            <div className="text-muted container-fluid">
                                <div>
                                    <span>Signed in as </span>
                                    <b>{localStorage.getItem("auth_name")}</b>
                                </div>
                            </div>
                            <button className="dropdown-item" type="button">Profile</button>
                            <button className="dropdown-item" onClick={this.handleLogout} type="button">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleLogout() {
        localStorage.clear();
        this.setState({
            loggedIn: false
        })
    }
}