export class Edge {
    fromNode: string;
    toNode: string;
    dist: number;

    constructor(fromNode: string, toNode: string, dist: number) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.dist = dist;
    }
}

export class PathNode {
    name: string;
    // tent_dist: number;
    neighbours: {name: string, edge: Edge}[];
    constructor(name: string) {
        this.name = name;
        // this.tent_dist = Infinity;
        this.neighbours = [];
    }

    addEdge(neighbour: string, dist: number) {
        this.neighbours.push({name: neighbour, edge: new Edge(this.name, neighbour, dist)})
    }

}