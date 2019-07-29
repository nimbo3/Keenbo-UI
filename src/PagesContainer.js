import * as React from "react";
import {Page} from "./Page";
import logo from "./logo.png";

export class PagesContainer extends React.Component {
    constructor(props) {
        super(props);
        let query = props.location.search;

        this.state = {pages: []};
        console.log("sending request to: ", 'http://192.168.123.107:4567/search' + query);
        fetch('http://192.168.123.107:4567/search' + query).then(res => res.json()).then(pages => this.setState({pages}));
    }

    render() {
        let pages = this.state.pages;
        return <div className="mt-5">
            <nav className="navbar bg-dark fixed-top">
                <div className="container-fluid">
                    <form className="w-100 h-75" action="/search" method="GET">
                        <div className="row w-100 align-items-center">
                            <img src={logo} className="img-fluid mr-3 App-logo" alt="logo" style={{"height": "40px"}}/>
                            <input className="col-6 form-control" type="text" name="query"/>
                            <input className="col-2  col-lg-1 ml-3 btn btn-light btn-block" type="submit"
                                   value="Search"/>
                        </div>
                    </form>

                </div>
            </nav>
            <div>
                {pages.map(page => <Page link={page.link} title={page.title}/>)}
            </div>
        </div>
    };
}
