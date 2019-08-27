import {BrowserRouter, Route, Switch} from "react-router-dom";
import React from "react";
import App from "./App";
import {PagesContainer} from "./PagesContainer";
import {SitesGraph} from "./SitesGraph";

function NotFound() {
    return (<div>
            404 NOT FOUND
        </div>
    )
}

export function Router() {
    return (
        <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={App}/>
                    <Route path="/search" component={PagesContainer}/>
                    <Route path="/sites-graph" component={SitesGraph}/>
                    <Route component={NotFound}/>
                </Switch>
        </BrowserRouter>
    );
}
