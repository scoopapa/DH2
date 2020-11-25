"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Utils library
 *
 * Miscellaneous utility functions that don't really have a better place.
 *
 * It'll always be a judgment call whether or not a function goes into a
 * "catch-all" library like this, so here are some guidelines:
 *
 * - It must not have any dependencies
 *
 * - It must conceivably have a use in a wide variety of projects, not just
 *   Pokémon (if it's Pokémon-specific, Dex is probably a good place for it)
 *
 * - A lot of Chat functions are kind of iffy, but I'm going to say for now
 *   that if it's English-specific, it should be left out of here.
 */



 const Utils = new class Utils {
	/**
	 * Safely converts the passed variable into a string. Unlike '' + str,
	 * String(str), or str.toString(), Utils.getString is guaranteed not to
	 * crash.
	 *
	 * Specifically, the fear with untrusted JSON is an object like:
	 *
	 *     let a = {"toString": "this is not a function"};
	 *     console.log(`a is ${a}`);
	 *
	 * This will crash (because a.toString() is not a function). Instead,
	 * getString simply returns '' if the passed variable isn't a
	 * string or a number.
	 */
	getString(str) {
		return (typeof str === 'string' || typeof str === 'number') ? '' + str : '';
	}
	escapeRegex(str) {
		return str.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
	}
	/**
	 * Escapes HTML in a string.
	 */
	escapeHTML(str) {
		if (!str) return '';
		return ('' + str)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&apos;')
			.replace(/\//g, '&#x2f;');
	}

	/**
	 * Strips HTML from a string.
	 */
	stripHTML(htmlContent) {
		if (!htmlContent) return '';
		return htmlContent.replace(/<[^>]*>/g, '');
	}

	/**
	 * Visualizes eval output in a slightly more readable form
	 */
	visualize(value, depth = 0) {
		if (value === undefined) return `undefined`;
		if (value === null) return `null`;
		if (typeof value === 'number' || typeof value === 'boolean') {
			return `${value}`;
		}
		if (typeof value === 'string') {
			return `"${value}"`; // NOT ESCAPED
		}
		if (typeof value === 'symbol') {
			return value.toString();
		}
		if (Array.isArray(value)) {
			if (depth > 10) return `[array]`;
			return `[` + value.map(elem => this.visualize(elem, depth + 1)).join(`, `) + `]`;
		}
		if (value instanceof RegExp || value instanceof Date || value instanceof Function) {
			if (depth && value instanceof Function) return `Function`;
			return `${value}`;
		}
		let constructor = '';
		if (value.constructor && value.constructor.name && typeof value.constructor.name === 'string') {
			constructor = value.constructor.name;
			if (constructor === 'Object') constructor = '';
		} else {
			constructor = 'null';
		}
		if (value.toString) {
			try {
				const stringValue = value.toString();
				if (typeof stringValue === 'string' &&
						stringValue !== '[object Object]' &&
						stringValue !== `[object ${constructor}]`) {
					return `${constructor}(${stringValue})`;
				}
			} catch (e) {}
		}
		let buf = '';
		for (const key in value) {
			if (!Object.prototype.hasOwnProperty.call(value, key)) continue;
			if (depth > 2 || (depth && constructor)) {
				buf = '...';
				break;
			}
			if (buf) buf += `, `;
			let displayedKey = key;
			if (!/^[A-Za-z0-9_$]+$/.test(key)) displayedKey = JSON.stringify(key);
			buf += `${displayedKey}: ` + this.visualize(value[key], depth + 1);
		}
		if (constructor && !buf && constructor !== 'null') return constructor;
		return `${constructor}{${buf}}`;
	}

	/**
	 * Compares two variables; intended to be used as a smarter comparator.
	 * The two variables must be the same type (TypeScript will not check this).
	 *
	 * - Numbers are sorted low-to-high, use `-val` to reverse
	 * - Strings are sorted A to Z case-semi-insensitively, use `{reverse: val}` to reverse
	 * - Booleans are sorted true-first (REVERSE of casting to numbers), use `!val` to reverse
	 * - Arrays are sorted lexically in the order of their elements
	 *
	 * In other words: `[num, str]` will be sorted A to Z, `[num, {reverse: str}]` will be sorted Z to A.
	 */
	compare(a, b) {
		if (typeof a === 'number') {
			return a - (b );
		}
		if (typeof a === 'string') {
			return a.localeCompare(b );
		}
		if (typeof a === 'boolean') {
			return (a ? 1 : 2) - (b ? 1 : 2);
		}
		if (Array.isArray(a)) {
			for (let i = 0; i < a.length; i++) {
				const comparison = this.compare(a[i], (b )[i]);
				if (comparison) return comparison;
			}
			return 0;
		}
		if (a.reverse) {
			return this.compare((b ).reverse, a.reverse);
		}
		throw new Error(`Passed value ${a} is not comparable`);
	}

	/**
	 * Sorts an array according to the callback's output on its elements.
	 *
	 * The callback's output is compared according to `PSUtils.compare` (in
	 * particular, it supports arrays so you can sort by multiple things).
	 */
	





	sortBy(array, callback) {
		if (!callback) return (array ).sort(this.compare);
		return array.sort((a, b) => this.compare(callback(a), callback(b)));
	}

	



	/**
	 * Like string.split(delimiter), but only recognizes the first `limit`
	 * delimiters (default 1).
	 *
	 * `"1 2 3 4".split(" ", 2) => ["1", "2"]`
	 *
	 * `Utils.splitFirst("1 2 3 4", " ", 1) => ["1", "2 3 4"]`
	 *
	 * Returns an array of length exactly limit + 1.
	 *
	 */
	splitFirst(str, delimiter, limit = 1) {
		const splitStr = [];
		while (splitStr.length < limit) {
			const delimiterIndex = str.indexOf(delimiter);
			if (delimiterIndex >= 0) {
				splitStr.push(str.slice(0, delimiterIndex));
				str = str.slice(delimiterIndex + delimiter.length);
			} else {
				splitStr.push(str);
				str = '';
			}
		}
		splitStr.push(str);
		return splitStr;
	}

	/**
	* Template string tag function for escaping HTML
	*/
	html(strings, ...args) {
		let buf = strings[0];
		let i = 0;
		while (i < args.length) {
			buf += this.escapeHTML(args[i]);
			buf += strings[++i];
		}
		return buf;
	}

	shuffle(arr) {
		// In-place shuffle by Fisher-Yates algorithm
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	/** Forces num to be an integer (between min and max). */
	clampIntRange(num, min, max) {
		if (typeof num !== 'number') num = 0;
		num = Math.floor(num);
		if (min !== undefined && num < min) num = min;
		if (max !== undefined && num > max) num = max;
		return num;
	}

	clearRequireCache(options = {}) {
		const excludes = _optionalChain([options, 'optionalAccess', _ => _.exclude]) || [];
		excludes.push('/node_modules/');

		for (const path in require.cache) {
			let skip = false;
			for (const exclude of excludes) {
				if (path.includes(exclude)) {
					skip = true;
					break;
				}
			}

			if (!skip) delete require.cache[path];
		}
	}

	deepClone(obj) {
		if (obj === null || typeof obj !== 'object') return obj;
		if (Array.isArray(obj)) return obj.map(prop => this.deepClone(prop));
		const clone = Object.create(Object.getPrototypeOf(obj));
		for (const key of Object.keys(obj)) {
			clone[key] = this.deepClone(obj[key]);
		}
		return clone;
	}

	levenshtein(s, t, l) {
		// Original levenshtein distance function by James Westgate, turned out to be the fastest
		const d = [];

		// Step 1
		const n = s.length;
		const m = t.length;

		if (n === 0) return m;
		if (m === 0) return n;
		if (l && Math.abs(m - n) > l) return Math.abs(m - n);

		// Create an array of arrays in javascript (a descending loop is quicker)
		for (let i = n; i >= 0; i--) d[i] = [];

		// Step 2
		for (let i = n; i >= 0; i--) d[i][0] = i;
		for (let j = m; j >= 0; j--) d[0][j] = j;

		// Step 3
		for (let i = 1; i <= n; i++) {
			const si = s.charAt(i - 1);

			// Step 4
			for (let j = 1; j <= m; j++) {
				// Check the jagged ld total so far
				if (i === j && d[i][j] > 4) return n;

				const tj = t.charAt(j - 1);
				const cost = (si === tj) ? 0 : 1; // Step 5

				// Calculate the minimum
				let mi = d[i - 1][j] + 1;
				const b = d[i][j - 1] + 1;
				const c = d[i - 1][j - 1] + cost;

				if (b < mi) mi = b;
				if (c < mi) mi = c;

				d[i][j] = mi; // Step 6
			}
		}

		// Step 7
		return d[n][m];
	}
}; exports.Utils = Utils;
