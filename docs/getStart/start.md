---
title: 快速上手
icon: lightbulb
category:
- 使用指南
---

## 普通使用

```js
Baitu.DateTime.create();

// 可以写成
const {DateTime} = Baitu;
DateTime.create();
// 或者（前提是可通过new创建实例，部分功能不能通过new创建实例）
new DateTime();
```

## Vue 中使用

```js
import Baitu from "baitu";

// vue2
Vue.prototype.$btu = Baitu;
// vue3
app.config.globalProperties.$btu = Baitu;
```

## 组合式

```js
import {DateUtil} from "baitu"

console.log(DateUtil.daysOfMonth(DateUtil.date()))
```
