# Named.css Webpack Plugin
using [named.css](https://www.npmjs.com/package/named.css) as a webpack plugin

[![npm](https://img.shields.io/npm/v/named.css-webpack.svg)](https://www.npmjs.com/package/named.css-webpack)
[![npm](https://img.shields.io/npm/dm/named.css-webpack.svg)](https://www.npmjs.com/package/named.css-webpack)
[![GitHub stars](https://img.shields.io/github/stars/ardalanamini/named.css-webpack.svg)](https://github.com/ardalanamini/named.css-webpack/stargazers)
[![license](https://img.shields.io/github/license/ardalanamini/named.css-webpack.svg)](https://github.com/ardalanamini/named.css-webpack/blob/master/LICENSE)

[TOC]

## Installation
```bash
npm i -D named.css-webpack
```

## Usage
in your `webpack.config.js` file just add the plugin
```javascript
const NamedCSS = require('named.css-webpack')

const config = {
  ...,
  plugins: [
    ...,
    new NamedCSS('ncss-'), // prefix ('ncss-') is not required
	...,
  ]
};

module.exports = config;
```

*****

** It's not production ready yet**

but if you liked it help me make it stable and ready ;)
