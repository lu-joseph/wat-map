import PriorityQueue from "../../../node_modules/ts-priority-queue";
import { PathNode } from "./PathNode";
import { Edge } from "./PathNode";

export class Graph {
    nodes: Map<string, PathNode>;
    private buildings: string[];

    constructor() {
        this.nodes = new Map();

        this.buildings = ["PAC", "NH", "MC", "M3", "DC", "SLC", "STC", "QNC", "EIT", "ESC",
            "C2", "B1", "B2", "PHY", "CPH", "DWE", "E2", "E3", "E5", "E6", "E7"];
        for (let i = 0; i < this.buildings.length; i++) {
            this.nodes.set(this.buildings[i], new PathNode(this.buildings[i]));
        }
        this.addEdge("E6", "E7", 2);
        this.addEdge("E7", "E5", 1);
        this.addEdge("E5", "E3", 3);
        this.addEdge("E3", "E2", 1);
        this.addEdge("E2", "CPH", 1);
        this.addEdge("CPH", "DWE", 1);
        this.addEdge("E2", "DWE", 1);
        this.addEdge("E2", "PHY", 1);
        this.addEdge("EIT", "PHY", 1);
        this.addEdge("EIT", "E3", 2);
        this.addEdge("EIT", "ESC", 1);
        this.addEdge("B1", "ESC", 1);
        this.addEdge("C2", "ESC", 1);
        this.addEdge("C2", "DC", 2);
        this.addEdge("B1", "B2", 1);
        this.addEdge("STC", "B1", 1);
        this.addEdge("STC", "B2", 1);
        this.addEdge("STC", "NH", 3);
        this.addEdge("QNC", "B2", 1);
        this.addEdge("QNC", "MC", 2);
        this.addEdge("MC", "DC", 3);
        this.addEdge("MC", "M3", 2);
        this.addEdge("MC", "SLC", 2);
        this.addEdge("PAC", "SLC", 1);
        this.addEdge("DC", "E3", 2);

    }

    addEdge(vertex1: string, vertex2: string, dist: number) {
        if (!this.nodes.get(vertex1) || !this.nodes.get(vertex2)) {
            console.log("vertex invalid");
            return;
        }
        this.nodes.get(vertex1)?.addEdge(vertex2, dist);
        this.nodes.get(vertex2)?.addEdge(vertex1, dist);
    }

    djikstraAlgorithm(start: string, finish: string): string[] {
        const queue = new PriorityQueue({ comparator: function (a: { name: string, val: number }, b: { name: string, val: number }) { return a.val - b.val } });
        const distances: Map<string, number> = new Map();
        const previous: Map<string, string | null> = new Map();
        let path = [];
        let smallest: string = "";

        for (let vertex of this.buildings) {
            const dist = (vertex == start) ? 0 : Infinity;
            distances.set(vertex, dist);
            queue.queue({ name: vertex, val: dist });
            previous.set(vertex, null);
        }

        while (queue.length) {
            smallest = queue.dequeue().name;
            if (smallest == finish) {
                while (previous.get(smallest)) {
                    path.push(smallest);
                    smallest = previous.get(smallest)!;
                }
                break;
            }
            var smallestDist: number = distances.get(smallest)!;
            if (smallest || smallestDist != Infinity) {
                let smallestNode: PathNode | undefined = this.nodes.get(smallest);
                let neighbours: { name: string, edge: Edge }[] = smallestNode?.neighbours!;
                for (let i = 0; i < neighbours.length; i++) {
                    let neighbour = neighbours[i];
                    let candidate = smallestDist + neighbour.edge.dist;
                    let neighbourName = neighbour.name;

                    if (candidate < distances.get(neighbourName)!) {
                        distances.set(neighbourName, candidate);
                        previous.set(neighbourName, smallest);
                        queue.queue({ name: neighbourName, val: candidate });
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

// var graph: Graph = new Graph();
// var path: string[] = graph.djikstraAlgorithm("DWE", "PAC");
// for (let node of path) {
//     console.log(node);
// }