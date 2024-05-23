import CryptoGroup, {RSASignMethodRel} from "./CryptoGroup";

export class Base64Class {

    /**
     * 编码
     * @param str 字符串
     */
    encode(str: string) {
        return CryptoGroup.CryptoEnc.Base64.stringify(CryptoGroup.CryptoEnc.Utf8.parse(str));
    }

    /**
     * 解码
     * @param str 加密的字符串
     */
    decode(str: string) {
        return CryptoGroup.CryptoEnc.Base64.parse(str).toString(CryptoGroup.CryptoEnc.Utf8);
    }
}

class RSABuilder {
    private publicKeyValue: string;
    private privateKeyValue: string;

    publicKey(key: string) {
        this.publicKeyValue = key;
        return this;
    }

    privateKey(key: string) {
        this.privateKeyValue = key;
        return this;
    }

    build() {
        return new RSA(this.publicKeyValue, this.privateKeyValue);
    }
}

export class RSA {
    private instance;

    constructor(publicKey?: string, privateKey?: string) {
        this.instance = new CryptoGroup.JSEncrypt();
        if (publicKey) {
            this.instance.setPublicKey(publicKey);
        }
        if (privateKey) {
            this.instance.setPrivateKey(privateKey);
        }
    }

    /**
     * 链式构造
     */
    static builder() {
        return new RSABuilder();
    }

    /**
     * 函式构造
     * @param publicKey 公钥
     * @param privateKey 私钥
     */
    static build(publicKey?: string, privateKey?: string) {
        return new RSA(publicKey, privateKey);
    }

    /**
     * 生成公钥
     */
    getPublicKey() {
        return this.instance.getPublicKey();
    }

    /**
     * 生成私钥
     */
    getPrivateKey() {
        return this.instance.getPrivateKey();
    }

    /**
     * 生成公钥（去掉前后缀）
     */
    getSimplePublicKey() {
        return this.instance.getPublicKey().replace("-----BEGIN PUBLIC KEY-----\n", "").replace("\n-----END PUBLIC KEY-----", "");
    }

    /**
     * 生成私钥（去掉前后缀）
     */
    getSimplePrivateKey() {
        return this.instance.getPrivateKey().replace("-----BEGIN RSA PRIVATE KEY-----\n", "").replace("\n-----END RSA PRIVATE KEY-----", "");
    }

    /**
     * 设置公钥
     */
    setPublicKey(key: string) {
        return this.instance.setPublicKey(key);
    }

    /**
     * 设置私钥
     */
    setPrivateKey(key: string) {
        return this.instance.setPrivateKey(key);
    }

    /**
     * 公钥加密
     * @param str 字符串
     */
    encode(str: string): string {
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
        return this.instance.sign(str, digestMethod.method, digestMethod.type);
    }

    /**
     * 验签
     * @param str 字符串
     * @param signature 签名
     * @param digestMethod 摘要方法
     */
    verify(str: string, signature: string, digestMethod: RSASignMethodRel): boolean {
        return this.instance.verify(str, signature, digestMethod.method);
    }
}

class AESClass {

    secretKey: string;
    iv: string;
    mode;
    padding;

    constructor(secretKey: string) {
        this.secretKey = CryptoGroup.CryptoEnc.Utf8.parse(secretKey);
        this.padding = CryptoGroup.CryptoPad.Pkcs7;
        this.mode = CryptoGroup.CryptoMod.ECB;
    }

    setIv(iv: string) {
        this.iv = CryptoGroup.CryptoEnc.Utf8.parse.parse(iv);
    }

    static build(secretKey: string) {
        return new AESClass(secretKey);
    }

    setPadding(padding) {
        this.padding = padding;
    }

    setMode(mode) {
        this.mode = mode;
    }

    encode(str: string): string {
        const ciphertext = CryptoGroup.AESEncrypt.encrypt(str, this.secretKey, {
            mode: this.mode,
            padding: this.padding,
            iv: this.iv
        }).ciphertext;
        return ciphertext.toString(CryptoGroup.CryptoEnc.Base64);
    }

    decode(str: string): string {
        return CryptoGroup.AESEncrypt.decrypt({
            ciphertext: CryptoGroup.CryptoEnc.Base64.parse(str)
        }, this.secretKey, {
            mode: this.mode,
            padding: this.padding,
            iv: this.iv
        }).toString(CryptoGroup.CryptoEnc.Utf8);
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
        return CryptoGroup.CryptoMethod.MD5(str).toString();
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
