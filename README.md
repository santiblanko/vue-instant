# vue-instant

[![npm](https://img.shields.io/npm/v/vue-instant.svg) ![npm](https://img.shields.io/npm/dm/vue-instant.svg)](https://www.npmjs.com/package/vue-instant)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

vue instant allows you to easily create search controls with auto suggest for your vue application.
## Table of contents

- [Example](#example)
- [Installation](#installation)

# Example
https://santiblanko.github.io/vue-instant


# Installation

```
npm install --save vue-instant
```

## Default import
If you need more details see the examples folder.
Install all the components:

```javascript
import Vue from 'vue'
import VueInstant from 'vue-instant'
import 'vue-instant/dist/vue-instant.css'
Vue.use(VueInstant)
```

## Browser
If you need more details see the examples folder.

```html
<link rel="stylesheet" href="vue-instant/dist/vue-instant.css"/>

<script src="vue.js"></script>
<script src="vue-instant/dist/vue-instant.browser.js"></script>
```

The plugin should be auto-installed. If not, you can install it manually with the instructions below.

Install all the components:

```javascript
Vue.use(VueInstant)
```

**⚠️ You need to configure your bundler to compile `.vue` files.** More info [in the official documentation](https://vuejs.org/v2/guide/single-file-components.html).

## License

MIT © [Santiago Blanco](http://twitter.com/santiblanko)
