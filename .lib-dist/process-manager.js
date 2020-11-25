"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }/**
 * Process Manager
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This file abstract out multiprocess logic involved in several tasks.
 *
 * Child processes can be queried.
 *
 * @license MIT
 */

var _child_process = require('child_process'); var child_process = _child_process;
var _cluster = require('cluster'); var cluster = _cluster;
var _path = require('path'); var path = _path;
var _streams = require('./streams'); var Streams = _streams;




const ROOT_DIR = path.resolve(__dirname, '..');

 const processManagers = []; exports.processManagers = processManagers;
 const disabled = false; exports.disabled = disabled;





 function exec(args, execOptions) {
	if (Array.isArray(args)) {
		const cmd = args.shift();
		if (!cmd) throw new Error(`You must pass a command to ProcessManager.exec.`);
		return new Promise((resolve, reject) => {
			child_process.execFile(cmd, args, execOptions, (err, stdout, stderr) => {
				if (err) reject(err);
				if (typeof stdout !== 'string') stdout = stdout.toString();
				if (typeof stderr !== 'string') stderr = stderr.toString();
				resolve({stdout, stderr});
			});
		});
	} else {
		return new Promise((resolve, reject) => {
			child_process.exec(args, execOptions, (error, stdout, stderr) => {
				if (error) reject(error);
				if (typeof stdout !== 'string') stdout = stdout.toString();
				resolve(stdout);
			});
		});
	}
} exports.exec = exec;

class SubprocessStream extends Streams.ObjectReadWriteStream {
	
	
	constructor(process, taskId) {
		super();
		this.process = process;
		this.taskId = taskId;
		this.process.process.send(`${taskId}\nNEW`);
	}
	_write(message) {
		if (!this.process.process.connected) {
			this.pushError(new Error(`Process disconnected (possibly crashed?)`));
			return;
		}
		this.process.process.send(`${this.taskId}\nWRITE\n${message}`);
		// responses are handled in ProcessWrapper
	}
	_writeEnd() {
		this.process.process.send(`${this.taskId}\nWRITEEND`);
	}
	_destroy() {
		if (!this.process.process.connected) return;
		this.process.process.send(`${this.taskId}\nDESTROY`);
		this.process.deleteStream(this.taskId);
		this.process = null;
	}
}

class RawSubprocessStream extends Streams.ObjectReadWriteStream {
	
	constructor(process) {
		super();
		this.process = process;
	}
	_write(message) {
		if (!this.process.getProcess().connected) {
			// no error because the crash handler should already have shown an error, and
			// sometimes harmless messages are sent during cleanup
			return;
		}
		this.process.process.send(message);
		// responses are handled in ProcessWrapper
	}
}








/** Wraps the process object in the PARENT process. */
 class QueryProcessWrapper  {
	
	
	
	
	
	

	constructor(file) {
		this.process = child_process.fork(file, [], {cwd: ROOT_DIR});
		this.taskId = 0;
		this.pendingTasks = new Map();
		this.pendingRelease = null;
		this.resolveRelease = null;

		this.process.on('message', (message) => {
			if (message.startsWith('THROW\n')) {
				const error = new Error();
				error.stack = message.slice(6);
				throw error;
			}

			if (message.startsWith('DEBUG\n')) {
				this.debug = message.slice(6);
				return;
			}

			const nlLoc = message.indexOf('\n');
			if (nlLoc <= 0) throw new Error(`Invalid response ${message}`);
			const taskId = parseInt(message.slice(0, nlLoc));
			const resolve = this.pendingTasks.get(taskId);
			if (!resolve) throw new Error(`Invalid taskId ${message.slice(0, nlLoc)}`);
			this.pendingTasks.delete(taskId);
			resolve(JSON.parse(message.slice(nlLoc + 1)));

			if (this.resolveRelease && !this.load) this.destroy();
		});
	}

	getProcess() {
		return this.process;
	}

	get load() {
		return this.pendingTasks.size;
	}

	query(input) {
		this.taskId++;
		const taskId = this.taskId;
		this.process.send(`${taskId}\n${JSON.stringify(input)}`);
		return new Promise(resolve => {
			this.pendingTasks.set(taskId, resolve);
		});
	}

	release() {
		if (this.pendingRelease) return this.pendingRelease;
		if (!this.load) {
			this.destroy();
		} else {
			this.pendingRelease = new Promise(resolve => {
				this.resolveRelease = resolve;
			});
		}
		return this.pendingRelease ;
	}

	destroy() {
		if (this.pendingRelease && !this.resolveRelease) {
			// already destroyed
			return;
		}
		this.process.disconnect();
		for (const resolver of this.pendingTasks.values()) {
			// maybe we should track reject functions too...
			resolver('');
		}
		this.pendingTasks.clear();
		if (this.resolveRelease) {
			this.resolveRelease();
			this.resolveRelease = null;
		} else if (!this.pendingRelease) {
			this.pendingRelease = Promise.resolve();
		}
	}
} exports.QueryProcessWrapper = QueryProcessWrapper;

