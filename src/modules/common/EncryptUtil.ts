import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import MD5 from 'crypto-js/md5';
import AES from 'crypto-js/aes';
import WordArray from 'crypto-js/lib-typedarrays';
import Pkcs7 from 'crypto-js/pad-pkcs7';
import Ansix923 from 'crypto-js/pad-ansix923';
import Iso10126 from 'crypto-js/pad-iso10126';
import Iso97971 from 'crypto-js/pad-iso97971';
import NoPadding from 'crypto-js/pad-nopadding';
import ZeroPadding from 'crypto-js/pad-zeropadding';
import CFB from 'crypto-js/mode-cfb';
import CTR from 'crypto-js/mode-ctr';
import CTRGladman from 'crypto-js/mode-ctr-gladman';
import ECB from 'crypto-js/mode-ecb';
import OFB from 'crypto-js/mode-ofb';
import * as Base64C from 'crypto-js/enc-base64';
import {JSEncrypt} from "jsencrypt";

export class Base64Class {

    /**
     * 编码
     * @param str 字符串
     */
    encode(str: string) {
        return Base64.stringify(Utf8.parse(str));
    }

    /**
     * 解码
     * @param str 加密的字符串
     */
    decode(str: string) {
        return Base64.parse(str).toString(Utf8);
    }
}

export class RSA {
    private readonly publicKey: string;
    private readonly privateKey: string;

    constructor(publicKey?: string, privateKey?: string) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    static build(publicKey?: string, privateKey?: string) {
        return new RSA(publicKey, privateKey);
    }

    /**
     * 公钥加密
     * @param str 字符串
     */
    encodePublic(str: string): string {
        const publicKey = this.publicKey;
        const encrypt = new JSEncrypt();
        if (!publicKey) {
            throw new Error("publicKey no find");
        }
        encrypt.setPublicKey(publicKey);
        const res = encrypt.encrypt(str);
        if (!res) {
            throw new Error("encode fail");
        }
        return res;
    }

    /**
     * 私钥解密
     * @param str 字符串
     */
    decodePrivate(str: string): string {
        const privateKey = this.privateKey;
        const encrypt = new JSEncrypt();
        if (!privateKey) {
            throw new Error("privateKey no find");
        }
        encrypt.setPrivateKey(privateKey);
        const res = encrypt.decrypt(str);
        if (!res) {
            throw new Error("encode fail");
        }
        return res;
    }
}

export type AESPadding = Pkcs7 | Ansix923 | Iso10126 | Iso97971 | NoPadding | ZeroPadding;

export type AESMode = CFB | CTR | CTRGladman | ECB | OFB;

class AESClass {

    secretKey: string;
    iv: string;
    mode: AESMode;
    padding: AESPadding;
    pads = {
        Pkcs7,
        Ansix923,
        Iso10126,
        Iso97971,
        NoPadding,
        ZeroPadding
    }
    mods = {
        CFB,
        CTR,
        CTRGladman,
        ECB,
        OFB
    }

    constructor(secretKey: string) {
        this.secretKey = Utf8.parse(secretKey);
        this.iv = WordArray.create(WordArray.random(16));
    }

    static build(secretKey: string) {
        return new AESClass(secretKey);
    }

    setPadding(padding: AESPadding) {
        this.padding = padding;
    }

    setMode(mode: AESMode) {
        this.mode = mode;
    }

    encode(str: string): string {
        const ciphertext = AES.encrypt(str, this.secretKey, {
            mode: this.mode,
            padding: this.padding,
            iv: this.iv
        }).ciphertext;
        console.log(ciphertext)
        return ciphertext.toString(Base64C);
    }

    decode(str: string): string {
        console.log(Base64C.parse(str))
        return AES.decrypt({
            ciphertext: Base64C.parse(str)
        }, this.secretKey, {
            mode: this.mode,
            padding: this.padding,
            iv: this.iv
        }).toString(Utf8);
    }
}

class EncryptUtil {
    /**
     * Base64加密
     */
    Base64: Base64Class = new Base64Class();
    /**
     * MD5加密
     * @param str 字符串
     */
    MD5: (str: string) => string = (str: string) => {
        return MD5(str).toString();
    }
    /**
     * RSA非对称加密
     */
    RSA = RSA;
    AES = AESClass
}

export default new EncryptUtil();
