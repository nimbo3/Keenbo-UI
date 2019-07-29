import React from "react";
import './App.css';

export class Page extends React.Component {
    render() {
        let title, link;
        ({title, link} = this.props);
        if (title.length > 50) {
            title = title.substring(0, 47) + "...";
        }

        return (
            <div className="page container p-3 col-10">
                <h4 className="m-0">
                    <a href={link} style={{"word-wrap": "break-word"}}>{title}</a>
                </h4>
                <a className="text-success m-0" href={link}>{link}</a>
            </div>
        );
    }
}