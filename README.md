# 百涂工具（Baitu）

一个小而全的前端工具包

A small and comprehensive front-end toolkit.

**注意：** 工具仍在开发测试阶段...

## 介绍

Baitu，意名：百涂、百图、白图，意思为“各种途径”、“白-工具”、“百个工具”，指开发中有多种方式达成目标，而Baitu有多种工具提供支持，一应俱全，一本万利！Baitu由BaiTools谐音而来，bai为本人开发者化名，tools为工具集。


## 由来

在一次前端开发中，因为对于日期操作比较复杂，需要对时间进行各种偏移、格式化等操作。通过后端开发的经验，联想到了后端Java的一个名为Hutool的开发工具包，于是对所需功能进行了封装，继而完善，形成了一个前端独有的工具包。


## 使用

html
```html
// 注意：为了兼容性，建议添加对应版本，如：https://unpkg.com/baitu@1.1.1/lib/baitu.min.js
<script src="https://unpkg.com/baitu/lib/baitu.min.js"></script>
<script>
// your code
</script>
```

npm安装
```sh
npm install baitu;
```

vue2
```js
import Baitu from "baitu";

Vue.prototype.$btu = Baitu;
```


通过putTo方法可以快速挂载工具
```js
import Baitu from "baitu";

Baitu.putTo((k, tool) => {
    Vue.prototype[k] = tool;
    // 或者
    window[k] = tool;
});
```


所有通过Baitu访问的功能，都可以通过values方法获取，如：

```js
Baitu.DateTime.create();

// 可以写成
const {DateTime} = Baitu.values();
DateTime.create();
// 或者（前提是可通过new创建实例，部分功能不能通过new创建实例）
new DateTime();
```


## 文档

|功能|文档|
|-|-|
|日期时间（DateTime）|[DateTime.md](docs/modules/dateTime/DateTime.md)|
|日期工具（DateUtil）|[DateUtil.md](docs/modules/dateTime/DateUtil.md)|
|文件工具（FileUtil）|[FileUtil.md](docs/modules/file/FileUtil.md)|
|防抖（Debounce）|[Debounce.md](docs/modules/common/Debounce.md)|
|节流（Throttle）|[Throttle.md](docs/modules/common/Throttle.md)|
|数字工具（NumberUtil）|[NumberUtil.md](docs/modules/number/NumberUtil.md)|
|对象工具（ObjectUtil）|[ObjectUtil.md](docs/modules/object/ObjectUtil.md)|
|字符串工具（StrUtil）|[StrUtil.md](docs/modules/string/StrUtil.md)|
|16进制工具（HexUtil）|[HexUtil.md](docs/modules/base/HexUtil.md)|
|脱敏工具（DesensitizedUtil）|[DesensitizedUtil.md](docs/modules/string/DesensitizedUtil.md)|
|正则池（PatternPool）|[PatternPool.md](docs/modules/common/PatternPool.md)|
|字符串验证工具（ValidateUtil）|[ValidateUtil.md](docs/modules/string/ValidateUtil.md)|
|数组工具（ArrayUtil）|[ArrayUtil.md](docs/modules/array/ArrayUtil.md)|

对于农历、及数字计算确保精度发现了两个开源的：[寿星天文历](https://github.com/sxwnl/sxwnl) 、[decimal.js](https://github.com/MikeMcl/decimal.js) ，因为功能复杂，有时间简单集成一下。

更多功能开发中...
