import { queueScheduler } from "rxjs";
import PriorityQueue from "../../../node_modules/ts-priority-queue";
import { PathNode } from "./PathNode";
import { Edge } from "./PathNode";

class Graph {
    nodes: Map<string, PathNode>;
    private buildings: string[];

    constructor() {
        this.nodes = new Map();

        this.buildings = ["MC", "DC", "SLC", "STC", "QNC", "B1", "B2", "E3", "E5", "E7"];
        for (let i = 0; i < this.buildings.length; i++) {
            this.nodes.set(this.buildings[i], new PathNode(this.buildings[i]));
        }
        this.addEdge("MC", "DC", 5);
        this.addEdge("DC", "E3", 2);
        this.addEdge("E3", "E5", 1);
        this.addEdge("E5", "E7", 1);
        this.addEdge("MC", "SLC", 5);
        this.addEdge("MC", "QNC", 3);
        this.addEdge("QNC", "B2", 1);
        this.addEdge("B1", "B2", 1);
        this.addEdge("STC", "B1", 2);
        this.addEdge("STC", "B2", 1);
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
        const queue = new PriorityQueue({ comparator: function(a: {name: string, val: number}, b: {name: string, val: number}) { return a.val - b.val}});
        const distances: Map<string, number> = new Map();
        const previous: Map<string, string | null> = new Map();
        let path = [];
        let smallest: string = "";

        for (let vertex of this.buildings) {
            const dist = (vertex == start) ? 0 : Infinity;
            distances.set(vertex, dist);
            queue.queue({name: vertex, val: dist});
            previous.set(vertex, null);
        }

        while (queue.length) {
            smallest = queue.dequeue().name;
            if (smallest == finish) {
                while(previous.get(smallest)) {
                    path.push(smallest);
                    smallest = previous.get(smallest)!;
                }
                break;
            }
            var smallestDist: number = distances.get(smallest)!;
            if (smallest || smallestDist != Infinity) {
                let smallestNode: PathNode | undefined = this.nodes.get(smallest);
                let neighbours: {name: string, edge: Edge}[] = smallestNode?.neighbours!;
                for (let i = 0; i < neighbours.length; i++) {
                    let neighbour = neighbours[i];
                    let candidate = smallestDist + neighbour.edge.dist;
                    let neighbourName = neighbour.name;

                    if (candidate < distances.get(neighbourName)!) {
                        distances.set(neighbourName, candidate);
                        previous.set(neighbourName, smallest);
                        queue.queue({name: neighbourName, val: candidate});
                    }
                }
            }
        }


        return path.concat(smallest).reverse();
    }
}