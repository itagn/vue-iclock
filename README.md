# vue-iclock
<p>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/dm/vue-iclock.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/v/vue-iclock.svg.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/l/vue-iclock.svg.svg" alt="License"></a>
</p>

[DEMO](https://github.com/itagn/vue-iclock)
## Introduction
:rocket: a cute clock components with vuejs
## screenshot
you can try to move the mouse to the smiling face.  

    if you set display.type = 'clock'

![clock.png](https://github.com/itagn/vue-iclock/raw/master/img/clock.png)

    if you set display.type = 'text' && display.info = 'itagn' 

![text.png](https://github.com/itagn/vue-iclock/raw/master/img/text.png)

    if you set display.type is not 'clock' or 'text'

![error.png](https://github.com/itagn/vue-iclock/raw/master/img/error.png)

## Install
```text
//  by npm
$ npm install vue-iclock --save
//  by cnpm
$ cnpm install vue-iclock --save
//  by yarn
$ yarn add vue-iclock --save
```
## Usage
```javascript
<template>
    <iclock :display="clock"></iclock>
</template>
<script>
import { Iclock } from 'vue-iclock';
export default {
    components: {
        Iclock
    },
    data() {
        return {
            clock: {
                type: 'clock'
            }
        }
    }
}
</script>
```
## api
- `display`
In order to judge display clock or text by setting display  

        Type: Object
        Default: {
            type: 'clock',  //  value: 'clock' || 'text'
            info: 'o w o',
            fontColor: 'orange',
            fontSize: '1.5rem'
        }

## License
MIT © [itagn][3]
作者：微博 [@itagn][1] - Github [@itagn][2] 

[1]: https://weibo.com/p/1005053782707172
[2]: https://github.com/itagn
[3]: https://www.npmjs.com/~itagn