---
title: ArrayUtil - 数组工具
category:
 - 数组
tag:
 - 数组
---

## 1. 循环拼接 - repeat

将数组循环拼接

### 参数

|序号|名称|类型|含义|
|-|-|-|-|
|1|arr|字符串或数字数组|要处理的数组|
|2|count|数字|循环次数|

### 示例
```js
const res = ArrayUtil.repeat(['a', 1, 'c'], 3);
console.log(res);
// 输出：a1ca1ca1c
```



## 2. 尾部元素 - finalItem

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



## 3. 追加 - push

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


## 4. 判空 - isEmpty

判断数组是否为空数组

### 参数

| 序号 | 名称  | 类型 | 含义         |
| ---- | ----- | ---- | ------------ |
| 1    | array | 数组 | 要判空的数组 |

### 示例

```js
console.log(ArrayUtil.isEmpty([2])) // 结果：false
console.log(ArrayUtil.isEmpty([])) // 结果：true
console.log(ArrayUtil.isEmpty(null)) // 结果：true
console.log(ArrayUtil.isEmpty(undefined)) // 结果：true
```



## 5. 非空 - isNotEmpty

判断数组为非空数组

::: info

参数，与 isEmpty 相同，实际上是 isEmpty 结果的取反

:::



## 6. 空数组替换 - defaultIfEmpty

如果数组为空则替换，否则直接返回

### 参数

| 序号 | 名称         | 类型 | 含义                         |
| ---- | ------------ | ---- | ---------------------------- |
| 1    | array        | 数组 | 判空的数组                   |
| 2    | defaultArray | 数组 | 当判空数组为空时，返回的数组 |

### 示例

```js
console.log(ArrayUtil.defaultIfEmpty([], [1])) // 结果：[1]
console.log(ArrayUtil.defaultIfEmpty(null, [2])) // 结果：[2]
console.log(ArrayUtil.defaultIfEmpty(undefined, [3])) // 结果：[3]
console.log(ArrayUtil.defaultIfEmpty([6], [4])) // 结果：[6]
```



## 7. 固长首部追加 - fixedUnshift

固定长度首部添加元素，返回删除的元素（向数组开头添加元素，如果长度超出指定长度，则删除尾部元素）

### 参数

| 序号 | 名称  | 类型            | 含义         |
| ---- | ----- | --------------- | ------------ |
| 1    | array | 数组            | 数组         |
| 2    | len   | 数字            | 固定的长度   |
| 3    | items | 剩余参数（...） | 要添加的元素 |

### 示例

```js
let arr2 = [2, 3]
console.log(ArrayUtil.fixedUnshift(arr2, 3, 4, 5, 6)) // 结果：[2,3]
console.log(arr2) // 结果：[6,5,4]
```



## 8. 固长追加 - fixedPush

固定长度尾部添加元素，返回删除的元素（向数组最后添加元素，如果长度超出指定长度，则删除首部元素）

::: info

参数、结果与 fixedUnshift 相同，仅追加位置不同

:::

### 示例

```js
let arr3 = [2, 3]
console.log(ArrayUtil.fixedPush(arr3, 3, 4, 5, 6)) // 结果：[2,3]
console.log(arr3) // 结果：[4,5,6]
```



## 9. 深拷贝 - deepCopy

数组深拷贝
