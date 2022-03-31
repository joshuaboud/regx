export default class DiGraph {
	constructor() {
		this.adjList = new Map();
	}
	addVertex(obj) {
		this.adjList.set(obj, {next: new Set(), prev: new Set()});
	}
	removeVertex(obj) {
		this.adjList.get(obj).next.map(nextVertex => this.removeEdge(obj, nextVertex));
		this.adjList.get(obj).prev.map(prevVertex => this.removeEdge(prevVertex, obj));
		this.adjList.delete(obj);
	}
	addEdge(from, to) {
		this.adjList.get(from).next.push(to);
		this.adjList.get(to).prev.push(from);
	}
	removeEdge(from, to) {
		this.adjList.get(from).next.delete(to);
		this.adjList.get(to).prev.delete(from);
	}
	getNextVerticies(obj) {
		return this.adjList.get(obj).next;
	}
	getPrevVerticies(obj) {
		return this.adjList.get(obj).prev;
	}
	dumpString() {
		let result = "";
		for (const obj of this.adjList) {
			const adj = this.adjList.get(obj);
			result += `${obj.toString()} => ${adj.next.map(obj => obj.toString()).join(" ")}\n`
			result += `${obj.toString()} <= ${adj.prev.map(obj => obj.toString()).join(" ")}\n`
			result += '\n';
		}
		return result;
	}
}