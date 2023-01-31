import { PathNode } from "./PathNode";
import { Edge } from "./PathNode";

class Graph {
    private adjacencyList: Map<number, Edge[]> = new Map();

    Graph() {
        this.adjacencyList.set(0, [new Edge(new PathNode(0, "DC"), new PathNode(1, "MC"), 1)]);
    }

    static djikstraAlgorithm(): string[] {
        var unvisitedSet = new Set();

        var path: string[] = ["MC", "DC"];

        return path;
    }
}