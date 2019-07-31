import * as React from "react";
import {Page} from "./Page";
import logo from "./logo.png";

export class PagesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pages: [], isLoaded: false};
        let query = this.props.location.search;
        let url = 'http://5.9.147.141:4567/search' + query;
        console.log("sending request to: ", url);
        fetch(url).then(res => res.json()).then(pages => {
            console.log(pages);
            return this.setState({pages, isLoaded: true});
        });

    }

    render() {
        let query = this.props.location.search;
        if (query.length > 7)
            query = query.substring(7);

        let spinner = "";
        if (this.state.isLoaded === false)
            spinner =
                <div className="min-vh-100 d-flex justify-content-center align-items-center">
                    <div className="row spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>;


        let pages = this.state.pages;
        return <div>
            <nav className="navbar bg-dark fixed-top">
                <div className="container-fluid">
                    <form className="w-100 h-75" action="/search" method="GET">
                        <div className="row w-100 align-items-center">
                            <img src={logo} className="img-fluid mr-3 App-logo" alt="logo" style={{"height": "40px"}}/>
                            <input defaultValue={query} className="col-6 form-control" type="text" name="query"/>
                            <input className="col-2  col-lg-1 ml-3 btn btn-light btn-block" type="submit"
                                   value="Search"/>
                        </div>
                    </form>
                </div>
            </nav>
            {spinner}
            <div className="mt-5">
                {pages.map(page => <Page link={page.link} title={page.title}/>)}
            </div>

        </div>
    };
}
