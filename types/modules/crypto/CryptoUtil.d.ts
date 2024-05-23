import { RSASignMethodRel } from "./CryptoGroup";
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
declare class RSABuilder {
    private publicKeyValue;
    private privateKeyValue;
    publicKey(key: string): this;
    privateKey(key: string): this;
    build(): RSA;
}
export declare class RSA {
    private instance;
    constructor(publicKey?: string, privateKey?: string);
    /**
     * 链式构造
     */
    static builder(): RSABuilder;
    /**
     * 函式构造
     * @param publicKey 公钥
     * @param privateKey 私钥
     */
    static build(publicKey?: string, privateKey?: string): RSA;
    /**
     * 生成公钥
     */
    getPublicKey(): any;
    /**
     * 生成私钥
     */
    getPrivateKey(): any;
    /**
     * 生成公钥（去掉前后缀）
     */
    getSimplePublicKey(): any;
    /**
     * 生成私钥（去掉前后缀）
     */
    getSimplePrivateKey(): any;
    /**
     * 设置公钥
     */
    setPublicKey(key: string): any;
    /**
     * 设置私钥
     */
    setPrivateKey(key: string): any;
    /**
     * 公钥加密
     * @param str 字符串
     */
    encode(str: string): string;
    /**
     * 私钥解密
     * @param str 字符串
     */
    decode(str: string): string;
    /**
     * 生成签名
     * @param str 字符串
     * @param digestMethod 摘要方法
     */
    sign(str: string, digestMethod: RSASignMethodRel): string | false;
    /**
     * 验签
     * @param str 字符串
     * @param signature 签名
     * @param digestMethod 摘要方法
     */
    verify(str: string, signature: string, digestMethod: RSASignMethodRel): boolean;
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
declare class CryptoUtil {
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
    /**
     * AES加密
     */
    AES: typeof AESClass;
}
declare const _default: CryptoUtil;
export default _default;
