import React, {Component} from "react";
import {SEARCH_MODES} from "../constants";
import * as queryString from "query-string";

class SearchForm extends Component {
    constructor(props) {
        super(props);
        let mode = queryString.parse(window.location.search).mode;
        if (!mode)
            mode = "0";
        this.state = {
            searchMode: parseInt(mode)
        };
        SearchForm.submit = SearchForm.submit.bind(this);
        this.searchInput = this.searchInput.bind(this);
        this.handleChangeSearchMode = this.handleChangeSearchMode.bind(this)
    }


    static submit(e) {
        e.preventDefault();
        let input = document.getElementById("queryInput");
        let params = queryString.parse(window.location.search);
        params.query = input.value;
        let url = "/search?" + queryString.stringify(params);
        console.log("url: " + url);
        window.location = url;
    }

    render() {
        const {small} = this.props;
        let searchInput = this.searchInput();
        return (
            <form className={small ? "" : "container-fluid"} action={"/search"} method="GET"
                  onSubmit={SearchForm.submit}>
                <div className={small ? "row" : ""}>
                    {searchInput}
                    <div className={small ? "col-3" : ""}>
                        <div className={small ? "col-10" : "d-flex justify-content-center mt-5"}>
                            <input className={"btn btn-light ml-2 rounded-pill " + (small ? "" : "col-lg-4 col-auto")} type="submit"
                                   value="Search"/>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

    searchInput() {
        let searchMode = this.state.searchMode;
        const {small} = this.props;
        return <div className={small ? "col-sm col-md col-lg-6" : ""}>
            <div className="input-group">
                <div className="input-group-prepend ">
                    <div className="input-group-text dropdown dropdown-toggle"
                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                         style={{
                             borderRadius: "2.25rem 0% 0% 2.25rem",
                             cursor: "pointer"
                         }}>
                        {SEARCH_MODES[searchMode]}
                    </div>
                    <div className="dropdown-menu">
                        {
                            SEARCH_MODES.map((value, index) =>
                                <button className={"dropdown-item " + (searchMode === index ? "active" : "")}
                                        onClick={() => this.handleChangeSearchMode(index)}
                                        key={index}
                                        type="button">{value}
                                </button>)
                        }
                    </div>
                </div>
                <input id="queryInput"
                       style={{borderRadius: "0% 2.25rem 2.25rem 0%"}}
                       className={(small ? "form-control d-flex justify-content-center" : "form-control d-flex")}
                       type="text"
                       placeholder="Search Keenbo"
                       name="query"
                       defaultValue={this.props.defaultValue}/>
            </div>
        </div>
    }

    handleChangeSearchMode(searchMode) {
        let params = queryString.parse(window.location.search);
        params.mode = searchMode;
        let url = (this.props.small ? "/search?" : "?") + queryString.stringify(params);
        console.log("url: " + url);
        window.location = url;
    }
}

export default SearchForm;
