"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathNode = exports.Edge = void 0;
var Edge = /** @class */ (function () {
    function Edge(fromNode, toNode, dist) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.dist = dist;
    }
    return Edge;
}());
exports.Edge = Edge;
var PathNode = /** @class */ (function () {
    function PathNode(name) {
        this.name = name;
        // this.tent_dist = Infinity;
        this.neighbours = [];
    }
    PathNode.prototype.addEdge = function (neighbour, dist) {
        this.neighbours.push({ name: neighbour, edge: new Edge(this.name, neighbour, dist) });
    };
    return PathNode;
}());
exports.PathNode = PathNode;
