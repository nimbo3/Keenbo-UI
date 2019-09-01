import * as React from "react";
import {DataSet, Network} from 'vis';
import {SERVER_IP_ADDRESS, SITES_GRAPH_VIS_NETWORK_OPTIONS} from "../constants";

export class SitesGraph extends React.Component {

    constructor(props) {
        super(props);
        let options = this.props.location.search;
        let url = 'http://' + SERVER_IP_ADDRESS + '/site-graph' + options;
        console.log("sending request to: ", url);
        fetch(url).then(res => res.json()).then(graph => {
            console.log(graph);
            let graph_nodes = graph.nodes;
            graph_nodes.forEach(node => {
                node.label = node.id
            });
            let data = {
                nodes: new DataSet(graph_nodes),
                edges: new DataSet(graph.edges)
            };
            console.log(data);
            console.log("creating network");
            this.network = new Network(this.refs.graph, data, SITES_GRAPH_VIS_NETWORK_OPTIONS);
            this.network.on("click", SitesGraph.handleClick);
            console.log("network created");
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="row min-vh-100 min-vw-100">
                <div ref="graph" className="col-12 container"/>
            </div>
        );
    }

    static handleClick(inp){
        let url =  inp.nodes[0];
        console.log("redirecting ",url);
        window.location = '/sites-graph?link=' + url;
    }
}
