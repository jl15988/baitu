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

对于对象来说，其中的内容可能是多层嵌套的，深拷贝用于解决多层嵌套对象的复制问题，无论其中是**对象、函数还是数组**，都能完整的复制出另一份。

### 示例

```js
let obj1 = {
    p1: '1',
    p2: '2',
    p3: '3',
    p4: () => {
        return '5';
    }
}
let obj2 = {
    a1: 'a',
    a2: 'b'
}
let obj3 = {
    d1: obj1,
    ar: [obj1, obj2]
}
let obj4 = ObjectUtil.deepCopy(obj3)
let obj5 = {
    f1: ObjectUtil.deepCopy(obj2)
}

obj1.p1 = '4'
obj1.p4 = () => {
    return '6'
}
obj2.a1 = 'c'

console.log(obj1)
/*
{
    "p1": "4",
    "p2": "2",
    "p3": "3",
    "p4": () => {
    	return "6"
    }
}
*/
console.log(obj2)
/*
{
    "a1": "c",
    "a2": "b"
}
*/
console.log(obj3)
/*
非深拷贝，值发生变化
{
    "d1": {
        "p1": "4", // 变了
        "p2": "2",
        "p3": "3",
        "p4": () => {
            return "6" // 变了
        }
    },
    "ar": [
        {
            "p1": "4", // 变了
            "p2": "2",
            "p3": "3",
            "p4": () => {
                return "6" // 变了
            }
        },
        {
            "a1": "c", // 变了
            "a2": "b"
        }
    ]
}
*/
console.log(obj4)
/*
因为obj4是深拷贝出来的，所以不变
{
    "d1": {
        "p1": "1", // 没变
        "p2": "2",
        "p3": "3",
        "p4": () => {
            return "5" // 没变
        }
    },
    "ar": [
        {
            "p1": "1", // 没变
            "p2": "2",
            "p3": "3",
            "p4": () => {
                return "5" // 没变
            }
        },
        {
            "a1": "a", // 没变
            "a2": "b"
        }
    ]
}
*/
console.log(obj5)
/*
{
    "f1": {
        "a1": "a", // 没变
        "a2": "b"
    }
}
*/
```





## 3. 判空追加 - appendIfNotEmpty

在一些场景中，需要对一个对象进行追加响应的值，前提是这个对象不是空的，该方法就是为了简化了这个过程。



### 参数

| 序号 | 名称    | 类型     | 含义                                       |
| ---- | ------- | -------- | ------------------------------------------ |
| 1    | obj     | 任何对象 | 要判空的对象，最终结果将执行 toString 方法 |
| 2    | appends | 任意     | 要追加的值，追加时将执行 toString 方法     |

### 示例

```js
console.log(ObjectUtil.appendIfNotEmpty("苹果", "香蕉")) // 苹果香蕉
console.log(ObjectUtil.appendIfNotEmpty("", "香蕉")) // ''
console.log(ObjectUtil.appendIfNotEmpty(0, "香蕉")) // 0香蕉
console.log(ObjectUtil.appendIfNotEmpty(null, "香蕉")) // ''
console.log(ObjectUtil.appendIfNotEmpty({}, "香蕉")) // ''
```

