export class PathNode {
    id: number;
    name: string;
    tent_dist: number;
    neighbours: number[];
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.tent_dist = Infinity;
        this.neighbours = [];
    }
    
}