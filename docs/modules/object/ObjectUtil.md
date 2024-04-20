---
title: ObjectUtil - 对象工具
category:
 - 对象
tag:
 - 对象工具
---

## 1. 判空 - isEmpty

判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等

### 参数

|序号|名称|类型|含义|
|-|-|-|-|
|1|value|任意类型|要判空的值|

### 示例

```js
ObjectUtil.isEmpty(null) // true
ObjectUtil.isEmpty(undefined) // true
ObjectUtil.isEmpty([]) // true
ObjectUtil.isEmpty({}) // true
ObjectUtil.isEmpty("") // true
ObjectUtil.isEmpty(["1"]) // false
ObjectUtil.isEmpty({key: "hello"}) // false
ObjectUtil.isEmpty("hello") // false
```



## 2. 深拷贝 - deepCopy

对象深拷贝
