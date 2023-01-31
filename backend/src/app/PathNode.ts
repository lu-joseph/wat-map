class Edge {
    destNode: PathNode;
    dist: number;
    constructor(destNode: PathNode, dist: number) {
        this.destNode = destNode;
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