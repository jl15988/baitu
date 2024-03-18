# DateTime - 日期时间对象

为了避免连续性日期操作使得代码过长且繁杂，引入了日期时间对象概念，通过该对象你可以对日期时间进行连续操作，以获得最终结果。

因为DateTime继承了Date，所以你同样可以调用Date的方法。

为了使得当前对象更加灵活，对象提供的方法返回的DateTime对象都为新的实例，不会对原实例造成影响。

## 1. 创建实例

创建DateTime实例提供了多种方式

```js
let dateTime = new Baitu.DateTime();
dateTime = new Baitu.DateTime(1710400022302);
dateTime = new Baitu.DateTime(2024, 3, 14, 15, 07, 30);
```

上面这种方式看起来怪怪的，所以我们提供了静态的create方法

```js
let dateTime = Baitu.DateTime.create();
dateTime = Baitu.DateTime.create(1710400022302);
dateTime = Baitu.DateTime.create(2024, 3, 14, 15, 7, 30); // 输出2024-02-14 15:07:30
```

create方法与new Date参数一致，但这种方式月份参数为月份下标，也就是从零开始，所以我们又提供了new方法，其中的月份参数就是月份名称，不用再对月份额外操作

```js
let dateTime = Baitu.DateTime.new();
dateTime = Baitu.DateTime.new(1710400022302);
dateTime = Baitu.DateTime.new(2024, 3, 14, 15, 7, 30); // 输出2024-03-14 15:07:30
```

## 2. objectValues()

获取日期年，月，日，周，时，分，秒对象数据，与Date的get获取的一致

```js

const objectValues = dateTime.objectValues();
console.log(objectValues);
/*
输出：
{
    year: 2024,
    month: 2,
    day: 14,
    week: 4,
    hours: 15,
    minutes: 11,
    seconds: 30
}
 */
```

## 3. toDate()

转为年-月-日类型的日期

## 4. format(format?: string)

格式化日期，默认格式：yyyy-MM-dd HH:mm:ss

|符号|含义|
|-|-|
|yyyy|年|
|yy|年后两位数|
|M|月不补零|
|M|月补零|
|d|日不补零|
|dd|日补零|
|H|时不补零|
|HH|时补零|
|m|分不补零|
|mm|分补零|
|s|秒不补零|
|ss|秒补零|
|q|季度|
|S|毫秒|

```js
dateTime.format("yyyy-MM-dd");
// 输出：2024-03-14
```

## 5. formatDate()

格式化当前日期为年-月-日

## 6. formatDateTime()

格式化当前日期为年-月-日 时:分:秒

## 7. beginOfDay()

获取当前日期当天开始时间

```js
dateTime.beginOfDay().formatDateTime();
// 输出：2023-03-14 00:00:00
```

## 8. endOfDay()

获取当前日期当天结束时间

```js
dateTime.endOfDay().formatDateTime();
// 输出：2023-03-14 23:59:59
```

## 9. beginOfWeek()

获取当前日期当周开始时间

## 10. endOfWeek()

获取当前日期当周结束时间

## 11. beginOfMonth()

获取当前日期当月第一天时间

## 12. endOfMonth()

获取当前日期当月最后一天时间

## 13. beginOfYear()

获取当前时间当年开始时间

## 14. endOfYear()

获取当前日期当年结束时间

## 15. setFirstWeek(type: WeekDay)

设置周开始周数，默认从周日开始

设置当前时间的周开始是哪一天，主要针对获取周内开始时间或结束时间

```js
dateTime.setFirstWeek(Baitu.WeekDay.SUN);
```

## 16. offset(type: DateField, offset: number)

日期偏移操作

通过该方法，可以实现对于年、月、日、时、分、秒、周进行偏移操作

```js
dateTime.offset(Baitu.DateField.YEAR, -2).formatDate();
// 输出：2022-03-14
```

## 17. daysOfMonth()

获取当月天数

## 18. compare(date: Date | DateTime, dateField: DateField)

获取当前日期与指定日期之间的差值，当前-参数

```js
const date = new Date("2023-05-16");
dateTime.compare(date, Baitu.DateField.DAY);
// 输出：303.3
```

## 19. age

获取当前日期年龄（周岁）
