import DiGraph from "./DiGraph";

import { RegexRepetition } from './RegexNode';

class RegexDiGraph extends DiGraph {
	constructor() {
		super();
	}
	combineAllSeriesAdj() {
		const toDelete = [];
		let keepGoing = false;
		do {
			keepGoing = false;
			for (const reg of this.adjList.keys()) {
				const nextRegs = this.getNextVertices(reg);
				if (nextRegs.length !== 1)
					continue; // can't merge if multiple branches
				const nextReg = nextRegs[0];
				const cousinRegs = this.getPrevVertices(nextReg);
				if (cousinRegs.length !== 1)
					continue; // only cousin should be self, otherwise would destroy converging branches
				keepGoing = true;
				if (reg !== nextReg) { // skip loopbacks
					// combine with next
					reg.concat(nextReg);
					// absorb adjacency of reg
					this.getNextVertices(nextReg).map(absorbedNextReg => this.addEdge(reg, absorbedNextReg));
					// mark for deletion
					toDelete.push(nextReg);
				}
			}
			toDelete.map(reg => this.removeVertex(reg));
		} while (keepGoing);
	}
	breakAllLoops() {
		const toDelete = [];
		let keepGoing = false;
		do {
			keepGoing = false;
			for (const reg of this.adjList.keys()) {
				const nextRegs = this.getNextVertices(reg);
				if (!nextRegs.includes(reg))
					continue; // can't merge if multiple branches
				keepGoing = true;
				// break loop branch
				this.removeEdge(reg, reg);
				// look for bypass to determine if + (1 or more) or * (0 or more)
				const bypasses = this.getBypasses(reg);
				const repetition = new RegexRepetition(reg.compile().source(), bypasses.length === 0);
				bypasses.map(bypass => this.removeEdge(bypass[0], bypass[1]));
				// insert repetition into graph
				this.addVertex(repetition);
				// absorb reg's adjacency
				this.getPrevVertices(reg).map(neighbour => this.addEdge(neighbour, repetition));
				this.getNextVertices(reg).map(neighbour => this.addEdge(repetition, neighbour));
				// mark for deletion
				toDelete.push(reg);
			}
			toDelete.map(reg => this.removeVertex(reg));
		} while (keepGoing);
	}
	compile() {
		let iterations = 0;
		while (this.adjList.size > 1 && iterations < 1000) {
			this.combineAllSeriesAdj();
			this.breakAllLoops();
			iterations++;
		}
		if (iterations === 1000)
			console.error("RegexDiGraph.compile timed out!");
		return this;
	}
}

export {
	RegexDiGraph,
}