export const initialNodes = [
    {
        id: "1",
        type: "circleNode",
        data: { label: "Request PTO", handles: [0, 1] }
    },

    {
        id: "2",
        type: "circleNode",
        data: { label: "manager reviews data", handles: [1, 0] }
    },
    {
        id: "3",
        type: "circleNode",
        data: { label: "Pending manager approval", handles: [1, 0] }
    },
    {
        id: "4",
        type: "circleNode",
        data: { label: "PTO request approved" , handles: [1, 0]}
    },
    {
        id: "5",
        type: "circleNode",
        data: { label: "PTO request denied", handles: [1, 0] }
    },
    {
        id: "6",
        type: "circleNode",
        data: { label: "Notify teammate1", handles: [1, 0] }
    },
    {
        id: "7",
        type: "circleNode",
        data: { label: "Notify teammate2" , handles: [1, 0]}
    },
    {
        id: "8",
        type: "circleNode",
        data: { label: "End", handles: [1, 0] }
    }
];

export const initialEdges = [
    {
        id: "e1-2",
        source: "1",
        target: "2"
    },
    {
        id: "e2-3",
        source: "2",
        target: "3"
    },
    {
        id: "e3-4",
        source: "3",
        target: "4"
    },
    {
        id: "e3-5",
        source: "3",
        target: "5"
    },
    {
        id: "e4-6",
        source: "4",
        target: "6"
    },
    {
        id: "e5-7",
        source: "5",
        target: "7"
    },
    {
        id: "e6-8",
        source: "6",
        target: "8"
    },
    {
        id: "e7-8",
        source: "7",
        target: "8"
    }
];
