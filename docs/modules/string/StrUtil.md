---
title: StrUtil - 字符串工具
category:
 - 字符串
tag:
 - 字符串工具
---

## 1. isBlank(str: string)

判断字符串是否为：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）


## 2. isNotBlank(str: string)

判断字符串为非：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）


## 3. isEmpty(str: string)

判断字符串为空字符串


## 4. isNotEmpty(str: string)

判断字符串非空字符串


## 5. getPadStr(str: string, len: number, pad?: string)

获取需要额外填充的字符串

参数
- str 字符串
- len 目标长度
- pad 要填充的字符串，非必填，默认空格


## 6. padStart(str: string, len: number, pad?: string)

在字符串开始填充额外的字符串

参数
- str 字符串
- len 目标长度
- pad 要填充的字符串，非必填，默认空格


## 7. padEnd(str: string, len: number, pad?: string)

在字符串结束填充额外的字符串

参数
- str 字符串
- len 目标长度
- pad 要填充的字符串，非必填，默认空格


## 8. chunk(str: string, chunkSize: number)

按长度分割字符串转为数组

参数
- str 字符串 
- chunkSize 分割长度


## 9. chunkCount(str: string, count: number)

分割字符串为固定长度数组

参数
- str 字符串
- count 数组长度
