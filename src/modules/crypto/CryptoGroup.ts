class CryptoEnc {
    Utf8
    Utf16
    Base64
    Base64url
    Hex
}

class CryptoPad {
    Pkcs7
    Ansix923
    Iso10126
    Iso97971
    NoPadding
    ZeroPadding
}

class CryptoMod {
    CFB
    CTR
    CTRGladman
    ECB
    OFB
}

class CryptoMethod {
    MD5
    SHA1
    SHA3
    SHA224
    SHA256
    SHA384
    SHA512
    RIPEMD160
}

export class RSASignMethodRel {

    method: (str: string) => string
    type: string

    constructor(method: (str: string) => string, type: string) {
        this.method = method;
        this.type = type;
    }
}

class RSASignMethod {
    md5
    sha1
    sha224
    sha256
    sha384
    sha512
    ripemd160
}

class CryptoLib {
    WordArray
}

class CryptoGroup {
    CryptoJS;
    JSEncrypt;
    AESEncrypt;
    CryptoLib = new CryptoLib()
    CryptoEnc = new CryptoEnc()
    CryptoPad = new CryptoPad()
    CryptoMod = new CryptoMod()
    /**
     * 加密方法
     */
    CryptoMethod = new CryptoMethod()
    /**
     * RSA签名摘要方法
     */
    RSASignMethod = new RSASignMethod()

    initCryptoJS(CryptoJS) {
        this.CryptoJS = CryptoJS;
        if (CryptoJS) {
            this.AESEncrypt = CryptoJS.AES;

            this.CryptoLib.WordArray = CryptoJS.lib.WordArray;

            this.CryptoEnc.Base64 = CryptoJS.enc.Base64;
            this.CryptoEnc.Utf8 = CryptoJS.enc.Utf8;
            this.CryptoEnc.Utf16 = CryptoJS.enc.Utf16;
            this.CryptoEnc.Base64url = CryptoJS.enc.Base64url;
            this.CryptoEnc.Hex = CryptoJS.enc.Hex;

            this.CryptoMethod.MD5 = CryptoJS.MD5;
            this.CryptoMethod.SHA1 = CryptoJS.SHA1;
            this.CryptoMethod.SHA3 = CryptoJS.SHA3;
            this.CryptoMethod.SHA224 = CryptoJS.SHA224;
            this.CryptoMethod.SHA256 = CryptoJS.SHA256;
            this.CryptoMethod.SHA384 = CryptoJS.SHA384;
            this.CryptoMethod.SHA512 = CryptoJS.SHA512;
            this.CryptoMethod.RIPEMD160 = CryptoJS.RIPEMD160;

            this.RSASignMethod.md5 = new RSASignMethodRel(CryptoJS.MD5, "md5");
            this.RSASignMethod.sha1 = new RSASignMethodRel(CryptoJS.SHA1, "sha1");
            this.RSASignMethod.sha224 = new RSASignMethodRel(CryptoJS.SHA224, "sha224");
            this.RSASignMethod.sha256 = new RSASignMethodRel(CryptoJS.SHA256, "sha256");
            this.RSASignMethod.sha384 = new RSASignMethodRel(CryptoJS.SHA384, "sha384");
            this.RSASignMethod.sha512 = new RSASignMethodRel(CryptoJS.SHA512, "sha512");
            this.RSASignMethod.ripemd160 = new RSASignMethodRel(CryptoJS.RIPEMD160, "ripemd160");

            this.CryptoPad.Pkcs7 = CryptoJS.pad.Pkcs7;
            this.CryptoPad.Ansix923 = CryptoJS.pad.Ansix923;
            this.CryptoPad.Iso10126 = CryptoJS.pad.Iso10126;
            this.CryptoPad.Iso97971 = CryptoJS.pad.Iso97971;
            this.CryptoPad.NoPadding = CryptoJS.pad.NoPadding;
            this.CryptoPad.ZeroPadding = CryptoJS.pad.ZeroPadding;

            this.CryptoMod.CFB = CryptoJS.mode.CFB;
            this.CryptoMod.CTR = CryptoJS.mode.CTR;
            this.CryptoMod.CTRGladman = CryptoJS.mode.CTRGladman;
            this.CryptoMod.ECB = CryptoJS.mode.ECB;
            this.CryptoMod.OFB = CryptoJS.mode.OFB;
        }
    }

    initJSEncrypt(JSEncrypt) {
        this.JSEncrypt = JSEncrypt;
    }
}

export default new CryptoGroup()
