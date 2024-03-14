# Baitu

一个小而全的前端工具包

A small and comprehensive front-end toolkit.

## 介绍

Baitu，意名：百图、白图，由BaiTools谐音而来，指“白-工具”，“百个工具”，bai为本人开发者化名，tools为工具集。


## 文档

注：所有通过Baitu访问的功能，如果有window环境，都可以直接访问，如：

```js
Baitu.DateTime.create();
// 可以写成
DateTime.create();
// 或者（前提是可通过new创建实例，部分功能不能通过new创建实例）
new DateTime();
```

|功能|文档|
|-|-|
|节流|[docs/modules/common/Throttle.md](docs/modules/common/Throttle.md)|
|防抖|[docs/modules/common/Debounce.md](docs/modules/common/Debounce.md)|
