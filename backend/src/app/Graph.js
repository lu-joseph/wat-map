"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
var ts_priority_queue_1 = require("../../../node_modules/ts-priority-queue");
var PathNode_1 = require("./PathNode");
var Graph = /** @class */ (function () {
    function Graph() {
        this.nodes = new Map();
        for (var i = 0; i < Graph.buildings.length; i++) {
            this.nodes.set(Graph.buildings[i], new PathNode_1.PathNode(Graph.buildings[i]));
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
    Graph.prototype.addEdge = function (vertex1, vertex2, dist) {
        var _a, _b;
        if (!this.nodes.get(vertex1) || !this.nodes.get(vertex2)) {
            console.log("vertex invalid");
            return;
        }
        (_a = this.nodes.get(vertex1)) === null || _a === void 0 ? void 0 : _a.addEdge(vertex2, dist);
        (_b = this.nodes.get(vertex2)) === null || _b === void 0 ? void 0 : _b.addEdge(vertex1, dist);
    };
    Graph.prototype.djikstraAlgorithm = function (start, finish) {
        var queue = new ts_priority_queue_1.default({ comparator: function (a, b) { return a.val - b.val; } });
        var distances = new Map();
        var previous = new Map();
        var path = [];
        var smallest = "";
        for (var _i = 0, _a = Graph.buildings; _i < _a.length; _i++) {
            var vertex = _a[_i];
            var dist = (vertex == start) ? 0 : Infinity;
            distances.set(vertex, dist);
            queue.queue({ name: vertex, val: dist });
            previous.set(vertex, null);
        }
        while (queue.length) {
            smallest = queue.dequeue().name;
            if (smallest == finish) {
                while (previous.get(smallest)) {
                    path.push(smallest);
                    smallest = previous.get(smallest);
                }
                break;
            }
            var smallestDist = distances.get(smallest);
            if (smallest || smallestDist != Infinity) {
                var smallestNode = this.nodes.get(smallest);
                var neighbours = smallestNode === null || smallestNode === void 0 ? void 0 : smallestNode.neighbours;
                for (var i = 0; i < neighbours.length; i++) {
                    var neighbour = neighbours[i];
                    var candidate = smallestDist + neighbour.edge.dist;
                    var neighbourName = neighbour.name;
                    if (candidate < distances.get(neighbourName)) {
                        distances.set(neighbourName, candidate);
                        previous.set(neighbourName, smallest);
                        queue.queue({ name: neighbourName, val: candidate });
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    };
    Graph.buildings = ["PAC", "NH", "MC", "M3", "DC", "SLC", "STC", "QNC", "EIT", "ESC",
        "C2", "B1", "B2", "PHY", "CPH", "DWE", "E2", "E3", "E5", "E6", "E7"];
    return Graph;
}());
exports.Graph = Graph;
// var graph: Graph = new Graph();
// var path: string[] = graph.djikstraAlgorithm("DWE", "PAC");
// for (let node of path) {
//     console.log(node);
// }
