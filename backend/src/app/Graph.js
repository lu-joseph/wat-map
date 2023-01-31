"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_priority_queue_1 = require("../../../node_modules/ts-priority-queue");
var queue = new ts_priority_queue_1.default({ comparator: function (a, b) { return a - b; } });
queue.queue(5);
queue.queue(3);
queue.queue(2);
var lowest = queue.dequeue(); // returns 5
console.log(lowest);
// class Graph {
//     nodes: Map<string, PathNode>;
//     private buildings: string[];
//     constructor() {
//         this.nodes = new Map();
//         this.buildings = ["MC", "DC", "SLC", "STC", "QNC", "B1", "B2", "E3", "E5", "E7"];
//         for (let i = 0; i < this.buildings.length; i++) {
//             this.nodes.set(this.buildings[i], new PathNode(this.buildings[i]));
//         }
//         this.addEdge("MC", "DC", 5);
//         this.addEdge("DC", "E3", 2);
//         this.addEdge("E3", "E5", 1);
//         this.addEdge("E5", "E7", 1);
//         this.addEdge("MC", "SLC", 5);
//         this.addEdge("MC", "QNC", 3);
//         this.addEdge("QNC", "B2", 1);
//         this.addEdge("B1", "B2", 1);
//         this.addEdge("STC", "B1", 2);
//         this.addEdge("STC", "B2", 1);
//     }
//     addEdge(vertex1: string, vertex2: string, dist: number) {
//         if (!this.nodes.get(vertex1) || !this.nodes.get(vertex2)) {
//             console.log("vertex invalid");
//             return;
//         }
//         this.nodes.get(vertex1)?.addEdge(vertex2, dist);
//         this.nodes.get(vertex2)?.addEdge(vertex1, dist);
//     }
//     djikstraAlgorithm(start: string, finish: string) {
//         const queue = new PriorityQueue({ comparator: function(a: {name: string, val: number}, b: {name: string, val: number}) { return a.val - b.val}});
//         const distances: Map<string, number> = new Map();
//         const previous: Map<string, string | null> = new Map();
//         let path = [];
//         let smallest;
//         for (let vertex of this.buildings) {
//             distances.set(vertex, (vertex == start) ? 0 : Infinity);
//             queue.add(vertex);
//             previous.set(vertex, null);
//         }
//         while (!queue.empty) {
//             smallest = queue.
//         }
//         // return path;
//     }
// }
