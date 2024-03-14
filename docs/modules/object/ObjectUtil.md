# ObjectUtil - 对象工具

## 1. isEmpty(value: any)

判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象等

```js
Baitu.ObjectUtil.isEmpty(null) // true
Baitu.ObjectUtil.isEmpty(undefined) // true
Baitu.ObjectUtil.isEmpty([]) // true
Baitu.ObjectUtil.isEmpty({}) // true
Baitu.ObjectUtil.isEmpty("") // true
Baitu.ObjectUtil.isEmpty(["1"]) // false
Baitu.ObjectUtil.isEmpty({key: "hello"}) // false
Baitu.ObjectUtil.isEmpty("hello") // false
```
