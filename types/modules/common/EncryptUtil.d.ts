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
export declare class Base64Class {
    /**
     * 编码
     * @param str 字符串
     */
    encode(str: string): any;
    /**
     * 解码
     * @param str 加密的字符串
     */
    decode(str: string): any;
}
export declare class RSA {
    private readonly publicKey;
    private readonly privateKey;
    constructor(publicKey?: string, privateKey?: string);
    static build(publicKey?: string, privateKey?: string): RSA;
    /**
     * 公钥加密
     * @param str 字符串
     */
    encodePublic(str: string): string;
    /**
     * 私钥解密
     * @param str 字符串
     */
    decodePrivate(str: string): string;
}
export type AESPadding = Pkcs7 | Ansix923 | Iso10126 | Iso97971 | NoPadding | ZeroPadding;
export type AESMode = CFB | CTR | CTRGladman | ECB | OFB;
declare class AESClass {
    secretKey: string;
    iv: string;
    mode: AESMode;
    padding: AESPadding;
    pads: {
        Pkcs7: any;
        Ansix923: any;
        Iso10126: any;
        Iso97971: any;
        NoPadding: any;
        ZeroPadding: any;
    };
    mods: {
        CFB: any;
        CTR: any;
        CTRGladman: any;
        ECB: any;
        OFB: any;
    };
    constructor(secretKey: string);
    static build(secretKey: string): AESClass;
    setPadding(padding: AESPadding): void;
    setMode(mode: AESMode): void;
    encode(str: string): string;
    decode(str: string): string;
}
declare class EncryptUtil {
    /**
     * Base64加密
     */
    Base64: Base64Class;
    /**
     * MD5加密
     * @param str 字符串
     */
    MD5: (str: string) => string;
    /**
     * RSA非对称加密
     */
    RSA: typeof RSA;
    AES: typeof AESClass;
}
declare const _default: EncryptUtil;
export default _default;
