import DiGraph from "./DiGraph";

class RegexBase {
	constructor(regexp) {
		this.regexp = regexp;
	}
	/** Get regex literal
	 * 
	 * @returns RegExp
	 */
	regexLiteral() {
		return this.compile().regexp;
	}
	toString() {
		return this.regexp.source;
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
		if (nextNodes.length > 0) {
			this.regexp = new RegExp(
				this.compile().source() +
				(nextNodes.length > 1 ? "(?:" : "") +
				nextNodes.map(nextNode => {
					let result;
					if (nextNode === this) {
						result = this.compile().source() + "*"; // loopback on self, 0 - unlimited times
						diGraph.removeEdge(this, this);
					} else {
						diGraph.getNextVertices(nextNode).map(nextNextNode => diGraph.addEdge(this, nextNextNode));
						result = nextNode.compile().source();
						diGraph.removeVertex(nextNode);
					}
					return result;
				}).filter(node => node !== null).join('|') +
				nextNodes.length > 1 ? ")" : ""
			);
		}
		return this;
	}
}

class RegexPlainString extends RegexBase {
	constructor(string) {
		super(null)
		this.value = string;
	}
	toString() {
		return this.regexp?.source ?? this.value;
	}
	/** Compile self into RegexBase
	 * 
	 * @returns compiled RegexBase version of self
	 */
	compile() {
		if (!this.regexp) {
			this.regexp = new RegexBase(this.value);
		}
		return this.regexp;
	}
}

export {
	RegexBase,
	RegexPlainString,
}