import * as React from "react";
import {Page} from "./Page";
import logo from "./logo.png";
import SearchForm from "./SearchForm";

export class PagesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pages: [], isLoaded: false};
        let query = this.props.location.search;
        let url = 'http://5.9.147.141:4567/search' + decodeURIComponent(query);
        console.log("sending request to: ", url);
        fetch(url).then(res => res.json()).then(pages => {
            console.log(pages);
            return this.setState({pages, isLoaded: true});
        });
    }

    render() {
        let query = this.props.location.search;
        if (query.length >= 7)
            query = query.substring(7);
        query = decodeURIComponent(query);
        query = decodeURIComponent(query);
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
            <nav className="navbar bg-dark fixed-top container-fluid">
                <div className="row min-vw-100 ml-3">
                    <div className="col-auto">
                        <img src={logo} className="img-fluid mr-3" alt="logo" style={{"height": "40px"}}/>
                    </div>
                    <div className="col-9">
                        <SearchForm defaultValue={query} small={true}/>
                    </div>
                </div>
            </nav>
            {spinner}
            <div className="mt-5">
                {pages.map(page => <Page link={page.link} title={page.title}/>)}
            </div>

        </div>
    };
}
