"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; } var _class;/**
 * IP Tools
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * IPTools file has various tools for IP parsing and IP-based blocking.
 *
 * These include DNSBLs: DNS-based blackhole lists, which list IPs known for
 * running proxies, spamming, or other abuse.
 *
 * We also maintain our own database of datacenter IP ranges (usually
 * proxies). These are taken from https://github.com/client9/ipcat
 * but include our own database as well.
 *
 * @license MIT
 */

const BLOCKLISTS = ['sbl.spamhaus.org', 'rbl.efnetrbl.org'];
const HOSTS_FILE = 'config/hosts.csv';
const PROXIES_FILE = 'config/proxies.csv';

var _dns = require('dns'); var dns = _dns;
var _fs = require('../.lib-dist/fs');







function removeNohost(hostname) {
	// Convert from old domain.tld.type-nohost format to new domain.tld?/type format
	if (_optionalChain([hostname, 'optionalAccess', _ => _.includes, 'call', _2 => _2('-nohost')])) {
		const parts = hostname.split('.');
		const suffix = parts.pop();
		return `${parts.join('.')}?/${_optionalChain([suffix, 'optionalAccess', _3 => _3.replace, 'call', _4 => _4('-nohost', '')])}`;
	}
	return hostname;
}

 const IPTools = new (_class = class {constructor() { _class.prototype.__init.call(this);_class.prototype.__init2.call(this);_class.prototype.__init3.call(this);_class.prototype.__init4.call(this);_class.prototype.__init5.call(this);_class.prototype.__init6.call(this);_class.prototype.__init7.call(this);_class.prototype.__init8.call(this);_class.prototype.__init9.call(this);_class.prototype.__init10.call(this); }
	 __init() {this.dnsblCache = new Map([
		['127.0.0.1', null],
	])}

	 __init2() {this.connectionTestCache = new Map()}

	// eslint-disable-next-line max-len
	 __init3() {this.ipRegex = /\b(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\b/}
	// eslint-disable-next-line max-len
	 __init4() {this.ipRangeRegex = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]|\*)){0,2}\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]|\*)$/}
	 __init5() {this.hostRegex = /^.+\..{2,}$/}

	async lookup(ip) {
		// known TypeScript bug
		// https://github.com/microsoft/TypeScript/issues/33752
		const [dnsbl, host] = await Promise.all([
			exports.IPTools.queryDnsbl(ip),
			exports.IPTools.getHost(ip),
		]);
		const shortHost = this.shortenHost(host);
		const hostType = this.getHostType(shortHost, ip);
		return {dnsbl, host, shortHost, hostType};
	}

	queryDnsblLoop(ip, callback, reversedIpDot, index) {
		if (index >= BLOCKLISTS.length) {
			// not in any blocklist
			exports.IPTools.dnsblCache.set(ip, null);
			callback(null);
			return;
		}
		const blocklist = BLOCKLISTS[index];
		dns.lookup(reversedIpDot + blocklist, 4, (err, res) => {
			if (!err) {
				// blocked
				exports.IPTools.dnsblCache.set(ip, blocklist);
				callback(blocklist);
				return;
			}
			// not blocked, try next blocklist
			exports.IPTools.queryDnsblLoop(ip, callback, reversedIpDot, index + 1);
		});
	}

	/**
	 * IPTools.queryDnsbl(ip, callback)
	 *
	 * Calls callb
	 * ack(blocklist), where blocklist is the blocklist domain
	 * if the passed IP is in a blocklist, or null if the IP is not in
	 * any blocklist.
	 *
	 * Return value matches isBlocked when treated as a boolean.
	 */
	queryDnsbl(ip) {
		if (!Config.dnsbl) return Promise.resolve(null);
		if (exports.IPTools.dnsblCache.has(ip)) {
			return Promise.resolve(exports.IPTools.dnsblCache.get(ip) || null);
		}
		const reversedIpDot = ip.split('.').reverse().join('.') + '.';
		return new Promise((resolve, reject) => {
			exports.IPTools.queryDnsblLoop(ip, resolve, reversedIpDot, 0);
		});
	}

	/*********************************************************
	 * IP parsing
	 *********************************************************/

	ipToNumber(ip) {
		ip = ip.trim();
		if (ip.includes(':') && !ip.includes('.')) {
			// IPv6
			return -1;
		}
		if (ip.startsWith('::ffff:')) ip = ip.slice(7);
		else if (ip.startsWith('::')) ip = ip.slice(2);
		let num = 0;
		const parts = ip.split('.');
		for (const part of parts) {
			num *= 256;
			num += parseInt(part);
		}
		return num;
	}

	numberToIP(num) {
		const ipParts = [];
		while (num) {
			const part = num % 256;
			num = (num - part) / 256;
			ipParts.unshift(part.toString());
		}
		return ipParts.join('.');
	}

	getCidrRange(cidr) {
		if (!cidr) return null;
		const index = cidr.indexOf('/');
		if (index <= 0) {
			return {
				minIP: exports.IPTools.ipToNumber(cidr),
				maxIP: exports.IPTools.ipToNumber(cidr),
			};
		}
		const low = exports.IPTools.ipToNumber(cidr.slice(0, index));
		const bits = parseInt(cidr.slice(index + 1));
		// fun fact: IPTools fails if bits <= 1 because JavaScript
		// does << with signed int32s.
		const high = low + (1 << (32 - bits)) - 1;
		return {minIP: low, maxIP: high};
	}
	stringToRange(range) {
		if (!range) return null;
		if (range.endsWith('*')) {
			const [a, b, c] = range.replace('*', '').split('.');
			return {
				minIP: exports.IPTools.ipToNumber(`${a || '0'}.${b || '0'}.${c || '0'}.0`),
				maxIP: exports.IPTools.ipToNumber(`${a || '255'}.${b || '255'}.${c || '255'}.255`),
			};
		}
		const index = range.indexOf('-');
		if (index <= 0) {
			return range.includes('/') ? exports.IPTools.getCidrRange(range) : {
				minIP: exports.IPTools.ipToNumber(range),
				maxIP: exports.IPTools.ipToNumber(range),
			};
		}
		const minIP = exports.IPTools.ipToNumber(range.slice(0, index));
		const maxIP = exports.IPTools.ipToNumber(range.slice(index + 1));
		return {minIP, maxIP};
	}

	ipSort(a, b) {
		let i = 0;
		let diff = 0;
		const aParts = a.split('.');
		const bParts = b.split('.');
		while (diff === 0) {
			diff = (parseInt(aParts[i]) || 0) - (parseInt(bParts[i]) || 0);
			i++;
		}
		return diff;
	}

	/******************************
	 * Range management functions *
	 ******************************/


	checkPattern(patterns, num) {
		for (const pattern of patterns) {
			if (num >= pattern.minIP && num <= pattern.maxIP) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Returns a checker function for the passed IP range or array of
	 * ranges. The checker function returns true if its passed IP is
	 * in the range.
	 */
	checker(rangeString) {
		if (!rangeString || !rangeString.length) return () => false;
		let ranges = [];
		if (typeof rangeString === 'string') {
			const rangePatterns = exports.IPTools.stringToRange(rangeString);
			if (rangePatterns) ranges = [rangePatterns];
		} else {
			ranges = rangeString.map(exports.IPTools.stringToRange).filter(x => x) ;
		}
		return (ip) => exports.IPTools.checkPattern(ranges, exports.IPTools.ipToNumber(ip));
	}

	/**
	 * Proxy and host management functions
	 */
	__init6() {this.ranges = []}
	__init7() {this.singleIPOpenProxies = new Set()}
	__init8() {this.proxyHosts = new Set()}
	__init9() {this.residentialHosts = new Set()}
	__init10() {this.mobileHosts = new Set()}
	async loadHostsAndRanges() {
		const data = await _fs.FS.call(void 0, HOSTS_FILE).readIfExists() + await _fs.FS.call(void 0, PROXIES_FILE).readIfExists();
		// Strip carriage returns for Windows compatibility
		const rows = data.split('\n').map(row => row.replace('\r', ''));
		const ranges = [];
		for (const row of rows) {
			if (!row) continue;
			let [type, hostOrLowIP, highIP, host] = row.split(',');
			if (!hostOrLowIP) continue;
			// Handle legacy data format
			host = removeNohost(host);
			hostOrLowIP = removeNohost(hostOrLowIP);

			switch (type) {
			case 'IP':
				exports.IPTools.singleIPOpenProxies.add(hostOrLowIP);
				break;
			case 'HOST':
				exports.IPTools.proxyHosts.add(hostOrLowIP);
				break;
			case 'RESIDENTIAL':
				exports.IPTools.residentialHosts.add(hostOrLowIP);
				break;
			case 'MOBILE':
				exports.IPTools.mobileHosts.add(hostOrLowIP);
				break;
			case 'RANGE':
				if (!host) continue;
				const range = {
					minIP: exports.IPTools.ipToNumber(hostOrLowIP),
					maxIP: exports.IPTools.ipToNumber(highIP),
					host: exports.IPTools.urlToHost(host),
				};
				if (range.maxIP < range.minIP) throw new Error(`Bad range at ${hostOrLowIP}.`);
				ranges.push(range);
				break;
			}
		}
		exports.IPTools.ranges = ranges;
		exports.IPTools.sortRanges();
	}

	saveHostsAndRanges() {
		let hostsData = '';
		let proxiesData = '';
		for (const ip of exports.IPTools.singleIPOpenProxies) {
			proxiesData += `IP,${ip}\n`;
		}
		for (const host of exports.IPTools.proxyHosts) {
			proxiesData += `HOST,${host}\n`;
		}
		for (const host of exports.IPTools.residentialHosts) {
			hostsData += `RESIDENTIAL,${host}\n`;
		}
		for (const host of exports.IPTools.mobileHosts) {
			hostsData += `MOBILE,${host}\n`;
		}
		exports.IPTools.sortRanges();
		for (const range of exports.IPTools.ranges) {
			const data = `RANGE,${exports.IPTools.numberToIP(range.minIP)},${exports.IPTools.numberToIP(range.maxIP)}${range.host ? `,${range.host}` : ``}\n`;
			if (_optionalChain([range, 'access', _5 => _5.host, 'optionalAccess', _6 => _6.endsWith, 'call', _7 => _7('/proxy')])) {
				proxiesData += data;
			} else {
				hostsData += data;
			}
		}
		void _fs.FS.call(void 0, HOSTS_FILE).write(hostsData);
		void _fs.FS.call(void 0, PROXIES_FILE).write(proxiesData);
	}

	addOpenProxies(ips) {
		for (const ip of ips) {
			exports.IPTools.singleIPOpenProxies.add(ip);
		}
		return exports.IPTools.saveHostsAndRanges();
	}

	addProxyHosts(hosts) {
		for (const host of hosts) {
			exports.IPTools.proxyHosts.add(host);
		}
		return exports.IPTools.saveHostsAndRanges();
	}

	addMobileHosts(hosts) {
		for (const host of hosts) {
			exports.IPTools.mobileHosts.add(host);
		}
		return exports.IPTools.saveHostsAndRanges();
	}

	addResidentialHosts(hosts) {
		for (const host of hosts) {
			exports.IPTools.residentialHosts.add(host);
		}
		return exports.IPTools.saveHostsAndRanges();
	}

	removeOpenProxies(ips) {
		for (const ip of ips) {
			exports.IPTools.singleIPOpenProxies.delete(ip);
		}
		return exports.IPTools.saveHostsAndRanges();
	}

	removeResidentialHosts(hosts) {
		for (const host of hosts) {
			exports.IPTools.residentialHosts.delete(host);
		}
		return exports.IPTools.saveHostsAndRanges();
	}

	removeProxyHosts(hosts) {
		for (const host of hosts) {
			exports.IPTools.proxyHosts.delete(host);
		}
		return exports.IPTools.saveHostsAndRanges();
	}

	removeMobileHosts(hosts) {
		for (const host of hosts) {
			exports.IPTools.mobileHosts.delete(host);
		}
		return exports.IPTools.saveHostsAndRanges();
	}

	checkRangeConflicts(insertion, sortedRanges, widen) {
		if (insertion.maxIP < insertion.minIP) {
			throw new Error(
				`Invalid data for address range ${exports.IPTools.numberToIP(insertion.minIP)}-${exports.IPTools.numberToIP(insertion.maxIP)} (${insertion.host})`
			);
		}

		let iMin = 0;
		let iMax = sortedRanges.length;
		while (iMin < iMax) {
			const i = Math.floor((iMax + iMin) / 2);
			if (insertion.minIP > sortedRanges[i].minIP) {
				iMin = i + 1;
			} else {
				iMax = i;
			}
		}
		if (iMin < sortedRanges.length) {
			const next = sortedRanges[iMin];
			if (insertion.minIP === next.minIP && insertion.maxIP === next.maxIP) {
				throw new Error(`The address range ${exports.IPTools.numberToIP(insertion.minIP)}-${exports.IPTools.numberToIP(insertion.maxIP)} (${insertion.host}) already exists`);
			}
			if (insertion.minIP <= next.minIP && insertion.maxIP >= next.maxIP) {
				if (widen) {
					if (_optionalChain([sortedRanges, 'access', _8 => _8[iMin + 1], 'optionalAccess', _9 => _9.minIP]) <= insertion.maxIP) {
						throw new Error("You can only widen one address range at a time.");
					}
					return iMin;
				}
				throw new Error(
					`Too wide: ${exports.IPTools.numberToIP(insertion.minIP)}-${exports.IPTools.numberToIP(insertion.maxIP)} (${insertion.host})\n` +
					`Intersects with: ${exports.IPTools.numberToIP(next.minIP)}-${exports.IPTools.numberToIP(next.maxIP)} (${next.host})`
				);
			}
			if (insertion.maxIP >= next.minIP) {
				throw new Error(
					`Could not insert: ${exports.IPTools.numberToIP(insertion.minIP)}-${exports.IPTools.numberToIP(insertion.maxIP)} ${insertion.host}\n` +
					`Intersects with: ${exports.IPTools.numberToIP(next.minIP)}-${exports.IPTools.numberToIP(next.maxIP)} (${next.host})`
				);
			}
		}
		if (iMin > 0) {
			const prev = sortedRanges[iMin - 1];
			if (insertion.minIP >= prev.minIP && insertion.maxIP <= prev.maxIP) {
				throw new Error(
					`Too narrow: ${exports.IPTools.numberToIP(insertion.minIP)}-${exports.IPTools.numberToIP(insertion.maxIP)} (${insertion.host})\n` +
					`Intersects with: ${exports.IPTools.numberToIP(prev.minIP)}-${exports.IPTools.numberToIP(prev.maxIP)} (${prev.host})`
				);
			}
			if (insertion.minIP <= prev.maxIP) {
				throw new Error(
					`Could not insert: ${exports.IPTools.numberToIP(insertion.minIP)}-${exports.IPTools.numberToIP(insertion.maxIP)} (${insertion.host})\n` +
					`Intersects with: ${exports.IPTools.numberToIP(prev.minIP)}-${exports.IPTools.numberToIP(prev.maxIP)} (${prev.host})`
				);
			}
		}
	}

	/*********************************************************
	 * Range handling functions
	 *********************************************************/

	urlToHost(url) {
		if (url.startsWith('http://')) url = url.slice(7);
		if (url.startsWith('https://')) url = url.slice(8);
		if (url.startsWith('www.')) url = url.slice(4);
		const slashIndex = url.indexOf('/');
		if (slashIndex > 0 && url[slashIndex - 1] !== '?') url = url.slice(0, slashIndex);
		return url;
	}

	sortRanges() {
		exports.IPTools.ranges.sort((a, b) => a.minIP - b.minIP);
	}


	getRange(minIP, maxIP) {
		for (const range of exports.IPTools.ranges) {
			if (range.minIP === minIP && range.maxIP === maxIP) return range;
		}
	}

	addRange(range) {
		if (exports.IPTools.getRange(range.minIP, range.maxIP)) {
			exports.IPTools.removeRange(range.minIP, range.maxIP);
		}
		exports.IPTools.ranges.push(range);
		return exports.IPTools.saveHostsAndRanges();
	}

	removeRange(minIP, maxIP) {
		exports.IPTools.ranges = exports.IPTools.ranges.filter(dc => dc.minIP !== minIP || dc.maxIP !== maxIP);
		return exports.IPTools.saveHostsAndRanges();
	}

	/**
	 * Will not reject; IPs with no RDNS entry will resolve to
	 * '[byte1].[byte2]?/unknown'.
	 */
	getHost(ip) {
		return new Promise(resolve => {
			if (!ip) {
				resolve('');
				return;
			}

			const ipNumber = exports.IPTools.ipToNumber(ip);
			for (const range of exports.IPTools.ranges) {
				if (ipNumber >= range.minIP && ipNumber <= range.maxIP) {
					resolve(range.host);
					return;
				}
			}
			dns.reverse(ip, (err, hosts) => {
				if (err) {
					resolve(`${ip.split('.').slice(0, 2).join('.')}?/unknown`);
					return;
				}
				if (!hosts || !hosts[0]) {
					if (ip.startsWith('50.')) {
						resolve('comcast.net?/res');
					} else if (ipNumber >= telstraRange.minIP && ipNumber <= telstraRange.maxIP) {
						resolve(telstraRange.host);
					} else {
						this.testConnection(ip, result => {
							if (result) {
								resolve(`${ip.split('.').slice(0, 2).join('.')}?/proxy`);
							} else {
								resolve(`${ip.split('.').slice(0, 2).join('.')}?/unknown`);
							}
						});
					}
				} else {
					resolve(hosts[0]);
				}
			});
		});
	}

	/**
	 * Does this IP respond to port 80? In theory, proxies are likely to
	 * respond, while residential connections are likely to reject connections.
	 *
	 * Callback is guaranteed to be called exactly once, within a 1000ms
	 * timeout.
	 */
	testConnection(ip, callback) {
		const cachedValue = this.connectionTestCache.get(ip);
		if (cachedValue !== undefined) {
			return callback(cachedValue);
		}

		// Node.js's documentation does not make this easy to write. I discovered
		// this behavior by manual testing:

		// A successful connection emits 'connect', which you should react to
		// with socket.destroy(), which emits 'close'.

		// Some IPs instantly reject connections, emitting 'error' followed
		// immediately by 'close'.

		// Some IPs just never respond, leaving you to time out. Node will
		// emit the 'timeout' event, but not actually do anything else, leaving
		// you to manually use socket.destroy(), which emits 'close'

		let connected = false;
		const socket = require('net').createConnection({
			port: 80,
			host: ip,
			timeout: 1000,
		}, () => {
			connected = true;
			this.connectionTestCache.set(ip, true);
			socket.destroy();
			return callback(true);
		});
		socket.on('error', () => {});
		socket.on('timeout', () => socket.destroy());
		socket.on('close', () => {
			if (!connected) {
				this.connectionTestCache.set(ip, false);
				return callback(false);
			}
		});
	}

	shortenHost(host) {
		if (_optionalChain([host, 'access', _10 => _10.split, 'call', _11 => _11('.'), 'access', _12 => _12.pop, 'call', _13 => _13(), 'optionalAccess', _14 => _14.includes, 'call', _15 => _15('/')])) return host; // It has a suffix, e.g. leaseweb.com?/proxy
		let dotLoc = host.lastIndexOf('.');
		const tld = host.slice(dotLoc);
		if (tld === '.uk' || tld === '.au' || tld === '.br') dotLoc = host.lastIndexOf('.', dotLoc - 1);
		dotLoc = host.lastIndexOf('.', dotLoc - 1);
		return host.slice(dotLoc + 1);
	}

	/**
	 * Host types:
	 * - 'res' - normal residential ISP
	 * - 'shared' - like res, but shared among many people: bans will have collateral damage
	 * - 'mobile' - like res, but unstable IP (IP bans don't work)
	 * - 'proxy' - datacenters, VPNs, proxy services, other untrustworthy sources
	 *   (note that bots will usually be hosted on these)
	 * - 'res?' - likely res, but host not specifically whitelisted
	 * - 'unknown' - no rdns entry, treat with suspicion
	 */
	getHostType(host, ip) {
		if (Punishments.sharedIps.has(ip)) {
			return 'shared';
		}
		if (this.singleIPOpenProxies.has(ip)) {
			// single-IP open proxies
			return 'proxy';
		}

		if (/^he\.net(\?|)\/proxy$/.test(host)) {
			// Known to only be VPN services
			if (['74.82.60.', '72.52.87.', '65.49.126.'].some(range => ip.startsWith(range))) {
				return 'proxy';
			}
			// Hurricane Electric has an annoying habit of having residential
			// internet and datacenters on the same IP ranges - we get a lot of
			// legitimate users as well as spammers on VPNs from HE.

			// This splits the difference and treats it like any other unknown IP.
			return 'unknown';
		}
		// There were previously special cases for
		// 'digitalocean.proxy-nohost', 'servihosting.es.proxy-nohost'
		// DO is commonly used to host bots; I don't know who whitelisted
		// servihosting but I assume for a similar reason. This isn't actually
		// tenable; any service that can host bots can and does also host proxies.
		if (this.proxyHosts.has(host) || host.endsWith('/proxy')) {
			return 'proxy';
		}
		if (this.residentialHosts.has(host) || host.endsWith('/res')) {
			return 'res';
		}
		if (this.mobileHosts.has(host) || host.endsWith('/mobile')) {
			return 'mobile';
		}
		if (/^ip-[0-9]+-[0-9]+-[0-9]+\.net$/.test(host) || /^ip-[0-9]+-[0-9]+-[0-9]+\.eu$/.test(host)) {
			// OVH
			return 'proxy';
		}

		if (host.endsWith('/unknown')) {
			// rdns entry doesn't exist, and IP doesn't respond to a probe on port 80
			return 'unknown';
		}

		// rdns entry exists but is unrecognized
		return 'res?';
	}
}, _class); exports.IPTools = IPTools;

const telstraRange = {
	minIP: exports.IPTools.ipToNumber("101.160.0.0"),
	maxIP: exports.IPTools.ipToNumber("101.191.255.255"),
	host: 'telstra.net?/res',
};

exports. default = exports.IPTools;
