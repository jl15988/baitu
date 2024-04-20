---
title: NumberUtil - 数字工具
category:
 - 数字
tag:
 - 数字工具
---

## 1. fixed(number: number, fractionDigits: number)

保留两位小数，四舍五入

```js
let num = 3.1357
Baitu.NumberUtil.fixed(num, 1);
// 输出：3.1
Baitu.NumberUtil.fixed(num, 2);
// 输出：3.4
```


## 2. fixedCut(number: number, fractionDigits: number)

截取保留小数位，没有四舍五入，直接截取

```js
let num = 3.1357
Baitu.NumberUtil.fixedCut(num, 1);
// 输出：3.1
Baitu.NumberUtil.fixedCut(num, 2);
// 输出：3.3
```


## 3. floor(number: number)

向下取整

```js
let num = 3.1357
Baitu.NumberUtil.floor(num);
// 输出：3
```


## 4. ceil(number: number)

向上取整

```js
let num = 3.1357
Baitu.NumberUtil.ceil(num);
// 输出：4
```
