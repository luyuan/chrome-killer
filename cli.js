#!/usr/bin/env node
'use strict';
const meow = require('meow');
const killTabs = require('./');

const cli = meow(`
  Usage
    $ kill-tabs

  Options
    --no-chromium            Don't kill tabs in Chromium
    --no-chrome              Don't kill tabs in Chrome
    --including-main-process Kill main browser process
    --instance-path          Specify path of Chrome/Chromium instance to kill
`);

killTabs(cli.flags);
