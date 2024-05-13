---
title: UrlUtil - Url 工具
category:
 - 通用
tag:
 - Url 工具
---



## 1. 获取URL - getUrl

获取当前 URL 地址



## 2. Json 转参数 - jsonToParams

JSON 数据格式转为 GET 请求的 URL 参数



### 参数

| 序号 | 名称 | 类型                                | 含义                        |
| ---- | ---- | ----------------------------------- | --------------------------- |
| 1    | json | JSON 格式，即：{\[key: string\]: any} | 要转换 URL 参数的 JSON 数据 |



## 3. 获取参数 - getParams

获取 url 中的参数并转为 JSON 格式



### 参数

| 序号 | 名称 | 类型   | 含义     |
| ---- | ---- | ------ | -------- |
| 1    | url  | 字符串 | url 地址 |



### 快速获取

另外提供直接获取当前 url 地址参数的方法：getParamsFast，无需传参



## 4. 获取某个参数 - getParam

获取 url 中某个参数



### 参数

| 序号 | 名称 | 类型   | 含义           |
| ---- | ---- | ------ | -------------- |
| 1    | url  | 字符串 | url 地址       |
| 2    | name | 字符串 | 要获取的参数名 |



### 快速获取

也提供了直接获取当前 url 地址参数的方法：getParamFast，参数只有 name



## 5. 获取参数名 - getParamKeys

获取 url 中所有的参数名数组



### 参数

| 序号 | 名称 | 类型   | 含义     |
| ---- | ---- | ------ | -------- |
| 1    | url  | 字符串 | url 地址 |



### 快速获取

直接获取当前 url 地址中的参数名：getParamKeysFast



## 6. 获取参数值 - getParamValues

获取 url 中所有参数值数组



### 参数

| 序号 | 名称 | 类型   | 含义     |
| ---- | ---- | ------ | -------- |
| 1    | url  | 字符串 | url 地址 |



## 7. 判断是否为 url - isUrl

判断字符串是否为 url 格式



## 8. 获取域名 - getDomain

传入 url 获取 url 的域名



## 9. 获取 Hash 参数 - getHash

传入 url 获取 hash 参数



### 快速获取

通过 UrlUtil.Fast 来对当前 url 快速操作，如：

```js
urlUtil.Fast.getParams();
```

