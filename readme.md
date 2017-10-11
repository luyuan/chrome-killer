# chrome-killer (from kill-tabs)

> Kill all Chrome/Chromium tabs or entires to improve performance, decrease battery usage, and save memory

*Works on macOS, Linux, Windows.*

When you run `kill-chrome` the Chrome tab processes are killed, which means they will no longer take up system resources, but they will still be in your Chrome window, just as crashed. When you want one back you just reload the tab.


## CLI

```
$ npm install --global chrome-killer
```

```
$ chrome-killer --help

  Usage
    $ chrome-killer

  Options
    --no-chromium            Don't kill tabs in Chromium
    --no-chrome              Don't kill tabs in Chrome
    --including-main-process Kill main browser process
    --instance-path          Specify path of Chrome/Chromium instance to kill
```


## API

```
$ npm install --save chrome-killer
```

```js
const chromeKiller = require('chrome-killer');

chromeKiller().then(() => {
	console.log('Killed tabs');
});
```


## Tip

You can use the [Reload All Tabs](https://chrome.google.com/webstore/detail/reload-all-tabs/lgpdljdpanfecnpindkbnikegohoobci) Chrome extension to easily reload all the tabs.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
MIT © [Lu Yuan](mailto:luyuan.china@gmail.com)
