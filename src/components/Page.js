import React from "react";
import '../App.css';

export class Page extends React.Component {
    render() {
        let title, link, content;
        ({title, link, content} = this.props.data);
        return (
            <div className="page container p-3 col-10">
                <h4 className="m-0 text-truncate">
                    <a href={link}>{title}</a>
                </h4>
                <a className="text-success m-0" href={link}>{link}</a>
                <p dangerouslySetInnerHTML={{__html: content}} class="result-content"/>
            </div>
        );
    }
}