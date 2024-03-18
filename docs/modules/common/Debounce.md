# Debounce - 防抖

无论多长时间，只有最后一次执行达到指定时长才执行

该防抖实现了全局防抖的唯一性，通过设置name值，即可使得多个防抖不会相互影响，且提供了闭包用法，可传递参数，无需层层嵌套，一行就可以解决。实现了防抖功能的快捷、多场景化的强大功能。



## 1. 参数

| 序号 | 名称  | 类型 | 含义                                                         |
| ---- | ----- | ---- | ------------------------------------------------------------ |
| 1    | fn    | 函数 | 用于执行逻辑                                                 |
| 2    | delay | 数字 | 防抖触发间隔时长，单位毫秒，多次触发间隔未超过当前时长不执行，长时则触发 |



## 1. 普通用法

普通用法为全局通用（多出同时使用会有所影响），直接调用of方法即可

```js
button.addEventListener('click', () => {
    Debounce.of(() => {
        console.log("普通用法");
    }, 3000);
});
```



## 2. 闭包方式

闭包方式为内部返回了一个方法，用于提供调用

闭包用法可接受传参

```js
button.addEventListener('click', Debounce.with((e) => {
    console.log("点击事件", e);
    console.log("闭包用法");
}, 3000));
```



## 3. 唯一性

为了防止两个防抖相互影响，可通过new方法设置name值来区分

```js
bt1.addEventListener('click', () => {
    Debounce.new('t1').of(() => {
        ta1.value = "普通用法";
    }, 2000)
    Debounce.of(() => {
        ta2.value = "普通用法2";
    }, 3000)
});
```



除了设置name，还可以通过创建多个Debounce来实现唯一性

```js
const debounce = Debounce.new();
const debounce2 = Debounce.new();
button.addEventListener('click', () => {
    debounce.of(() => {
        console.log("普通用法");
    }, 3000);
});
button2.addEventListener('click', debounce2.with((e) => {
    console.log("点击事件", e);
}, 3000));
```

