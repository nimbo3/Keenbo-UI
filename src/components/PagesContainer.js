import * as React from "react";
import {Page} from "./Page";
import logo from "../logo.png";
import SearchForm from "./SearchForm";
import {SERVER_IP_ADDRESS} from "../constants";
import {Auth} from "./Auth";
import * as queryString from "query-string";

export class PagesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pages: [], isLoaded: false};
        let query = this.props.location.search;
        this.getPages = this.getPages.bind(this);
        let url = 'http://' + SERVER_IP_ADDRESS + '/search' + decodeURIComponent(query);
        console.log("sending request to: ", url);
        fetch(url).then(res => res.json()).then(pages => {
            console.log(pages);
            return this.setState({pages, isLoaded: true});
        });
    }

    static getSpinner() {
        return (
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
                <div className="row spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    render() {
        let content = "";
        if (this.state.isLoaded === false)
            content = PagesContainer.getSpinner();
        else
            content = this.getPages();
        let params = queryString.parse(this.props.location.search);
        let mode = params.mode;
        let query = params.query;
        return <div>
            <nav className="navbar bg-dark container-fluid">
                <div className="row w-100">
                    <div className="col-sm col-md col-lg-1">
                        <a href="/">
                            <img src={logo} className="img-fluid mr-3" alt="logo" style={{"height": "40px"}}/>
                        </a>
                    </div>
                    <div className="col-6-lg col-sm col-md">
                        <SearchForm defaultValue={query} small={true} mode={mode}/>
                    </div>
                    <div className="ml-auto">
                        <Auth/>
                    </div>
                </div>
            </nav>
            {content}
        </div>
    };

    getPages() {
        let pages = this.state.pages;
        return (
            <div className="mt-1 col-8 p-1">
                {pages.map((value, index) => <Page key={index} data={value}/>)}
            </div>
        )
    }
}
