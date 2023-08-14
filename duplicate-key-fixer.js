const fs = require("fs");
const readline = require("readline");

const fileLimit = 999;
let filesRead = 0;

const modPath = 'data/mods/';
const modDir = fs.readdirSync(modPath);
// const debug = true;
const debug = false;

function debugMsg( str ){
	if (debug) console.log(str);
}

function removeDuplicateKeys(modName, fileName, log = true, writeAnyway = false) {
	const filePath = modPath + modName + '/' + fileName + '.ts';
	if (!fs.existsSync(filePath)){
		debugMsg("No " + fileName + " file for: " + modName);
		return;
	}
	const writePath = modPath + modName + '/' + fileName + '2.ts'
	const writeFile = fs.createWriteStream(writePath); // creates a new file with duplicate key lines ommitted
	let lSetFile = null;
	try {
		lSetFile = readline.createInterface({
			input : fs.createReadStream(filePath),
		});
		lSetFile.on('close', function () {
			debugMsg("finished checking: " + filePath);
			new Promise(resolve => setTimeout(resolve, 1000)).then(() => { // deletes the original file, then renames the new file to replace it
				fs.rmSync(filePath);
				fs.rename(writePath, filePath, function(err){
					debugMsg("file replaced: " + filePath);
					if (err) debugMsg(err);
				});
			});
		});
	} catch (err) {}
	if (lSetFile) {
		let indent = 0; // keeps track of keys per object
		let keys = []; // where keys are stored
		let lineNumOriginal = 0 // for logging purposes, the line of the original file that was removed
		let key = "";
		lSetFile.on('line', function (text) { // reads a line from the original file
			lineNumOriginal++;
			let skipIndent = false; // used when detecting duplicate keys that are objects
			if (!keys[indent]){ // a new object is detected
				keys[indent] = {};
				keys[indent].multiLine = false; // keeps track of keys that are multi-line arrays
				keys[indent].multiLineObj = false // keeps track of multi-line objects (**only when they are duplicate keys**)
				keys[indent].multiLineWrite = false; // keeps track of whether a multiline array is a duplicate key
				keys[indent].multiLineLog = false; // keeps track of whether a duplicate multiline array or object has been logged already
			}
			if (!keys[indent].multiLineObj){ // if the value of a duplicate key is an object, don't check for duplicate keys within said object
				if (text.includes("[") && !text.includes("]")){ // detect the start of a multi-line array
					keys[indent].multiLine = true;
					key = text.split(":")[0].trim();
				}
				
				if (keys[indent].multiLine && text.includes("]")) { // detect the end of a multi-line array
					keys[indent].multiLine = false;
					keys[indent].multiLineWrite = false;
					keys[indent].multiLineLog = false;
				}
				if (!keys[indent].multiLine){ // key shouldn't change if we are in the middle of a multiline array or object
					key = text.split(":")[0].trim();
				}
			}
			if (!keys[indent][key] // if this line represents a new key, or some other piece of code that needs to stay
				|| (!keys[indent].multiLine && !keys[indent].multiLineObj && !text.includes(":"))
				|| key.charAt(0) == '{'
				|| key.charAt(0) == '/'
				|| key.charAt(0) == '*'
				|| key == '],'
				|| key == '},'
				|| key == ''
				|| key == '\t'
				|| keys[indent].multiLineWrite
			) {
				if (keys[indent].multiLine) keys[indent].multiLineWrite = true; // set this so it will write the rest of a multiline array
				keys[indent][key] = true; // keep track of the keys within this object
				writeFile.write(text + '\r\n');
			} else {
				if (text.includes(":") && text.split(":")[1].includes("{")) keys[indent].multiLineObj = true; // duplicate key is an object
				if ((!keys[indent].multiLine && !keys[indent].multiLineObj) || !keys[indent].multiLineLog) {
					if (log){
						console.log("duplicate key removed: " + key + " at line: " + lineNumOriginal);
						console.log("The mod was: " + modName);
					}
					if (keys[indent].multiLine || keys[indent].multiLineObj) keys[indent].multiLineLog = true;
				}
				if (keys[indent].multiLineObj && text.includes("},")) { // end of duplicate key that is an object
					debugMsg("end of multiline object");
					keys[indent].multiLineObj = false
					keys[indent].multiLineLog = false
					skipIndent = true;
				}
				if (writeAnyway) writeFile.write(text + '\r\n');
			} 
			if (keys[indent].multiLineObj) skipIndent = true;
			if (text.includes('{') && !skipIndent){
				indent++;
			}
			if (text.includes('}') && !skipIndent){
				indent--;
				for (const j in keys){
					if (j > indent) delete keys[j];
				}
			}
		});
	}
}

for (const i in modDir) {
	if (filesRead >= fileLimit) break;
	const modName = modDir[i];
	removeDuplicateKeys(modName, 'learnsets');
	// removeDuplicateKeys(modName, 'formats-data', true, true);
	filesRead++;
}