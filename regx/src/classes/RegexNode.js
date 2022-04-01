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
		return this.regexp?.source ?? this.compile().source();
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
	/** Series combine this regex with other
	 * Only call if no branching is between this and other
	 * 
	 * @param {RegexBase} other 
	 */
	concat(other) {
		this.regexp = new RegExp(
			this.compile().source()
			+ other.compile().source()
		);
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
		if (this.regexp === null) {
			this.regexp = new RegExp(this.value);
		}
		return new RegexBase(this.regexp);
	}
}

class RegexRepetition extends RegexBase {
	/**
	 * 
	 * @param {RegExp} regexp 
	 * @param {Boolean} oneOrMore 
	 */
	constructor(regexp, oneOrMore) {
		super(null);
		this.oneOrMore = oneOrMore;
		this.sourceRegexp = regexp;
	}
	compile() {
		if (this.regexp === null) {
			this.regexp = new RegExp(`(?:${this.sourceRegexp})${this.oneOrMore ? '+' : '*'}`);
		}
		return new RegexBase(this.regexp);
	}
}

export {
	RegexBase,
	RegexPlainString,
	RegexRepetition,
}