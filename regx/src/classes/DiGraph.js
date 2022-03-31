export default class DiGraph {
	constructor() {
		this.adjList = new Map();
	}
	addVertex(obj) {
		this.adjList.set(obj, {next: new Set([]), prev: new Set([])});
	}
	removeVertex(obj) {
		this.getNextVertices(obj).map(nextVertex => this.removeEdge(obj, nextVertex));
		this.getPrevVertices(obj).map(prevVertex => this.removeEdge(prevVertex, obj));
		this.adjList.delete(obj);
	}
	addEdge(from, to) {
		this.adjList.get(from).next.add(to);
		this.adjList.get(to).prev.add(from);
	}
	removeEdge(from, to) {
		this.adjList.get(from).next.delete(to);
		this.adjList.get(to).prev.delete(from);
	}
	getNextVertices(obj) {
		return [...this.adjList.get(obj).next];
	}
	getPrevVertices(obj) {
		return [...this.adjList.get(obj).prev];
	}
	dumpString() {
		let result = "";
		for (const obj of this.adjList.keys()) {
			const adj = this.adjList.get(obj);
			result += `${obj.toString()} => ${[...adj.next].map(obj => obj.toString()).join(" ")}\n`
			result += `${obj.toString()} <= ${[...adj.prev].map(obj => obj.toString()).join(" ")}\n`
			result += '\n';
		}
		return result;
	}
}