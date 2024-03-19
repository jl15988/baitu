# ArrayUtil - 数组工具

## 1. repeat

将数组循环拼接

### 参数

|序号|名称|类型|含义|
|-|-|-|-|
|1|arr|字符串或数字数组|数组|
|2|count|数字|循环次数|

### 示例
```js
const {ArrayUtil} = Baitu;
const res = ArrayUtil.repeat(['a', 1, 'c'], 3);
console.log(res);
// 输出：a1ca1ca1c
```



## 2. finalItem

获取数组的最后一个元素

### 参数

| 序号 | 名称        | 类型 | 含义                             |
| ---- | ----------- | ---- | -------------------------------- |
| 1    | arr         | 数组 | 数组                             |
| 2    | defaultItem | 任意 | 如果为空时，返回的默认值，非必传 |

### 示例

```js
const finalItem = ArrayUtil.finalItem(['a', "sa", "", () => {}, 3]);
console.log(finalItem)
// 输出：3
const finalItem2 = ArrayUtil.finalItem([], 2);
console.log(finalItem2)
// 输出：2
```



## 3. push

向数组中添加新的元素并返回，如果数组为空，则返回包含新元素的数组

### 参数

| 序号 | 名称 | 类型 | 含义               |
| ---- | ---- | ---- | ------------------ |
| 1    | arr  | 数组 | 数组               |
| 2    | item | 任意 | 向数组中添加的元素 |

### 示例

```js
let arr = null;
arr = ArrayUtil.push(arr, 2);
console.log(arr);
// 输出：[2]
```

