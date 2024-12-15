<h1 align="center">百涂工具（Baitu）</h1>

<p align="center">一个小而全的前端工具包<br>A small and comprehensive front-end toolkit.</p>

<p align="center">
<a href="https://gitee.com/jl15988/baitu/blob/master/LICENSE" target="_blank"><img src="https://img.shields.io/npm/l/baitu?color=5470c6"></a>
<a href="https://www.npmjs.com/package/baitu" target="_blank"><img src="https://img.shields.io/npm/v/baitu?color=91cc75"></a>
<a href="https://www.npmjs.com/package/baitu" target="_blank"><img src="https://img.shields.io/npm/dm/baitu.svg?label=npm%20downloads&style=flat&color=fac858"></a>
</p>

----

## Baitu v2.0 优化重构

由于 v 1.0 中存在方法过于繁重，意图不明确等问题，造成使用中效率低下等情况，现以简化方法、优化体积、提升效率为目标进行优化重构升级，敬请期待

----

## 介绍

Baitu，意名：百涂、百图、白图，意思为“各种途径”、“白-工具”、“百个工具”，指开发中有多种方式达成目标，而Baitu有多种工具提供支持，一应俱全，一本万利！Baitu由BaiTools谐音而来，bai为本人开发者化名，tools为工具集。

## 由来

在一次前端开发中，因为对于日期操作比较复杂，需要对时间进行各种偏移、格式化等操作。通过后端开发的经验，联想到了后端Java的一个名为Hutool的开发工具包，于是对所需功能进行了封装，继而完善，形成了一个前端独有的工具包。

----

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

----

## DateTime

从 `2.0` 版本开始，时间对象开始拥抱 [dayjs](https://day.js.org/)，对 `dayjs` 进行增强，降低使用门槛，提升开发效率。

DateTime 的存在是为了避免连续性日期操作使得代码过长且繁杂等问题，并提升可读性、可用性，增强对日期的获取、操作等功能。虽然
dayjs 已经很好用了，但是在使用方面感觉还是差点儿意思，通过对 dayjs 的增强使得对日期的操作更上一层楼。

为了使得对日期操作更加灵活，DateTime 方法返回的都是新的 DateTime 实例，不会对原实例造成影响。

```js
import {DateTime} from 'baitu'

const date = new DateTime()
// 获得当前天的开始时间
date.beginOfDay()
// 取差值
date.compare(new Date(2024, 3, 3))

// 设置时间字段
date.set("year", 2024).set("month", 6).set("date", 18)
// 或者
date.set({
    year: 2024,
    month: 6,
    date: 18
})
// 当然，Date 原生的方法也可以用
date.setFullYear(2024, 6, 18)

// 更多功能...
```

----

其他工具及功能将在 2.0 版本发布后的文档中查看，敬请期待！
