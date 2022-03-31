import DiGraph from "./DiGraph";

class RegexBase {
	constructor(regexp) {
		this.regexp = new RegExp(regexp);
	}
	/** Compile self into RegexBase
	 * 
	 * @returns this
	 */
	compile() {
		return this;
	}
	/** Get source of regular expression as string
	 * 
	 * @returns String
	 */
	source() {
		return this.regexp.source;
	}
	/** Absorb next nodes into self
	 * 
	 * @param {DiGraph} diGraph Graph of entire regex
	 * @returns this
	 */
	absorbAhead(diGraph) {
		const nextNodes = diGraph.getNextVertices(this);
		if (next.length === 0)
			return this;
		this.regexp = new RegExp(this.compile().source() + nextNodes.length > 1 ? "(?:" : "" +
			nextNodes.map(nextNode => {
				let result;
				if (nextNode === this) {
					result = this.compile().source() + "*"; // loopback on self, 0 - unlimited times
					diGraph.removeEdge(this, this);
				} else {
					diGraph.getNextVerticies(nextNode).map(nextNextNode => diGraph.addEdge(this, nextNextNode));
					result = nextNode.compile().source();
					diGraph.removeVertex(nextNode);
				}
				return result;
			}).filter(node => node !== null).join('|') + nextNodes.length > 1 ? ")" : ""
		);
		return this;
	}
}

class RegexPlainString extends RegexSimple {
	constructor(string) {
		this.value = string;
	}
	/** Compile self into RegexBase
	 * 
	 * @returns compiled RegexBase version of self
	 */
	compile() {
		return new RegexBase(this.value);
	}
}

export {
	RegexBase,
	RegexPlainString,
}