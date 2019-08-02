import React from 'react';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from "./SearchForm";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <img src={logo} className="p-4 col-6 App-logo" alt="logo"/>
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
