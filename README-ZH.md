# vue-iclock
<p>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/dm/vue-iclock.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/v/vue-iclock.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vue-iclock.svg"><img src="https://img.shields.io/npm/l/vue-iclock.svg" alt="License"></a>
</p>

## 介绍
:rocket: 可爱的vue时钟组件  

[English doc](https://github.com/itagn/vue-iclock/blob/master/README.md)  

## DEMO
[DEMO](https://itagn.github.io/vue-iclock/dist/index)  

## Screenshot
你可以试着把鼠标移动到表情上

    你可以设置type: 'scroll'和设置 language: 'zh' or 'en'，设置hoverAnimation: true

![clock-zh.png](https://github.com/itagn/vue-iclock/raw/master/img/clock-zh.png) ![clock-en.png](https://github.com/itagn/vue-iclock/raw/master/img/clock-en.png)

    你可以设置type: 'text'和设置info: 'Itagn' 

![text.png](https://github.com/itagn/vue-iclock/raw/master/img/text.png)

    如果你想给时钟换一个表情，你应该设置emoji: 'angry' 或者 'jiong'

![angry.png](https://github.com/itagn/vue-iclock/raw/master/img/angry.png) ![jiong.png](https://github.com/itagn/vue-iclock/raw/master/img/jiong.png)

    想让时钟戴眼镜，你应该设置glasses: true

![glasses.png](https://github.com/itagn/vue-iclock/raw/master/img/glasses.png)

    如果你的数据不符合规则

![error.png](https://github.com/itagn/vue-iclock/raw/master/img/error.png)

## 安装
```text
//  通过npm安装
$ npm install vue-iclock --save
//  通过cnpm安装
$ cnpm install vue-iclock --save
//  通过yarn安装
$ yarn add vue-iclock --save
```
## 使用
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
                hoverAnimation: true,
                glasses: false,
                scale: 1
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
## 接口
- `display`  

你可以跟着下面的说明进行设置  

    lei: Object
    Default: {
        type: 'scroll',  //  显示类型，值为 'scroll' || 'text' || 'clock'
        info: 'o w o',  //  如果type的值是text，那么显示info的数据
        className: '',  //  当你的一个页面有多个时钟组件的时候，通过设置class来区别他们
        scale: 1,  //  放大缩小的倍数
        emoji: 'smile',  //  表情，值为 'smile' || 'angry' || 'jiong'
        glasses: false,  //  设置是否戴眼镜
        hoverAnimation: fasle,  //  设置是否给时钟添加一个hover动画
        language: 'zh',  //  时间风格通过语言来判断, 值为: 'zh' || 'en'
        dateColor: '#999',  //  设置日期的颜色
        fontColor: 'orange',  //  设置字体的颜色
        fontSize: '1.5rem',  //  设置字体的颜色
        fontStyle: 'Helvetica,"Microsoft YaHei"' // 设置字体风格
    }

## 贡献

1. Fork 它吧!
1. 创建你的个性分支: git checkout -b my-new-feature
1. 提交你的更改: git commit -am 'Add some feature'
1. Push到你的分支: git push origin my-new-feature
1. 提交一个pull request :D

## License
MIT © [itagn][1]  
作者: 微博 [@itagn][2] - Github [@itagn][3] 

[1]: https://www.npmjs.com/~itagn
[2]: https://weibo.com/p/1005053782707172
[3]: https://github.com/itagn



