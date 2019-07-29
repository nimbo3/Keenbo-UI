import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import App from "./App";
import {PagesContainer} from "./PagesContainer";

function NotFound() {
    return (<div>
            404 NOT FOUND
        </div>
    )
}

export function Router() {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" exact component={App}/>
                    <Route path="/search" component={PagesContainer}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
