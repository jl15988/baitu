# 百涂工具（Baitu）


![](https://img.shields.io/badge/gitee-jl15988-000000?logo=gitee&link=https://gitee.com/jl15988) ![](https://img.shields.io/badge/gitee-baitu-000000?logo=gitee&link=https://gitee.com/jl15988/baitu) ![NPM](https://img.shields.io/npm/l/baitu) ![npm package minimized gzipped size (select exports)](https://img.shields.io/bundlejs/size/baitu) ![npm](https://img.shields.io/npm/v/baitu)

一个小而全的前端工具包

A small and comprehensive front-end toolkit.

## 介绍

Baitu，意名：百涂、百图、白图，意思为“各种途径”、“白-工具”、“百个工具”，指开发中有多种方式达成目标，而Baitu有多种工具提供支持，一应俱全，一本万利！Baitu由BaiTools谐音而来，bai为本人开发者化名，tools为工具集。


## 由来

在一次前端开发中，因为对于日期操作比较复杂，需要对时间进行各种偏移、格式化等操作。通过后端开发的经验，联想到了后端Java的一个名为Hutool的开发工具包，于是对所需功能进行了封装，继而完善，形成了一个前端独有的工具包。


## 使用

html
```html
// 注意：为了兼容性，建议添加对应版本，如：https://unpkg.com/baitu@1.1.1/lib/baitu.min.js
<script src="https://unpkg.com/baitu/lib/baitu.min.js"></script>
<script>
// your codes
</script>
```

npm安装
```sh
npm install baitu;
```

vue2
```js
import Baitu from "baitu";

Vue.prototype.$btu = Baitu;
```


组合式

```js
import {DateTime} from "baitu"

DateTime.create();
new DateTime();
```


## 文档

[http://www.jl15988.com/baitu-doc/](http://www.jl15988.com/baitu-doc/)

对于农历、及数字计算确保精度发现了两个开源的：[寿星天文历](https://github.com/sxwnl/sxwnl) 、[decimal.js](https://github.com/MikeMcl/decimal.js) ，因为功能复杂，有时间简单集成一下。

文档更新会有所延时，具体功能见具体代码，在 TypeScript 环境下，工具方法的 API 注释面面俱全。
更多功能开发中...
