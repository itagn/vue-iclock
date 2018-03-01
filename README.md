# vue-iclock
<p>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/dm/vue-iclock.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/v/vue-iclock.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/l/vue-iclock.svg" alt="License"></a>
</p>

## Introduction
:rocket: a cute clock components with vuejs
## screenshot
Try to move the mouse to the face.  

    if you set display.type = 'clock' && set display.language = 'zh' or 'en'

![clock-zh.png](https://github.com/itagn/vue-iclock/raw/master/img/clock-zh.png) ![clock-en.png](https://github.com/itagn/vue-iclock/raw/master/img/clock-en.png)

    if you set display.type = 'text' && set display.info = 'Itagn' 

![text.png](https://github.com/itagn/vue-iclock/raw/master/img/text.png)

    if you want to change the expression, and set display.emoji = 'angry'

![angry.png](https://github.com/itagn/vue-iclock/raw/master/img/angry.png)

    let the cute clock wear glasses

![glasses.png](https://github.com/itagn/vue-iclock/raw/master/img/glasses.png)

    if you set display is invalid

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
    <iclock :display="clock" id="clock"></iclock>
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
                type: 'clock',
                className: '#clock',
                emoji: 'smile',
                glasses: false
            }
        }
    }
}
</script>
<style>
#clock{
    position: absolute;
    top: 0;
    left: 0;
}
</style>
```
## Api
- `display`  

In order to judge display clock or text by setting display  

        Type: Object
        Default: {
            type: 'clock',  //  value: 'clock' || 'text'
            info: 'o w o',  //  if this.type is 'text', and show this.info
            className: '',  //  set className when more than one iclock component on the page
            scale: 1,  //  Magnification
            emoji: 'smile',  //  value: 'smile' || 'angry'
            glasses: false,  //  Choose whether to wear glasses
            language: 'en',  //  language
            dateColor: '#999',  //  set date-color
            fontColor: 'orange',  //  set font-color
            fontSize: '1.5rem',  //  set font-size
            fontStyle: 'Helvetica,"Microsoft YaHei"' // set font-family
        }

## Contributing

1. Fork it!
1. Create your feature branch: git checkout -b my-new-feature
1. Commit your changes: git commit -am 'Add some feature'
1. Push to the branch: git push origin my-new-feature
1. Submit a pull request :D

## License
MIT © [itagn][1]  
作者：微博 [@itagn][2] - Github [@itagn][3] 

[1]: https://www.npmjs.com/~itagn
[2]: https://weibo.com/p/1005053782707172
[3]: https://github.com/itagn