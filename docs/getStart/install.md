---
title: 安装
icon: gear
order: 1
date: 2024-04-19
category:
 - 使用指南
tag:
 - 安装
---
 
阅读以下文档学习如何安装 Baitu工具

<!-- more -->

## NPM 安装

通过以下命令安装baitu工具

```sh
npm install baitu;
```

## CDN 引入

如果为了减小打包体积，可以使用 CDN 引入。

```js
<script src="https://unpkg.com/baitu@1.1.5/lib/baitu.min.js"></script>
```

::: warning

使用 CDN 引入时，建议指定版本，以免 Baitu 版本升级而造成的兼容性问题。

:::


CDN 示例

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    <body>
        
    </body>
    <script src="https://unpkg.com/baitu@1.1.5/lib/baitu.min.js"></script>
    <script>
        const dateTime = Baitu.DateTime.create();
        console.log(dateTime);
        
        const {DateUtil} = Baitu;
        console.log(DateUtil.formatDateTime(dateTime));
    </script>
</html>

```
