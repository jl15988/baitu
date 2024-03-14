# 防抖

无论多长时间，只有最后一次执行达到指定时长才执行

## 1. 普通用法

普通用法为全局通用，直接调用of方法即可

```js
button.addEventListener('click', () => {
    Baitu.Debounce.of(() => {
        console.log("普通用法");
    }, 3000);
});
```

## 2. 闭包方式

闭包方式为内部返回了一个方法，用于提供调用

```js
button.addEventListener('click', Baitu.Debounce.with(() => {
    console.log("闭包用法");
}, 3000));
```

## 3. 多实例用法

前两种方式都是全局的，可能会发生相互影响问题，不过一般不会出现，为了提升多场景适应性，我们可以利用多实例方式实现多场景使用

```js
const debounce = Baitu.Debounce.new();
button.addEventListener('click', () => {
    debounce.of(() => {
        console.log("普通用法");
    }, 3000);
});
button2.addEventListener('click', debounce.with((e) => {
    console.log("点击事件", e);
    console.log("普通用法");
}, 3000));
```
