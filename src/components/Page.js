import React from "react";
import '../App.css';
import {RESULT_CONTENT_SIZE, SERVER_IP_ADDRESS} from "../constants";
import $ from 'jquery';

export class Page extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        let title, link, content;
        ({title, link, content} = this.props.data);
        if (content.length > RESULT_CONTENT_SIZE)
            content = content.substring(0, RESULT_CONTENT_SIZE - 3) + "...";
        return (
            <div className="page container p-1 col-10">
                <h4 className="m-0 text-truncate">
                    <a onClick={this.handleClick} href={link}>{title}</a>
                </h4>
                <a onClick={this.handleClick} className="text-success m-0" href={link}>{link}</a>
                <p dangerouslySetInnerHTML={{__html: content}} className="result-content"/>
            </div>
        );
    }

    handleClick() {
        let token = localStorage.getItem("auth_token");
        let destination = this.props.data.link;
        let url = 'http://' + SERVER_IP_ADDRESS + '/action/click';
        console.log("sending click event to: " + url);
        $.post(url, {destination, token});
    }
}