declare class CryptoENC {
    Utf8: any;
    Utf16: any;
    Base64: any;
    Base64url: any;
    Hex: any;
}
declare class CryptoPad {
    Pkcs7: any;
    Ansix923: any;
    Iso10126: any;
    Iso97971: any;
    NoPadding: any;
    ZeroPadding: any;
}
declare class CryptoMod {
    CFB: any;
    CTR: any;
    CTRGladman: any;
    ECB: any;
    OFB: any;
}
declare class CryptoMethod {
    MD5: any;
    SHA1: any;
    SHA3: any;
    SHA224: any;
    SHA256: any;
    SHA384: any;
    SHA512: any;
    RIPEMD160: any;
}
export declare class RSASignMethodRel {
    method: (str: string) => string;
    type: string;
    constructor(method: (str: string) => string, type: string);
}
declare class RSASignMethod {
    md5: any;
    sha1: any;
    sha224: any;
    sha256: any;
    sha384: any;
    sha512: any;
    ripemd160: any;
}
declare class CryptoGroup {
    CryptoJS: any;
    JSEncrypt: any;
    AESEncrypt: any;
    CryptoENC: CryptoENC;
    CryptoPad: CryptoPad;
    CryptoMod: CryptoMod;
    /**
     * 加密方法
     */
    CryptoMethod: CryptoMethod;
    /**
     * RSA签名摘要方法
     */
    RSASignMethod: RSASignMethod;
    initCryptoJS(CryptoJS: any): void;
    initJSEncrypt(JSEncrypt: any): void;
}
declare const _default: CryptoGroup;
export default _default;
