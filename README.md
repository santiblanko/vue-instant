# Vue Instant!

[![npm](https://img.shields.io/npm/v/vue-instant.svg) ![npm](https://img.shields.io/npm/dm/vue-instant.svg)](https://www.npmjs.com/package/vue-instant)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

vue instant allows you to easily create custom search controls with auto suggestions for your vue 2 applications.

[![header](http://g.recordit.co/Yeg0Bl0nJO.gif)](https://santiblanko.github.io/vue-instant/)

If this implementation looks great you can share a beer using [patreon](https://patreon.com/santiblanko?utm_medium=clipboard_copy&utm_source=copyLink&utm_campaign=creatorshare_creator) or send me bitcoins.

 ## Donations for v2
### Bitcoin direction: 
31p39e3AtdEv8T2aU9y9D1XH9Wc5HEtRte

I will be enormously grateful. :) Also I am available for capacitations, keycloak courses and projects!! 
<b>Whatsapp :) +573233729549</b>


## Table of contents

- [Examples](#examples)
- [Installation](#installation)

# Examples

Project page

https://santiblanko.github.io/vue-instant

Fiddle with all attributes and events

https://jsfiddle.net/santiblanko/dqo6vr57

If you need a example using webpack see the example folder.

# Installation

```
npm install --save vue-instant
```

## Default import
If you need more details see the examples folder.

Install all the components:

```javascript
import Vue from 'vue'
import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant'
Vue.use(VueInstant)
```
**⚠️ You need to configure your bundler to compile `.vue` files.** More info [in the official documentation](https://vuejs.org/v2/guide/single-file-components.html).

## Browser
If you need more details see the examples folder.

```html
<link rel="stylesheet" href="vue-instant/dist/vue-instant.css"/>

<script src="vue.js"></script>
<script src="vue-clickaway.js"></script>
<script src="vue-instant/dist/vue-instant.browser.js"></script>
```



