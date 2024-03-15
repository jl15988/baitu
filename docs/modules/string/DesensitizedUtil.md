# DesensitizedUtil - 脱敏工具

## DesensitizedParam - 脱敏参数

- str 字符串
- startIndex 脱敏开始下标
- length 脱敏长度
- pad 填充符号，默认*


## DesensitizedReserveParam - 保留脱敏参数

- str 字符串
- headLen 首部保留长度
- tailLen 脱尾部保留长度
- pad 填充符号，默认*

## 1. of(str: string, startIndex?: number, length?: number, pad: string = "*")

脱敏方法，可自定义脱敏位置、长度、脱敏符号，脱敏符号默认为*

参数
- str 字符串
- startIndex 脱敏开始下标
- length 脱敏长度
- pad 填充符号，默认*


## 2. reserve(str: string, headLen?: number, tailLen?: number, pad?: string)

保留脱敏，自定义首部和尾部保留的长度，其他部分全部脱敏

参数
- str 字符串
- headLen 首部保留长度
- tailLen 脱尾部保留长度
- pad 填充符号，默认*


## 3. with(params: DesensitizedParam)

脱敏，对象参数方式，由于参数较多，为方便传参提供了对象传参的方式

```js
Baitu.DesensitizedUtil.with({
    str: '13566587456',
    startIndex: 2,
    length: 4
})
```


## 4. mobile(str: string, startIndex: number = 3, length: number = 4, pad?: string)

手机号脱敏，格式：123****5678


## 5. fullName(str: string, startIndex: number = 1, length?: number, pad?: string)

姓名脱敏，格式：张 * *、张 *


## 6. fullName2(str: string)

姓名脱敏，格式：张 * 江，张 *


## 7. idCard(str: string, headLen: number = 1, tailLen: number = 1, pad?: string)

身份证号脱敏，格式：3****************2


## 8. bankAccount(str: string, headLen: number = 0, tailLen: number = 4, pad?: string)

银行卡号脱敏，格式：***************3387


参数
params 见DesensitizedParam脱敏参数

## 9. 其他各种方法都支持对象传参方式

```js
Baitu.DesensitizedUtil.mobileWith({
    str: '13566587456',
    startIndex: 2,
    length: 4
})
```
