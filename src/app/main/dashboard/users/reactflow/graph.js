import ELK from "elkjs";


const elk = new ELK();
const elkLayout = (nodes,edges) => {
    const nodesForElk = nodes.map((node) => {
        return {
            id: node.id,
            width: node.type === "rectangleNode" ? 70 : 300,
            height: node.type === "rhombusNode" ? 70 : 300
        };
    });
    const graph = {
        id: "root",
        layoutOptions: {
            "elk.algorithm": "layered",
            "elk.direction": "DOWN",
            "nodePlacement.strategy": "SIMPLE"
        },

        children: nodesForElk,
        edges: edges
    };
    return elk.layout(graph);
};

export default elkLayout;
