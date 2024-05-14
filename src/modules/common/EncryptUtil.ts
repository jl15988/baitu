export class Base64Class {

    /**
     * 编码
     * @param str 字符串
     */
    encode(str: string) {
        return encryptUtil.Base64Encrypt.stringify(encryptUtil.CJUTF8.parse(str));
    }

    /**
     * 解码
     * @param str 加密的字符串
     */
    decode(str: string) {
        return encryptUtil.Base64Encrypt.parse(str).toString(encryptUtil.CJUTF8);
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
        const encrypt = new encryptUtil.JSEncrypt();
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
        const encrypt = new encryptUtil.JSEncrypt();
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

class AESClass {

    secretKey: string;
    iv: string;
    mode;
    padding;

    constructor(secretKey: string) {
        this.secretKey = encryptUtil.CJUTF8.parse(secretKey);
        this.padding = encryptUtil.AESPad.Pkcs7;
        this.mode = encryptUtil.AESMod.ECB;
    }

    setIv(iv: string) {
        this.iv = encryptUtil.CJUTF8.parse.parse(iv);
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
        const ciphertext = encryptUtil.AESEncrypt.encrypt(str, this.secretKey, {
            mode: this.mode,
            padding: this.padding,
            iv: this.iv
        }).ciphertext;
        return ciphertext.toString(encryptUtil.Base64Encrypt);
    }

    decode(str: string): string {
        return encryptUtil.AESEncrypt.decrypt({
            ciphertext: encryptUtil.Base64Encrypt.parse(str)
        }, this.secretKey, {
            mode: this.mode,
            padding: this.padding,
            iv: this.iv
        }).toString(encryptUtil.CJUTF8);
    }
}

class EncryptUtil {

    CryptoJS;
    JSEncrypt;
    MD5Encrypt;
    AESEncrypt;
    Base64Encrypt;
    CJUTF8;
    AESPad = {
        Pkcs7: undefined,
        Ansix923: undefined,
        Iso10126: undefined,
        Iso97971: undefined,
        NoPadding: undefined,
        ZeroPadding: undefined
    };
    AESMod = {
        CFB: undefined,
        CTR: undefined,
        CTRGladman: undefined,
        ECB: undefined,
        OFB: undefined
    };

    setCryptoJS(CryptoJS) {
        this.CryptoJS = CryptoJS;
        if (CryptoJS) {
            this.Base64Encrypt = CryptoJS.enc.Base64;
            this.CJUTF8 = CryptoJS.enc.Utf8;
            this.MD5Encrypt = CryptoJS.MD5;
            this.AESEncrypt = CryptoJS.AES;

            this.AESPad.Pkcs7 = CryptoJS.pad.Pkcs7;
            this.AESPad.Ansix923 = CryptoJS.pad.Ansix923;
            this.AESPad.Iso10126 = CryptoJS.pad.Iso10126;
            this.AESPad.Iso97971 = CryptoJS.pad.Iso97971;
            this.AESPad.NoPadding = CryptoJS.pad.NoPadding;
            this.AESPad.ZeroPadding = CryptoJS.pad.ZeroPadding;

            this.AESMod.CFB = CryptoJS.mode.CFB;
            this.AESMod.CTR = CryptoJS.mode.CTR;
            this.AESMod.CTRGladman = CryptoJS.mode.CTRGladman;
            this.AESMod.ECB = CryptoJS.mode.ECB;
            this.AESMod.OFB = CryptoJS.mode.OFB;
        }
    }

    setJSEncrypt(JSEncrypt) {
        this.JSEncrypt = JSEncrypt;
    }

    /**
     * Base64加密
     */
    Base64: Base64Class = new Base64Class();
    /**
     * MD5加密
     * @param str 字符串
     */
    MD5: (str: string) => string = (str: string) => {
        return this.MD5Encrypt(str).toString();
    }
    /**
     * RSA非对称加密
     */
    RSA = RSA;
    AES = AESClass
}

const encryptUtil = new EncryptUtil();

export default encryptUtil;
