import React from 'react';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className="container col-7">
                    <form action="/search" method="GET">
                        <img src={logo} className="p-4 col-7 App-logo" alt="logo"/>
                        <input className="Query-input form-control p-4 rounded w-75 container" type="text"
                               placeholder="Search Keenbo"
                               name="query"/>
                        <div className="d-flex justify-content-between container w-auto p-4">
                            <input className="btn btn-light btn-lg btn-block w-50 container" type="submit"
                                   value="Search"/>
                        </div>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default App;
