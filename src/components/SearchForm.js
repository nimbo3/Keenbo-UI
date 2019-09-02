import React, {Component} from "react";

class SearchForm extends Component {
    const
    SEARCH_MODES = ["Simple", "Fuzzy", "Exact"]

    constructor(props) {
        super(props);
        this.state = {
            searchMode: 0
        }
        this.submit = this.submit.bind(this);
        this.searchInput = this.searchInput.bind(this);
        this.handleChangeSearchMode = this.handleChangeSearchMode.bind(this)
    }


    submit() {
        let input = document.getElementById("queryInput");
        input.value = encodeURIComponent(input.value);
    }

    render() {
        const {small} = this.props;
        return (
            <form className={small ? "" : "container-fluid"} action={"/search"} method="GET" onSubmit={this.submit}>
                <div className={small ? "row" : ""}>
                    {this.searchInput()}
                    <div className={small ? "col-3" : ""}>
                        <div className={small ? "col-10" : "d-flex justify-content-center mt-5"}>
                            <input className={"btn btn-light ml-2 rounded-pill " + (small ? "" : "w-25")} type="submit"
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
        return <div className={small?"col-9":""}>
            <div className="input-group">
                <div className="input-group-prepend ">
                    <div className="input-group-text dropdown dropdown-toggle"
                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                         style={{
                             borderRadius: "2.25rem 0% 0% 2.25rem",
                             cursor: "pointer"
                         }}>
                        {this.SEARCH_MODES[searchMode]}
                    </div>
                    <div className="dropdown-menu">
                        {
                            this.SEARCH_MODES.map((value, index) =>
                                <button className={"dropdown-item " + (searchMode === index ? "active" : "")}
                                        onClick={() => this.handleChangeSearchMode(index)}
                                        key={index  }
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
        this.setState({searchMode})
    }
}

export default SearchForm;