/** Wraps the process object in the PARENT process. */
 class StreamProcessWrapper  {
	
	__init() {this.taskId = 0}
	__init2() {this.activeStreams = new Map()}
	__init3() {this.pendingRelease = null}
	__init4() {this.resolveRelease = null}
	

	setDebug(message) {
		this.debug = (this.debug || '').slice(-32768) + '\n=====\n' + message;
	}

	constructor(file) {;StreamProcessWrapper.prototype.__init.call(this);StreamProcessWrapper.prototype.__init2.call(this);StreamProcessWrapper.prototype.__init3.call(this);StreamProcessWrapper.prototype.__init4.call(this);
		this.process = child_process.fork(file, [], {cwd: ROOT_DIR});

		this.process.on('message', (message) => {
			if (message.startsWith('THROW\n')) {
				const error = new Error();
				error.stack = message.slice(6);
				throw error;
			}

			if (message.startsWith('DEBUG\n')) {
				this.setDebug(message.slice(6));
				return;
			}

			let nlLoc = message.indexOf('\n');
			if (nlLoc <= 0) throw new Error(`Invalid response ${message}`);
			const taskId = parseInt(message.slice(0, nlLoc));
			const stream = this.activeStreams.get(taskId);
			if (!stream) return; // stream already destroyed

			message = message.slice(nlLoc + 1);
			nlLoc = message.indexOf('\n');
			if (nlLoc < 0) nlLoc = message.length;
			const messageType = message.slice(0, nlLoc);
			message = message.slice(nlLoc + 1);

			if (messageType === 'END') {
				stream.pushEnd();
				this.deleteStream(taskId);
				return;
			} else if (messageType === 'PUSH') {
				stream.push(message);
			} else if (messageType === 'THROW') {
				const error = new Error();
				error.stack = message;
				stream.pushError(error, true);
			} else {
				throw new Error(`Unrecognized messageType ${messageType}`);
			}
		});
	}

	getProcess() {
		return this.process;
	}

	deleteStream(taskId) {
		this.activeStreams.delete(taskId);
		// try to release
		if (this.resolveRelease && !this.load) void this.destroy();
	}

	get load() {
		return this.activeStreams.size;
	}

	createStream() {
		this.taskId++;
		const taskId = this.taskId;
		const stream = new SubprocessStream(this, taskId);
		this.activeStreams.set(taskId, stream);
		return stream;
	}

	release() {
		if (this.pendingRelease) return this.pendingRelease;
		if (!this.load) {
			void this.destroy();
		} else {
			this.pendingRelease = new Promise(resolve => {
				this.resolveRelease = resolve;
			});
		}
		return this.pendingRelease ;
	}

	destroy() {
		if (this.pendingRelease && !this.resolveRelease) {
			// already destroyed
			return;
		}
		this.process.disconnect();
		const destroyed = [];
		for (const stream of this.activeStreams.values()) {
			destroyed.push(stream.destroy());
		}
		this.activeStreams.clear();
		if (this.resolveRelease) {
			this.resolveRelease();
			this.resolveRelease = null;
		} else if (!this.pendingRelease) {
			this.pendingRelease = Promise.resolve();
		}
		return Promise.all(destroyed);
	}
} exports.StreamProcessWrapper = StreamProcessWrapper;

