# ArrayUtil - 数组工具

## 1. repeat

将数组循环拼接

### 参数

|序号|名称|含义|
|-|-|-|
|1|arr|数组|
|2|count|循环次数|

### 示例
```js
const {ArrayUtil} = Baitu.values();
const res = ArrayUtil.repeat(['a', 1, 'c'], 3);
console.log(res);
// 输出：a1ca1ca1c
```
