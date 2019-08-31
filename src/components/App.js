import React from 'react';
import logo from '../logo.png';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from "./SearchForm";
import {Auth} from "./Auth";

function App() {
    return (
        <div className="App">
            <nav className="navbar bg-dark">
                <a href="sites-graph" className="btn btn-primary rounded-pill">Sites graph</a>
                <a href="words-graph" className="ml-1 btn btn-primary rounded-pill">Words graph</a>
                <div className="ml-auto">
                    <Auth/>
                </div>
            </nav>
            <header className="App-header">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <img src={logo} className="p-4 col-5 App-logo" alt="logo"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="col-8">
                            <SearchForm small={false}/>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default App;
