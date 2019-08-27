import * as React from "react";
import {DataSet, Network} from 'vis';
import {SERVER_IP_ADDRESS, VIS_NETWORK_OPTIONS} from "../constants";

export class SitesGraph extends React.Component {

    constructor(props) {
        super(props);
        let url = 'http://' + SERVER_IP_ADDRESS + '/site-graph';
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
            this.network = new Network(this.refs.graph, data, VIS_NETWORK_OPTIONS);
            console.log("network created");
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="row">
                <div ref="graph" className="col-12 container"/>
            </div>
        );
    }
}