/**
 * A container for a RawProcessManager stream. This is usually the
 * RawProcessWrapper, but it can also be a fake RawProcessWrapper if the PM is
 * told to spawn 0 worker processes.
 */
 class StreamWorker {
	__init5() {this.load = 0}
	__init6() {this.workerid = 0}
	
	constructor(stream) {;StreamWorker.prototype.__init5.call(this);StreamWorker.prototype.__init6.call(this);
		this.stream = stream;
	}
} exports.StreamWorker = StreamWorker;

/** Wraps the process object in the PARENT process. */
 class RawProcessWrapper  {
	
	__init7() {this.taskId = 0}
	
	__init8() {this.pendingRelease = null}
	__init9() {this.resolveRelease = null}
	
	__init10() {this.workerid = 0}

	/** Not managed by RawProcessWrapper itself */
	__init11() {this.load = 0}

	setDebug(message) {
		this.debug = (this.debug || '').slice(-32768) + '\n=====\n' + message;
	}

	constructor(file, isCluster, env) {;RawProcessWrapper.prototype.__init7.call(this);RawProcessWrapper.prototype.__init8.call(this);RawProcessWrapper.prototype.__init9.call(this);RawProcessWrapper.prototype.__init10.call(this);RawProcessWrapper.prototype.__init11.call(this);
		if (isCluster) {
			this.process = cluster.fork(env);
			this.workerid = this.process.id;
		} else {
			this.process = child_process.fork(file, [], {cwd: ROOT_DIR, env}) ;
		}

		this.process.on('message', (message) => {
			this.stream.push(message);
		});

		this.stream = new RawSubprocessStream(this);
	}

	getProcess() {
		return this.process.process ? this.process.process : this.process;
	}

	release() {
		if (this.pendingRelease) return this.pendingRelease;
		if (!this.load) {
			void this.destroy();
		} else {
			this.pendingRelease = new Promise(resolve => {
				this.resolveRelease = resolve;
			});
		}
		return this.pendingRelease ;
	}

	destroy() {
		if (this.pendingRelease && !this.resolveRelease) {
			// already destroyed
			return;
		}
		this.stream.destroy();
		this.process.disconnect();
		return;
	}
} exports.RawProcessWrapper = RawProcessWrapper;

