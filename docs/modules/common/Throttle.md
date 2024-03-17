# Throttle - 节流

一段时间内只执行一次



## 1. 普通立即执行

普通方法默认为立即执行

```js
let num = 1;
button.addEventListener('click', () => {
    Baitu.Throttle.of(() => {
        ta1.value = num++;
    }, 3000)
});
```



## 2. 最后执行

通过设置immediate参数为false，取消立即执行，将在最后执行

```js
let num2 = 1;
bt2.addEventListener('click', () => {
    Baitu.Throttle.of(() => {
        ta2.value = num2++;
    }, 3000, false)
});
```



## 3. 闭包用法

闭包方式为内部返回了一个方法，用于提供调用

```js
bt3.addEventListener('click', Baitu.Throttle.with(() => {
    ta3.value = "闭包用法";
}, 3000));
```



## 4. 多实例

直接调用方法都是全局的，可能会发生相互影响问题，不过一般不会出现，为了提升多场景适应性，我们可以利用new方法创建多实例方式实现多场景使用

```js
const throttle = Baitu.Throttle.new();
button.addEventListener('click', () => {
    throttle.of(() => {
        console.log("普通用法");
    }, 3000);
});
button2.addEventListener('click', throttle.with((e) => {
    console.log("点击事件", e);
    console.log("普通用法");
}, 3000));
```



## 5. 参数

| 序号 | 名称      | 类型 | 含义                                                         |
| ---- | --------- | ---- | ------------------------------------------------------------ |
| 1    | fn        | 函数 | 用于执行逻辑                                                 |
| 2    | delay     | 数字 | 节流时长，单位毫秒，在该时长内，触发多次但只执行一次         |
| 3    | immediate | 布尔 | 是否立即执行，默认是。为true时，在delay时长内，第一次触发立即执行，后面的触发都不执行；为false时，最后一次触发执行，前面的触发都不执行 |

