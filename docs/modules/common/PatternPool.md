# PatternPool - 正则池

正则池中包含了常用的多个正则，一般足够使用。如果你有更多需求，不推荐单独再新建正则文件来调用，因为这样难以维护，可以通过add方法添加新的正则，或者创建新的class来继承PatternPoolClass，通过对PatternPool的重新赋值达到统一调用的效果。

```js
import {Baitu} from "baitu";

const {PatternPool, PatternPoolClass, ValidateUtil} = Baitu.values();

// 添加新的正则
PatternPool.add({
    phone: '^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$',
    date: new RegExp("^\\d{4}-\\d{1,2}-\\d{1,2}")
})

// 或覆盖原正则池
class PatternPoolNew extends PatternPoolClass {
    phone = '^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$';
    date = new RegExp("^\\d{4}-\\d{1,2}-\\d{1,2}")
}
Baitu.setPatternPool(new PatternPoolNew());

// 使用
ValidateUtil.validate("2023-03-15", PatternPool.date);

```
