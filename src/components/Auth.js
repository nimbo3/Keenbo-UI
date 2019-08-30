import React from "react";

export class Auth extends React.Component {
    render() {
        let loggedIn = false;

        return (
            <div className="">
                <button className="mr-1 btn btn-light rounded-pill">Register</button>
                <button className="btn btn-light rounded-pill">Login</button>
            </div>
        );
    }
}