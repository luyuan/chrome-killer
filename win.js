'use strict';
const childProcess = require('child_process');
const pify = require('pify');
const execall = require('execall');
const TEN_MEBIBYTE = 1024 * 1024 * 10;

module.exports = opts => {
	opts = opts || {};

	const cmd = `wmic process where Caption='chrome.exe' get CommandLine,Name,ProcessId /format:list`;

	return pify(childProcess.exec)(cmd, {maxBuffer: TEN_MEBIBYTE})
		.then(stdout => 
			execall(/CommandLine=(.+)\s+Name=(.+)\s+ProcessId=(\d+)/g, stdout).map(x => ({
				cmd: x.sub[0],
				name: x.sub[1],
				pid: parseInt(x.sub[2], 10)
			}))
		);
};
