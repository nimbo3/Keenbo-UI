import React from "react";
import '../App.css';
import {RESULT_CONTENT_SIZE} from "../constants";

export class Page extends React.Component {
    render() {
        let title, link, content;
        ({title, link, content} = this.props.data);
        if (content.length > RESULT_CONTENT_SIZE)
            content = content.substring(0, RESULT_CONTENT_SIZE - 3) + "...";
        console.log("content");
        return (
            <div className="page container p-1 col-10">
                <h4 className="m-0 text-truncate">
                    <a href={link}>{title}</a>
                </h4>
                <a className="text-success m-0" href={link}>{link}</a>
                <p dangerouslySetInnerHTML={{__html: content}} class="result-content"/>
            </div>
        );
    }
}