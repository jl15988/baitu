---
title: DateUtil - 日期工具
category:
 - 日期时间
tag:
 - 日期工具
---

## 1. date()

获取当前Date类型日期


## 2. dateTime()

获取当前DateTime类型日期


## 3. now()

获取当前时间戳


## 4. formatNow()

获取当前时间，格式：yyyy-MM-dd HH:mm:ss


## 5. formatToDate()

获取当前日期，格式：yyyy-MM-dd


## 6. parse(dateTime: string | number | Date | DateTime)

将特定格式转为DateTime

支持格式：
- yyyy年MM月dd日HH(时/点)mm分ss秒
- yyyy年MM月dd日 HH(时/点)mm分ss秒
- yyyy年MM月dd日HH(时/点)mm分
- yyyy年MM月dd日HH(时/点)
- yyyy年MM月dd日
- yyyy年MM月
- yyyy年
- yyyyMMddHHmmss
- yyyyMMddHHmm
- 不支持yyyyMMddHH，将判定为10位的时间戳
- yyyyMMdd
- 不支持yyyyMM
- yyyy
- yyyy-MM-dd HH:mm:ss
- yyyy/MM/dd HH:mm:ss
- yyyy.MM.dd HH:mm:ss
- yyyy-MM-ddTHH:mm:ss
- yyyy-MM-dd HH:mm
- yyyy/MM/dd HH:mm
- yyyy.MM.dd HH:mm
- yyyy-MM-dd
- yyyy/MM/dd
- yyyy.MM.dd
- yyyy-MM
- yyyy/MM
- yyyy.MM
- HH:mm:ss
- HH(时/点)mm分ss秒
- HH:mm
- HH(时/点)mm分
- HH(时/点)
- 13位或10位时间戳


## 7. toDateTime(dateTime: string | number | Date | DateTime)

将参数转为DateTime类型，支持parse方法的所有类型参数


## 8. format(date: string | number | Date | DateTime, format?: string)

格式化日期，默认格式：yyyy-MM-dd HH:mm:ss，支持parse方法的所有类型参数


## 9. daysOfMonth(date: Date | DateTime)

获取当月天数


## 10. compare(date1: Date | DateTime, date2: Date | DateTime, dateField?: DateField)

获取日期1减日期2的差值

原理：
天、时、分、秒都是通过计算时间戳差值而得出，由于每个月天数不同所以进行了额外的运算，原理为取两个时间月数的间隔，然后计算出相差天数向小日期月份补天数，最后以剩余天数除最后日期月份天数而得出，年则是直接先计算出月再除12

```js
const date1 = new Date();
const date2 = new Date("2023-05-16");
Baitu.DateUtil.compare(date1, date2, Baitu.DateField.DAY);
// 输出：303.3
```


## 11. age(date: Date | DateTime)

根据日期获取年龄（周岁）
