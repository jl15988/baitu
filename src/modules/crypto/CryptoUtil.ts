import CryptoGroup, {RSASignMethodRel} from "./CryptoGroup";
import {JSEncrypt} from "jsencrypt";
import CryptoJS from "crypto-js";

export class Base64Class {

    /**
     * 编码
     * @param str 字符串
     */
    encode(str: string) {
        if (!CryptoGroup.CryptoJS) {
            throw new Error("Please initialize CryptoJS first.");
        }
        return CryptoGroup.CryptoJS.enc.Base64.stringify(CryptoGroup.CryptoJS.enc.Utf8.parse(str));
    }

    /**
     * 解码
     * @param str 加密的字符串
     */
    decode(str: string) {
        if (!CryptoGroup.CryptoJS) {
            throw new Error("Please initialize CryptoJS first.");
        }
        return CryptoGroup.CryptoJS.enc.Base64.parse(str).toString(CryptoGroup.CryptoJS.enc.Utf8);
    }
}

export class RSA {
    private readonly instance?: JSEncrypt;

    constructor(publicKey?: string, privateKey?: string) {
        if (!CryptoGroup.JSEncrypt) {
            throw new Error("Please initialize JSEncrypt first.");
        }
        this.instance = new CryptoGroup.JSEncrypt();
        if (publicKey) {
            this.instance.setPublicKey(publicKey);
        }
        if (privateKey) {
            this.instance.setPrivateKey(privateKey);
        }
    }

    static create(publicKey?: string, privateKey?: string) {
        return new RSA(publicKey, privateKey);
    }

    /**
     * 生成公钥
     */
    getPublicKey() {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        return this.instance.getPublicKey();
    }

    /**
     * 生成私钥
     */
    getPrivateKey() {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        return this.instance.getPrivateKey();
    }

    /**
     * 生成公钥（去掉前后缀）
     */
    getSimplePublicKey() {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        return this.instance.getPublicKey().replace("-----BEGIN PUBLIC KEY-----\n", "").replace("\n-----END PUBLIC KEY-----", "");
    }

    /**
     * 生成私钥（去掉前后缀）
     */
    getSimplePrivateKey() {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        return this.instance.getPrivateKey().replace("-----BEGIN RSA PRIVATE KEY-----\n", "").replace("\n-----END RSA PRIVATE KEY-----", "");
    }

    /**
     * 设置公钥
     */
    setPublicKey(key: string) {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        this.instance.setPublicKey(key);
        return this;
    }

    /**
     * 设置私钥
     */
    setPrivateKey(key: string) {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        this.instance.setPrivateKey(key);
        return this;
    }

    /**
     * 公钥加密
     * @param str 字符串
     */
    encode(str: string): string {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        const res = this.instance.encrypt(str);
        if (!res) {
            throw new Error("encode fail");
        }
        return res;
    }

    /**
     * 私钥解密
     * @param str 字符串
     */
    decode(str: string): string {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        const res = this.instance.decrypt(str);
        if (!res) {
            throw new Error("encode fail");
        }
        return res;
    }


    /**
     * 生成签名
     * @param str 字符串
     * @param digestMethod 摘要方法
     */
    sign(str: string, digestMethod: RSASignMethodRel): string | false {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        return this.instance.sign(str, digestMethod.method, digestMethod.type);
    }

    /**
     * 验签
     * @param str 字符串
     * @param signature 签名
     * @param digestMethod 摘要方法
     */
    verify(str: string, signature: string, digestMethod: RSASignMethodRel): boolean {
        if (!this.instance) {
            throw new Error("JSEncrypt instance is not define.");
        }
        return this.instance.verify(str, signature, digestMethod.method);
    }
}

class AESClass {

    secretKey: CryptoJS.lib.WordArray;
    iv?: CryptoJS.lib.WordArray;
    mode: typeof CryptoJS.mode.ECB;
    padding: typeof CryptoJS.pad.Pkcs7;

    constructor(secretKey: string) {
        if (!CryptoGroup.CryptoJS) {
            throw new Error("Please initialize CryptoJS first.");
        }
        this.secretKey = CryptoGroup.CryptoJS.enc.Utf8.parse(secretKey);
        this.padding = CryptoGroup.CryptoJS.pad.Pkcs7;
        this.mode = CryptoGroup.CryptoJS.mode.ECB;
    }

    setIv(iv: string) {
        if (!CryptoGroup.CryptoJS) {
            throw new Error("Please initialize CryptoJS first.");
        }
        this.iv = CryptoGroup.CryptoJS.enc.Utf8.parse(iv);
    }

    static build(secretKey: string) {
        return new AESClass(secretKey);
    }

    setPadding(padding: typeof CryptoJS.pad.Pkcs7) {
        this.padding = padding;
    }

    setMode(mode: typeof CryptoJS.mode.ECB) {
        this.mode = mode;
    }

    encode(str: string): string {
        if (!CryptoGroup.CryptoJS) {
            throw new Error("Please initialize CryptoJS first.");
        }
        const ciphertext = CryptoGroup.CryptoJS.AES.encrypt(str, this.secretKey, {
            mode: this.mode,
            padding: this.padding,
            iv: this.iv
        }).ciphertext;
        return ciphertext.toString(CryptoGroup.CryptoJS.enc.Base64);
    }

    decode(str: string): string {
        if (!CryptoGroup.CryptoJS) {
            throw new Error("Please initialize CryptoJS first.");
        }
        return CryptoGroup.CryptoJS.AES.decrypt(str, this.secretKey, {
            mode: this.mode,
            padding: this.padding,
            iv: this.iv
        }).toString(CryptoGroup.CryptoJS.enc.Utf8);
    }
}

class CryptoUtil {

    /**
     * Base64加密
     */
    Base64: Base64Class = new Base64Class();
    /**
     * MD5加密
     * @param str 字符串
     */
    MD5: (str: string) => string = (str: string) => {
        if (!CryptoGroup.CryptoJS) {
            throw new Error("Please initialize CryptoJS first.");
        }
        return CryptoGroup.CryptoJS.MD5(str).toString();
    }
    /**
     * RSA非对称加密
     */
    RSA = RSA;
    /**
     * AES加密
     */
    AES = AESClass
}

export default new CryptoUtil();
