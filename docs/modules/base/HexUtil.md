# HexUtil - 16进制工具

## 1. encode

字符串转16进制字符串，仅支持UTF8编码

### 参数

|序号|名称|类型|含义|
|-|-|-|-|
|1|str|string|要编码的字符串|

### 示例
```js
const encodeStr = HexUtil.encode("百涂工具");
console.log("编码：", encodeStr);
// 输出：编码： e799bee6b682e5b7a5e585b7
```



## 2. decode

十六进制字符串转字符串，仅支持UTF8编码

### 参数
|序号|名称|类型|含义|
|-|-|-|-|
|1|hex|string|要解码的16进制字符串|

### 示例
```js
const decodeStr = HexUtil.decode("e799bee6b682e5b7a5e585b7");
console.log("解码：", decodeStr);
//输出：解码： 百涂工具
```



## 3. arrayBufferToHex

原始二进制数据缓冲区转16进制字符串

### 参数
|序号|名称|类型|含义|
|-|-|-|-|
|1|arrayBuffer|ArrayBuffer|原始二进制数据缓冲区|

### 示例
```js
const fileInput = document.querySelector("#file");
fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (file) {
        // 使用FileUtil获取Buffer
        FileUtil.getFileBuffer(file, 100).then(res => {
            // Buffer转Hex
            const bufferHex = HexUtil.arrayBufferToHex(res);
            console.log(bufferHex);
        });
    }
}
```



## 4. uint8ArrayToHex

uint8Array转16进制字符串

### 参数
|序号|名称|类型|含义|
|-|-|-|-|
|1|uint8Array|Uint8Array|Uint8Array|

### 示例
```js
const fileInput = document.querySelector("#file");
fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (file) {
        // 使用FileUtil获取uint8
        FileUtil.getUint8Array(file, 100).then(uintRes => {
            const uint8Hex = HexUtil.uint8ArrayToHex(uintRes);
            console.log(uint8Hex);
        })
        // 如果是同一个文件，bufferToHex和uint8ArrayToHex最终结果应该是一致的
    }
}
```



## 5. hexToUint8Array(hex: string)

16进制字符串转Uint8

### 参数
|序号|名称|类型|含义|
|-|-|-|-|
|1|hex|string|16进制字符串|

```js
const fileInput = document.querySelector("#file");
fileInput.onchange = () => {
    const file = fileInput.files[0];
    if (file) {
        // 使用FileUtil获取uint8
        FileUtil.getUint8Array(file, 100).then(uintRes => {
            console.log("uint8：", uintRes);
            // 获取hex
            const uint8Hex = HexUtil.uint8ArrayToHex(uintRes);
            // 再转uint8
            const uint8 = HexUtil.hexToUint8(uint8Hex);
            console.log(uint8);
        })
        // 上面的因为是同一个文件，uintRes和uint8最终结果应该是一致的
    }
}
```
