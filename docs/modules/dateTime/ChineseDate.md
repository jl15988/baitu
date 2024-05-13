---
title: ChineseDate - 农历日期
category:
 - 日期时间
tag:
 - 农历日期
---

在某些场景中，需要用到农历日期，如：时间组件、万年历等，所以我们参考了[寿星天文历](https://github.com/sxwnl/sxwnl)，针对农历日期进行了封装，具有比较完善的农历信息，能够获取到**生肖、节气、节日、朝代、干支、农历名**等信息。

该对象通过复杂的地月日公式计算出农历，并非速查表形式（除通过农历构建），故可追溯前古预知后今，可作为万年历使用。



## 1. 创建实例

通过构造方法传入公历日期，我们可以构造一个 ChineseDate 的实例，来获取各种信息

```js
const chineseDate = new ChineseDate(2024, 5, 13);
```

日和月可省略，默认为1

```js
const chineseDateB = new ChineseDate(2024, 5);
const chineseDateC = new ChineseDate(2024);
```



或者传入 Date 来构建

```js
var chineseDate7 = new ChineseDate(new Date());
console.log(chineseDate7.toString()) // 甲辰龙年 四月初六
```



同样你也可以通过农历日期构造（适用于1900.1.31~2100.12.1）

```js
var chineseDate6 = ChineseDate.fromLunar(2024, 5);
console.log(chineseDate6.toString()) // 甲辰龙年 五月初一
```



## 2. 获取所有信息 - getAllInfo

通过该方法可获取当前日期的所有信息

```js
chineseDate.getAllInfo()
```



## 3. 获取公历所有日的农历信息 - getMonthDays

如果你想做一款日历，那么这个方法最合适不过，能获取到当前月的所有日的所有信息



## 4. 获取月信息 - getMonth

单独获取月信息

```js
console.log(chineseDate.getMonth())
/* 结果：
{
    "isLeap": false,
    "order": 4,
    "name": "四",
    "size": 29,
    "nextName": "五",
    "gan": "己",
    "zhi": "巳"
}
*/
```



## 5. 获取年信息 - getYear

单独获取年信息

```js
console.log(chineseDate.getYear())
/* 结果：
{
    "order": 2024,
    "shx": "龙",
    "gan": "甲",
    "zhi": "辰",
    "eraName": "公历纪元",
    "dynasty": "当代",
    "name": "中国",
    "ruler": "",
    "huangdiOrder": 4722
}
*/
```



## 6. 获取农历节日 - getFestival

当前方法返回的为一个对象，包含了super、common、other三个字段

其中 super 为重要节日，如：“春节”
common 为普通节日，如：“重阳节”
other 为其他节日

```js
const chineseDate2 = new ChineseDate(2024, 5, 1);
console.log(chineseDate2.getFestival())
/* 结果：
{
    "super": [],
    "common": [
        "天后诞",
        "妈祖诞"
    ],
    "other": []
}
*/
```



## 7. 获取生肖 - getChineseZodiac

获取生肖

```js
console.log(chineseDate2.getChineseZodiac())
// 结果：龙
```



## 8. 获取干支

```js
console.log(chineseDate2.getGan()) // 甲
console.log(chineseDate2.getZhi()) // 辰
console.log(chineseDate2.getCyclical()) // 甲辰
```



## 9. 获取黄帝纪年 - getHuangdiYear

黄帝纪年，是根据黄帝即位以及创制历法的时间开始纪年

```js
console.log(chineseDate2.getHuangdiYear()) // 4722
```



## 10. 获取朝代 - getDynasty

通过该方法可追溯到夏朝

```js
const chineseDate5 = new ChineseDate(450, 5);
console.log(chineseDate2.getDynasty())
/*
{
    "eraName": "公历纪元",
    "dynasty": "当代",
    "name": "中国",
    "ruler": ""
}
*/
console.log(chineseDate5.getDynasty())
/*
{
    "eraName": "太平真君",
    "dynasty": "北朝/北魏",
    "name": "太武帝",
    "ruler": "拓跋焘"
}
*/
```



## 11. 获取节气 - getSolarTerms

获取当天节气

```js
const chineseDate3 = new ChineseDate(2024, 5, 5);
console.log(chineseDate3.getSolarTerms())
/*
{
    "name": "立夏",
    "jd": 8890.840315380512,
    "time": "08:10:03"
}
*/
```



## 12. 获取干支纪日 - getCyclicalYMD

获取年月日的干支纪时

```js
console.log(chineseDate3.getCyclicalYMD()) // 甲辰龙年 己巳月己巳日
```



## 13. toString

转字符串

```js
console.log(chineseDate3.toString()) // 甲辰龙年 三月廿七
```

