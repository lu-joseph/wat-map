import { PathNode } from "./PathNode";

class PathCalculator {
    readonly nodes: PathNode[] = [new PathNode(0, "MC"), new PathNode(1, "DC")];

    PathCalculator() { }

    static djikstraAlgorithm(): string[] {
        var unvisitedSet = new Set();

        var path: string[] = ["MC", "DC"];

        return path;
    }
}