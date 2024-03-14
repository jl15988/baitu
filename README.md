# 百图工具（Baitu）

一个小而全的前端工具包

A small and comprehensive front-end toolkit.

## 介绍

Baitu，意名：百图、白图，由BaiTools谐音而来，指“白-工具”，“百个工具”，bai为本人开发者化名，tools为工具集。


## 由来

在一次前端开发中，因为对于日期操作比较复杂，需要对时间进行各种偏移、格式化等操作。通过后端开发的经验，联想到了后端Java的一个名为Hutool的开发工具包，于是对所需功能进行了封装，继而完善，形成了一个前端独有的工具包。


## 文档

注：所有通过Baitu访问的功能，都可以通过values方法获取，如：

```js
Baitu.DateTime.create();

// 可以写成
const {DateTime} = Baitu.values();
DateTime.create();
// 或者（前提是可通过new创建实例，部分功能不能通过new创建实例）
new DateTime();
```

|功能|文档|
|-|-|
|日期时间（DateTime）|[docs/modules/dateTime/DateTime.md](docs/modules/dateTime/DateTime.md)|
|日期工具（DateUtil）|[docs/modules/dateTime/DateUtil.md](docs/modules/dateTime/DateUtil.md)|
|文件工具（FileUtil）|[docs/modules/file/FileUtil.md](docs/modules/file/FileUtil.md)|
|节流（Throttle）|[docs/modules/common/Throttle.md](docs/modules/common/Throttle.md)|
|防抖（Debounce）|[docs/modules/common/Debounce.md](docs/modules/common/Debounce.md)|
|数字工具（NumberUtil）|[docs/modules/number/NumberUtil.md](docs/modules/number/NumberUtil.md)|
|对象工具（ObjectUtil）|[docs/modules/object/ObjectUtil.md](docs/modules/object/ObjectUtil.md)|
|字符串工具（StrUtil）|[docs/modules/string/StrUtil.md](docs/modules/string/StrUtil.md)|

更多功能开发中...
