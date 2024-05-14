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
declare class AESClass {
    secretKey: string;
    iv: string;
    mode: any;
    padding: any;
    constructor(secretKey: string);
    setIv(iv: string): void;
    static build(secretKey: string): AESClass;
    setPadding(padding: any): void;
    setMode(mode: any): void;
    encode(str: string): string;
    decode(str: string): string;
}
declare class EncryptUtil {
    CryptoJS: any;
    JSEncrypt: any;
    MD5Encrypt: any;
    AESEncrypt: any;
    Base64Encrypt: any;
    CJUTF8: any;
    AESPad: {
        Pkcs7: any;
        Ansix923: any;
        Iso10126: any;
        Iso97971: any;
        NoPadding: any;
        ZeroPadding: any;
    };
    AESMod: {
        CFB: any;
        CTR: any;
        CTRGladman: any;
        ECB: any;
        OFB: any;
    };
    setCryptoJS(CryptoJS: any): void;
    setJSEncrypt(JSEncrypt: any): void;
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
declare const encryptUtil: EncryptUtil;
export default encryptUtil;
