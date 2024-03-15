# FileUtil - 文件工具

## 1. getMainName(fileName: string)

获取文件主名


## 2. getTypeSimple(fileName: string)

通过截取文件名称获取文件类型

```js
Baitu.FileUtil.getTypeSimple("abc.png");
// 输出：png
```


## 3. getFileTypeSimple(file: File)

通过截取文件名称获取文件类型


## 4. isTypeSimple(fileName: string, type: string)

通过截取文件名称判断是否某种类型

```js
Baitu.FileUtil.isTypeSimple("abc.png", "png");
// 输出：true
```


## 5. isFileTypeSimple(file: File, type: string)

通过截取文件名称判断是否某种类型


## 6. getHexString(file: File, len?: number)

获取文件的16进制字符串，如果文件过大请设置len值，来截取文件，否则可能导致程序卡死

```js
Baitu.FileUtil.getHexString(file).then(res => {
    console.log(res);
})
```


## 7. getFileBuffer(file: File | Blob, len?: number)

获取文件Buffer，可设置len值，来截取文件

```js
Baitu.FileUtil.getFileBuffer(file).then(res => {
    // res
})
```


## 8. getUint8Array(file: File, len?: number)

获取文件的Unit8数组，可设置len值，来截取文件

```js
Baitu.FileUtil.getUint8Array(file).then(res => {
    // res
})
```


## 9. getTypeMagic(file: File)

通过魔数获取文件类型（byte值获取）

注：通过魔数获取类型原理是将文件转为16进制编码，然后检查开头是否符合指定字符串（成为“魔数”），但不同类型的类型可能会有相同的魔数，所以这种方法可能会不准确，但对于常见的类型来说是足够的，使用时请自主测试。

```js
Baitu.FileUtil.getTypeMagic(file).then(res => {
    console.log(res);
})
```


## 10. isTypeMagic(file: File, type: string)

通过魔数判断是否某种类型

```js
Baitu.FileUtil.isTypeMagic(file, "png").then(res => {
    console.log(res);
})
```


## 11. download(file: File, filename?: string, mime?: string)

将文件下载

filename为下载的名称，mime为下载的mime类型

filename和mime可不传，默认取file的name值
