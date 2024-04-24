---
title: StrUtil - 字符串工具
category:
 - 字符串
tag:
 - 字符串工具
---

## 1. isBlank(str: string)

判断字符串是否为：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）


## 2. isNotBlank(str: string)

判断字符串为非：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）


## 3. isEmpty(str: string)

判断字符串为空字符串


## 4. isNotEmpty(str: string)

判断字符串非空字符串


## 5. getPadStr(str: string, len: number, pad?: string)

获取需要额外填充的字符串

参数
- str 字符串
- len 目标长度
- pad 要填充的字符串，非必填，默认空格


## 6. padStart(str: string, len: number, pad?: string)

在字符串开始填充额外的字符串

参数
- str 字符串
- len 目标长度
- pad 要填充的字符串，非必填，默认空格


## 7. padEnd(str: string, len: number, pad?: string)

在字符串结束填充额外的字符串

参数
- str 字符串
- len 目标长度
- pad 要填充的字符串，非必填，默认空格


## 8. chunk(str: string, chunkSize: number)

按长度分割字符串转为数组

参数
- str 字符串 
- chunkSize 分割长度


## 9. chunkCount(str: string, count: number)

分割字符串为固定长度数组

参数
- str 字符串
- count 数组长度



## 10. 驼峰转连字符 - toKebab



### 参数

| 序号 | 名称   | 类型   | 含义           |
| ---- | ------ | ------ | -------------- |
| 1    | str    | 字符串 | 要转换的字符串 |
| 2    | spacer | 字符串 | 连字符         |

### 示例

```js
console.log(StrUtil.toKebab("marginBottom")) // margin-bottom
console.log(StrUtil.toKebab("marginBottom", "_")) // margin_bottom
console.log(StrUtil.toKebab("dfjhdsfoijedf")) // dfjhdsfoijedf
```



## 11. 连字符转驼峰 - toHump



### 参数

| 序号 | 名称    | 类型   | 含义           |
| ---- | ------- | ------ | -------------- |
| 1    | str     | 字符串 | 要转换的字符串 |
| 2    | spacers | 字符串 | 要转化的连字符 |

### 示例

```js
console.log(StrUtil.toHump("margin-bottom")) // marginBottom
console.log(StrUtil.toHump("marginBottom", "B")) // marginOttom
console.log(StrUtil.toHump("marginBottom")) // marginBottom
console.log(StrUtil.toHump("dfjhdsfoijedf")) // dfjhdsfoijedf
```



## 12. 格式化 - format

格式化字符串，学习后端的小伙伴都知道 `slf4j` ，可以利用 `{}` 作为占位符来替换对应的字符串。

### 参数

| 序号 | 名称 | 类型               | 含义           |
| ---- | ---- | ------------------ | -------------- |
| 1    | str  | 字符串             | 要处理的字符串 |
| 2    | args | 剩余参数（...any） | 替换占位符项   |

### 示例

```js
let s = "Baitu {}，好用，真{}"
console.log(StrUtil.format(s)) // Baitu {}，好用，真{}
console.log(StrUtil.format(s, "工具", "好用")) // Baitu 工具，好用，真好用
console.log(StrUtil.format(s, "工具", "好用", "啊啊啊")) // Baitu 工具，好用，真好用
console.log(StrUtil.format("苹果，香蕉，栗子", "工具", "好用", "啊啊啊")) // 苹果，香蕉，栗子
console.log(s) // Baitu {}，好用，真{}
```



## 13. 字符串 Map 格式化 - formatMap

相对普通格式化来说，Map 格式化的优点很出众，它支持传入对象格式来格式化字符串。

### 参数

| 序号 | 名称 | 类型          | 含义             |
| ---- | ---- | ------------- | ---------------- |
| 1    | str  | 字符串        | 要格式化的字符串 |
| 2    | map  | JSON 格式对象 | 格式化参数对象   |

### 示例

```js
const s2 = "苹果价格：{price}，有{num}个{num3}"
console.log(StrUtil.formatMap(s2, {
    price: 5,
    num: 100
})) // 苹果价格：5，有100个{num3}
console.log(StrUtil.formatMap(s2)) // 苹果价格：{price}，有{num}个{num3}
console.log(s2) // 苹果价格：{price}，有{num}个{num3}
```

