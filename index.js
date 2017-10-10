'use strict';
const fkill = require('fkill');
let psList = require('ps-list');

function isMainProcess(cmd) {
	return !cmd.includes('--type');
}

function isChromium(cmd) {
	return cmd.includes('prod=Chromium');
}

function isChrome(cmd) {
	return cmd.includes('prod=Chrome');
}

const processes = {
	chrome: process.platform === 'darwin' ? 'Chrome Helper' : 'chrome',
	chromium: process.platform === 'darwin' ? 'Chromium Helper' : 'chromium'
};

if (process.platform === 'win32') {
	processes.chrome = processes.chromium = 'chrome.exe';
	psList = require('./win');
}


module.exports = opts => {
	opts = opts || {};
	typeof opts.chrome === 'undefined' && (opts.chrome = true);
	typeof opts.chromium === 'undefined' && (opts.chromium = true);

	return psList().then(list => {
		if (opts.includingMainProcess && process.platform === 'darwin') {
			processes.chrome = 'Chrome';
			processes.chromium = 'Chromium';
		}

		if (opts.chromium === false) {
			delete processes.chromium;
		}

		if (opts.chrome === false) {
			delete processes.chrome;
		}

		const pids = list
		.filter(x => {
				return Object.keys(processes).some(name => 
					x.name === processes[name]) &&
					(!opts.instancePath ||
					(opts.instancePath && opts.instancePath === x.cmd)) &&
					((opts.includingMainProcess && isMainProcess(x.cmd)) ||
					(!opts.includingMainProcess &&
					x.cmd.includes('--type=renderer') &&
					!x.cmd.includes('--extension-process')))
				})
			.map(x => x.pid);

		return fkill(pids, {force: true});
	});
};