/**
 * A ProcessManager wraps a query function: A function that takes a
 * string and returns a string or Promise<string>.
 */
 class ProcessManager {
	__init12() {this.processes = []}
	__init13() {this.releasingProcesses = []}
	__init14() {this.crashedProcesses = []}
	
	
	
	
	__init15() {this.crashTime = 0}
	__init16() {this.crashRespawnCount = 0}

	constructor(module) {;ProcessManager.prototype.__init12.call(this);ProcessManager.prototype.__init13.call(this);ProcessManager.prototype.__init14.call(this);ProcessManager.prototype.__init15.call(this);ProcessManager.prototype.__init16.call(this);
		this.module = module;
		this.filename = module.filename;
		this.basename = path.basename(module.filename);
		this.isParentProcess = (process.mainModule !== module || !process.send);

		this.listen();
	}
	acquire() {
		if (!this.processes.length) {
			return null;
		}
		let lowestLoad = this.processes[0];
		for (const process of this.processes) {
			if (process.load < lowestLoad.load) {
				lowestLoad = process;
			}
		}
		return lowestLoad;
	}
	releaseCrashed(process) {
		const index = this.processes.indexOf(process);

		// The process was shut down sanely, not crashed
		if (index < 0) return;

		this.processes.splice(index, 1);

		this.destroyProcess(process);
		void process.release().then(() => {
			const releasingIndex = this.releasingProcesses.indexOf(process);
			if (releasingIndex >= 0) {
				this.releasingProcesses.splice(releasingIndex, 1);
			}
		});

		const now = Date.now();
		if (this.crashTime && now - this.crashTime > 30 * 60 * 1000) {
			this.crashTime = 0;
			this.crashRespawnCount = 0;
		}
		if (!this.crashTime) this.crashTime = now;
		this.crashRespawnCount += 1;
		// Notify any global crash logger
		void Promise.reject(
			new Error(`Process ${this.basename} ${process.getProcess().pid} crashed and had to be restarted`)
		);
		this.releasingProcesses.push(process);
		this.crashedProcesses.push(process);

		// only respawn processes if there have been fewer than 5 crashes in 30 minutes
		if (this.crashRespawnCount <= 5) {
			this.spawn(this.processes.length + 1);
		}
	}
	unspawn() {
		const released = [];
		const processes = this.processes;
		this.processes = [];
		for (const process of processes) {
			this.destroyProcess(process);
			released.push(process.release().then(() => {
				const index = this.releasingProcesses.indexOf(process);
				if (index >= 0) {
					this.releasingProcesses.splice(index, 1);
				}
			}));
		}
		this.releasingProcesses = this.releasingProcesses.concat(processes);
		return Promise.all(released);
	}
	spawn(count = 1, force) {
		if (!this.isParentProcess) return;
		if (exports.disabled && !force) return;
		while (this.processes.length < count) {
			const process = this.createProcess();
			process.process.on('disconnect', () => this.releaseCrashed(process));
			this.processes.push(process);
		}
	}
	respawn(count = null) {
		if (count === null) count = this.processes.length;
		const unspawned = this.unspawn();
		this.spawn(count);
		return unspawned;
	}
	

	destroyProcess(process) {}
	destroy() {
		const index = exports.processManagers.indexOf(this);
		if (index >= 0) exports.processManagers.splice(index, 1);
		return this.unspawn();
	}
} exports.ProcessManager = ProcessManager;

 class QueryProcessManager extends ProcessManager {
	
	

	/**
	 * @param timeout The number of milliseconds to wait before terminating a query. Defaults to 900000 ms (15 minutes).
	 */
	constructor(module, query, timeout = 15 * 60 * 1000) {
		super(module);
		this._query = query;
		this.timeout = timeout;

		exports.processManagers.push(this);
	}
	async query(input) {
		const process = this.acquire() ;

		if (!process) return this._query(input);

		const timeout = setTimeout(() => {
			const debugInfo = process.debug || "No debug information found.";
			process.destroy();
			throw new Error(
				`A query originating in ${this.basename} took too long to complete; the process has been killed.\n${debugInfo}`
			);
		}, this.timeout);

		const result = await process.query(input);

		clearTimeout(timeout);
		return result;
	}
	createProcess() {
		return new QueryProcessWrapper(this.filename);
	}
	listen() {
		if (this.isParentProcess) return;
		// child process
		process.on('message', (message) => {
			const nlLoc = message.indexOf('\n');
			if (nlLoc <= 0) throw new Error(`Invalid response ${message}`);
			const taskId = message.slice(0, nlLoc);
			message = message.slice(nlLoc + 1);

			if (taskId.startsWith('EVAL')) {
				// eslint-disable-next-line no-eval
				process.send(`${taskId}\n` + eval(message));
				return;
			}

			void Promise.resolve(this._query(JSON.parse(message))).then(
				response => process.send(`${taskId}\n${JSON.stringify(response)}`)
			);
		});
		process.on('disconnect', () => {
			process.exit();
		});
	}
} exports.QueryProcessManager = QueryProcessManager;

 class StreamProcessManager extends ProcessManager {
	/* taskid: stream used only in child process */
	
	

	constructor(module, createStream) {
		super(module);
		this.activeStreams = new Map();
		this._createStream = createStream;

		exports.processManagers.push(this);
	}
	createStream() {
		const process = this.acquire() ;
		if (!process) return this._createStream();
		return process.createStream();
	}
	createProcess() {
		return new StreamProcessWrapper(this.filename);
	}
	async pipeStream(taskId, stream) {
		let done = false;
		while (!done) {
			try {
				let value;
				({value, done} = await stream.next());
				process.send(`${taskId}\nPUSH\n${value}`);
			} catch (err) {
				process.send(`${taskId}\nTHROW\n${err.stack}`);
			}
		}
		if (!this.activeStreams.has(taskId)) {
			// stream.destroy() was called, don't send an END message
			return;
		}
		process.send(`${taskId}\nEND`);
		this.activeStreams.delete(taskId);
	}
	listen() {
		if (this.isParentProcess) return;
		// child process
		process.on('message', (message) => {
			let nlLoc = message.indexOf('\n');
			if (nlLoc <= 0) throw new Error(`Invalid request ${message}`);
			const taskId = message.slice(0, nlLoc);
			const stream = this.activeStreams.get(taskId);

			message = message.slice(nlLoc + 1);
			nlLoc = message.indexOf('\n');
			if (nlLoc < 0) nlLoc = message.length;
			const messageType = message.slice(0, nlLoc);
			message = message.slice(nlLoc + 1);

			if (taskId.startsWith('EVAL')) {
				// eslint-disable-next-line no-eval
				process.send(`${taskId}\n` + eval(message));
				return;
			}

			if (messageType === 'NEW') {
				if (stream) throw new Error(`NEW: taskId ${taskId} already exists`);
				const newStream = this._createStream();
				this.activeStreams.set(taskId, newStream);
				void this.pipeStream(taskId, newStream);
			} else if (messageType === 'DESTROY') {
				if (!stream) throw new Error(`DESTROY: Invalid taskId ${taskId}`);
				void stream.destroy();
				this.activeStreams.delete(taskId);
			} else if (messageType === 'WRITE') {
				if (!stream) throw new Error(`WRITE: Invalid taskId ${taskId}`);
				void stream.write(message);
			} else if (messageType === 'WRITEEND') {
				if (!stream) throw new Error(`WRITEEND: Invalid taskId ${taskId}`);
				void stream.writeEnd();
			} else {
				throw new Error(`Unrecognized messageType ${messageType}`);
			}
		});
		process.on('disconnect', () => {
			process.exit();
		});
	}
} exports.StreamProcessManager = StreamProcessManager;

 class RawProcessManager extends ProcessManager {
	/** full list of processes - parent process only */
	__init17() {this.workers = []}
	/** if spawning 0 worker processes, the worker is instead stored here in the parent process */
	__init18() {this.masterWorker = null}
	/** stream used only in the child process */
	__init19() {this.activeStream = null}
	
	__init20() {this.spawnSubscription = null}
	__init21() {this.unspawnSubscription = null}
	
	/** worker ID of cluster worker - cluster child process only (0 otherwise) */
	 __init22() {this.workerid = _optionalChain([cluster, 'access', _3 => _3.worker, 'optionalAccess', _4 => _4.id]) || 0}
	

	constructor(options




) {
		super(options.module);RawProcessManager.prototype.__init17.call(this);RawProcessManager.prototype.__init18.call(this);RawProcessManager.prototype.__init19.call(this);RawProcessManager.prototype.__init20.call(this);RawProcessManager.prototype.__init21.call(this);RawProcessManager.prototype.__init22.call(this);;
		this.isCluster = !!options.isCluster;
		this._setupChild = options.setupChild;
		this.env = options.env;

		if (this.isCluster && this.isParentProcess) {
			cluster.setupMaster({
				exec: this.filename,
				// @ts-ignore TODO: update type definition
				cwd: ROOT_DIR,
			});
		}

		exports.processManagers.push(this);
	}
	subscribeSpawn(callback) {
		this.spawnSubscription = callback;
	}
	subscribeUnspawn(callback) {
		this.unspawnSubscription = callback;
	}
	spawn(count) {
		super.spawn(count);
		if (!this.workers.length) {
			this.masterWorker = new StreamWorker(this._setupChild());
			this.workers.push(this.masterWorker);
			_optionalChain([this, 'access', _5 => _5.spawnSubscription, 'optionalCall', _6 => _6(this.masterWorker)]);
		}
	}
	createProcess() {
		const process = new RawProcessWrapper(this.filename, this.isCluster, this.env);
		this.workers.push(process);
		_optionalChain([this, 'access', _7 => _7.spawnSubscription, 'optionalCall', _8 => _8(process)]);
		return process;
	}
	destroyProcess(process) {
		const index = this.workers.indexOf(process);
		if (index >= 0) this.workers.splice(index, 1);

		_optionalChain([this, 'access', _9 => _9.unspawnSubscription, 'optionalCall', _10 => _10(process)]);
	}
	async pipeStream(stream) {
		let done = false;
		while (!done) {
			try {
				let value;
				({value, done} = await stream.next());
				process.send(value);
			} catch (err) {
				process.send(`THROW\n${err.stack}`);
			}
		}
	}
	listen() {
		if (this.isParentProcess) return;

		setImmediate(() => {
			this.activeStream = this._setupChild();
			void this.pipeStream(this.activeStream);
		});

		// child process
		process.on('message', (message) => {
			void this.activeStream.write(message);
		});
		process.on('disconnect', () => {
			process.exit();
		});
	}
} exports.RawProcessManager = RawProcessManager;
