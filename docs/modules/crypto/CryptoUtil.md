---
title: CryptoUtil - 加密工具
category:
 - 加密
tag:
 - 加密工具
---



加密工具支持，依赖于 `jsencrypt` 和 `crypto-js` ，是它们的增强，因为原本的加密过程太过复杂多化，我们对其进行了简化处理。为了减小包大小，我们对加密库进行按需使用安装，如果你想使用加密工具，可自行安装对应依赖。



## 1. 初始化

因为加密库相对较大，所以我们将其排除，不做强制关联，只做增强，改为了按需安装加载。

在项目入口处，通过 `CryptoGroup` 来初始化加密库，你可以根据不同方法按需安装依赖。

```js
import CryptoJs from 'crypto-js'
import {JSEncrypt} from "jsencrypt";
import {CryptoGroup} from "baitu";

CryptoGroup.initCryptoJS(CryptoJs);
CryptoGroup.initJSEncrypt(JSEncrypt);
```



`CryptoGroup` 中包含了初始化的加密库实例，以及一些加密必要的参数方法等，具体见下方使用讲解。



## 2. Base64 加密

该加密方法依附于 `crypto-js`，提供 encode 加密和 decode 解密方法

```js
const end = CryptoUtil.Base64.encode("13sdfvsd")
console.log(end)
console.log(CryptoUtil.Base64.decode(end))
```



## 3. MD5 加密

该加密方法依附于 `crypto-js`，只有加密

```js
console.log(CryptoUtil.MD5("111"))
```



## 4. RSA加密

该加密方法依附于 `jsencrypt`



### 通过密钥构建

```js
const publicKey = "";
const privateKey = "";

const rsa = CryptoUtil.RSA.build(publicKey, privateKey);
```

或者

```js
const rsa = CryptoUtil.RSA.builder().publicKey(publicKey).build();
const rsa2 = CryptoUtil.RSA.builder().privateKey(privateKey).build();
```

### 设置密钥

```js
rsa.setPublicKey("").setPrivateKey("");
```

### 生成密钥

```js
const rsa = CryptoUtil.RSA.build();

const publicKey = rsa.getPublicKey(); // 生成公钥
const privateKey = rsa.getPrivateKey(); // 生成私钥
```

如果你想获取不带有前后缀的密钥

```js
const rsa = CryptoUtil.RSA.build();

const publicKey = rsa.getSimplePublicKey(); // 生成公钥
const privateKey = rsa.getSimplePrivateKey(); // 生成私钥
```

### 加解密

```js
const publicKey = "";
const privateKey = "";

const rsa = CryptoUtil.RSA.build(publicKey, privateKey);
const s1 = rsa.encode("123"); // 加密
console.log(s1)
console.log(rsa.decode(s1)); // 解密
```

### 签名

```js
var sign = rsa.sign("aaa", CryptoGroup.RSASignMethod.sha256); // 生成签名
if (sign) {
  console.log(sign)
  // 验签
  console.log(rsa.verify("aaa", sign, CryptoGroup.RSASignMethod.sha256))
}
```



## 5. AES 加密

该加密方法依附于 `crypto-js`

```js
const secretKey = "5JkFRpACidUzJ3RlQk8YIbNOSmnVppQC"
const aes = CryptoUtil.AES.build(secretKey);
const encoded = aes.encode("111111"); // 加密
console.log(encoded)
console.log(aes.decode(encoded)) // 解密
```

### 设置参数

通过 `CryptoGroup` 你可以获取所需的 padding 和 mode

```js
aes.setIv("123")
aes.setPadding(CryptoGroup.CryptoPad.NoPadding)
aes.setMode(CryptoGroup.CryptoMod.CTR)
```

