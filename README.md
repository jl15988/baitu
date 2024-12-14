# 百涂工具（Baitu）


[![License](https://img.shields.io/npm/l/baitu?color=5470c6)](https://gitee.com/jl15988/baitu/blob/master/LICENSE) [![Latest npm release](https://img.shields.io/npm/v/baitu?color=91cc75)](https://www.npmjs.com/package/baitu) [![NPM downloads](https://img.shields.io/npm/dm/baitu.svg?label=npm%20downloads&style=flat&color=fac858)](https://www.npmjs.com/package/baitu)

一个小而全的前端工具包

A small and comprehensive front-end toolkit.

## Baitu v2.0 优化重构

由于 v 1.0 中存在方法过于繁重，意图不明确等问题，造成使用中效率低下等情况，现以简化方法、优化体积、提升效率为目标进行优化重构升级，敬请期待

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

```js
import {DateTime} from "baitu"

DateTime.create();
new DateTime();
```
