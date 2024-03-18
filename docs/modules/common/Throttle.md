# Throttle - 节流

一段时间内只执行一次

与防抖一样，同样支持闭包、全局唯一性，且提供是否立即执行参数适配多场景，简单、快捷！



## 1. 参数

| 序号 | 名称      | 类型 | 含义                                                         |
| ---- | --------- | ---- | ------------------------------------------------------------ |
| 1    | fn        | 函数 | 用于执行逻辑                                                 |
| 2    | delay     | 数字 | 节流时长，单位毫秒，在该时长内，触发多次但只执行一次         |
| 3    | immediate | 布尔 | 是否立即执行，默认是。为true时，在delay时长内，第一次触发立即执行，后面的触发都不执行；为false时，最后一次触发执行，前面的触发都不执行 |



## 2. 普通立即执行

普通方法默认为立即执行

```js
let num = 1;
button.addEventListener('click', () => {
    Throttle.of(() => {
        ta1.value = num++;
    }, 3000)
});
```



## 3. 最后执行

通过设置immediate参数为false，取消立即执行，将在最后执行

```js
let num2 = 1;
bt2.addEventListener('click', () => {
    Throttle.of(() => {
        ta2.value = num2++;
    }, 3000, false)
});
```



## 4. 闭包用法

闭包方式为内部返回了一个方法，用于提供调用

```js
bt3.addEventListener('click', Throttle.with(() => {
    ta3.value = "闭包用法";
}, 3000));
```



## 5. 唯一性

直接调用方法都是全局的，可能会发生相互影响问题，为了提升多场景适应性，我们可以利用new方法实现唯一性

通过设置name

```js
Throttle.new('1').of(() => console.log('1'));
Throttle.new('2').of(() => console.log('2'));
```



或创建多个实例

```js
const throttle1 = Throttle.new();
const throttle2 = Throttle.new();
button.addEventListener('click', () => {
    throttle1.of(() => {
        console.log("普通用法");
    }, 3000);
});
button2.addEventListener('click', throttle2.with((e) => {
    console.log("点击事件", e);
}, 3000));
```

