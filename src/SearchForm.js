import React, {Component} from "react";

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);

    }


    submit() {
        let input = document.getElementById("queryInput");
        input.value = encodeURIComponent(input.value);
    }

    render() {
        const {small} = this.props;
        return (
            <form className={small ? "" : "container-fluid"} action="/search" method="GET" onSubmit={this.submit}>
                <div className={small ? "row" : ""}>
                    <input id="queryInput"
                           className={small ? "col-8 form-control rounded-pill d-flex justify-content-center" : "form-control rounded-pill d-flex"}
                           type="text"
                           placeholder="Search Keenbo"
                           name="query"
                           defaultValue={this.props.defaultValue}/>
                    <div className={small ? "col-3" : ""}>
                        <div className={small ? "col-10" : "d-flex justify-content-center mt-5"}>
                            <input className={"btn btn-light ml-2 rounded-pill " + (small?"": "w-25")} type="submit"
                                   value="Search"/>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default SearchForm;
