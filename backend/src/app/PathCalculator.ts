import { PathNode } from "./PathNode";

class PathCalculator {
    const nodes: PathNode[] = [new PathNode(0, "MC"), new PathNode(1, "DC")];

    PathCalculator() {}

    static function djikstraAlgorithm(): string[]  {
        var unvisitedSet = new Set(); 
        
        var path: string[] = ["MC", "DC"];
        
        return path;
    }
}