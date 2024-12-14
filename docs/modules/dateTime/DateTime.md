---
title: DateTime - 日期时间对象
category:
 - 日期时间
tag:
 - 日期时间对象
---

从 `2.0` 版本开始，时间对象开始拥抱 [dayjs](https://day.js.org/)，对 `dayjs` 进行增强，降低使用门槛，提升开发效率。

为了避免连续性日期操作使得代码过长且繁杂，引入了日期时间对象概念，通过该对象你可以对日期时间进行连续操作，以获得最终结果。

在新版本中，为了兼容性等原因，DateTime 已经不再继承 Date

为了使得当前对象更加灵活，对象提供的方法返回的DateTime对象都为新的实例，不会对原实例造成影响。

## 存在的意义

DateTime 对象存在的意思是为了增强对日期的获取、操作等功能。再者，虽然 dayjs 已经很好用了，但是在使用方面感觉还是差点儿意思，通过对 dayjs 的增强使得对日期的操作更上一层楼。

----

## 创建实例

可以直接通过 `new DateTime` 创建实例，参数与 `new Date` 一致

```js
import {DateTime} from 'baitu';

let dateTime = new DateTime();
dateTime = new DateTime(1710400022302);
dateTime = new DateTime(2024, 3, 14, 15, 07, 30);
```

另外，你也可以通过 create 方法来创建 DateTime 实例，不过注意的是此时月份需要的不再是下标，而是月数。

```js
dateTime = DateTime.create();
dateTime = DateTime.create(1710400022302);
// 这里的月为月数，时间为2024-02-14 15:07:30
dateTime = DateTime.create(2024, 3, 14, 15, 7, 30);
```

## 格式化

格式化日期，默认格式：YYYY-MM-DD HH:mm:ss，遵循 `dayjs` 格式化格式

|        |                  |                          |
| ------ | ---------------- | ------------------------ |
| 占位符 | 输出             | 详情                     |
| `YY`   | 18               | 两位数的年份             |
| `YYYY` | 2018             | 四位数的年份             |
| `M`    | 1-12             | 月份，从 1 开始          |
| `MM`   | 01-12            | 月份，两位数             |
| `MMM`  | Jan-Dec          | 缩写的月份名称           |
| `MMMM` | January-December | 完整的月份名称           |
| `D`    | 1-31             | 月份里的一天             |
| `DD`   | 01-31            | 月份里的一天，两位数     |
| `d`    | 0-6              | 一周中的一天，星期天是 0 |
| `dd`   | Su-Sa            | 最简写的星期几           |
| `ddd`  | Sun-Sat          | 简写的星期几             |
| `dddd` | Sunday-Saturday  | 星期几                   |
| `H`    | 0-23             | 小时                     |
| `HH`   | 00-23            | 小时，两位数             |
| `h`    | 1-12             | 小时, 12 小时制          |
| `hh`   | 01-12            | 小时, 12 小时制, 两位数  |
| `m`    | 0-59             | 分钟                     |
| `mm`   | 00-59            | 分钟，两位数             |
| `s`    | 0-59             | 秒                       |
| `ss`   | 00-59            | 秒 两位数                |
| `SSS`  | 000-999          | 毫秒 三位数              |
| `Z`    | +05:00           | UTC 的偏移量，±HH:mm     |
| `ZZ`   | +0500            | UTC 的偏移量，±HHmm      |
| `A`    | AM PM            |                          |
| `a`    | am pm            |                          |

更多

| 模版   | 输出                  | 详情                                                         |
| ------ | --------------------- | ------------------------------------------------------------ |
| `Q`    | 1-4                   | 季度                                                         |
| `Do`   | 1st 2nd ... 31st      | 带序数词的月份里的一天                                       |
| `k`    | 1-24                  | 时：由 1 开始                                                |
| `kk`   | 01-24                 | 时：由 1 开始，两位数                                        |
| `X`    | 1360013296            | 秒为单位的 Unix 时间戳                                       |
| `x`    | 1360013296123         | 毫秒单位的 Unix 时间戳                                       |
| `w`    | 1 2 ... 52 53         | 周数 ( 依赖 [`WeekOfYear` ](https://day.js.org/docs/zh-CN/plugin/week-of-year)插件 ) |
| `ww`   | 01 02 ... 52 53       | 周数，两位数 ( 依赖 [`WeekOfYear` ](https://day.js.org/docs/zh-CN/plugin/week-of-year)插件 ) |
| `W`    | 1 2 ... 52 53         | ISO 周数 ( 依赖 [`IsoWeek` ](https://day.js.org/docs/zh-CN/plugin/iso-week)插件 ) |
| `WW`   | 01 02 ... 52 53       | ISO 周数，两位数 ( 依赖 [`IsoWeek` ](https://day.js.org/docs/zh-CN/plugin/iso-week)插件 ) |
| `wo`   | 1st 2nd ... 52nd 53rd | 带序号周数 ( 依赖 [`WeekOfYear` ](https://day.js.org/docs/zh-CN/plugin/week-of-year)插件 ) |
| `gggg` | 2017                  | 按周计算的年份 ( 依赖 [`WeekYear` ](https://day.js.org/docs/zh-CN/plugin/week-year)插件 ) |
| `GGGG` | 2017                  | ISO 按周计算的年份 ( 依赖 [`IsoWeek` ](https://day.js.org/docs/zh-CN/plugin/iso-week)插件 ) |
| `z`    | EST                   | UTC 偏移量的缩写 ( 依赖 [`Timezone` ](https://day.js.org/docs/zh-CN/plugin/timezone)插件 ) |
| `zzz`  | Eastern Standard Time | UTC 偏移量的全名 ( 依赖 [`Timezone` ](https://day.js.org/docs/zh-CN/plugin/timezone)插件 ) |


```js
dateTime.format("YYYY-MM-DD");
// 输出：2024-03-14
```

## 转换

可以通过静态方法 `parse` 方法对日期内容，如字符串、数字等内容转换为 DateTime 对象，也可以像创建 dayjs 对象一样，传入格式来进行格式化。

另外也可以通过 new DateTime 直接将内容转为 DateTime

```js
DateTime.parse('2024-12-14')
new DateTime('2024-12-15')
```

## 设置与获取

对 dayjs 的 set 方法做了增强处理，value 可以为空值（null或undefined），此时不进行赋值

另外可以传入对象来进行多个字段赋值

```js
const date = new DateTime()
date.set({
    year: 2024,
    date: 3
})
```

也可以通过 `getFullYear`、`setFullYear` 这种方法获取和设置日期时间，与 Date 中的方法及参数一致
