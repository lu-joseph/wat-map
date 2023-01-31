export class Edge {
    fromNode: PathNode;
    toNode: PathNode;
    dist: number;
    constructor(fromNode: PathNode, toNode: PathNode, dist: number) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.dist = dist;
    }
}

export class PathNode {
    id: number;
    name: string;
    tent_dist: number;
    neighbours: Edge[];
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.tent_dist = Infinity;
        this.neighbours = [];
    }

}