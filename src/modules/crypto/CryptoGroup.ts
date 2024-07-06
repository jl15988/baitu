import CryptoJS from 'crypto-js'
import {JSEncrypt} from "jsencrypt";

export class RSASignMethodRel {

    method: (str: string) => string
    type: string

    constructor(method: (str: string) => string, type: string) {
        this.method = method;
        this.type = type;
    }
}

class CryptoGroup {
    CryptoJS?: typeof CryptoJS
    JSEncrypt?: typeof JSEncrypt
    /**
     * 加密方法
     */

    // CryptoMethod = new CryptoMethod()
    /**
     * RSA签名摘要方法
     */
    // RSASignMethod = new RSASignMethod()

    initCryptoJS(instance: typeof CryptoJS) {
        this.CryptoJS = instance;
    }

    initJSEncrypt(instance: typeof JSEncrypt) {
        this.JSEncrypt = instance;
    }
}

export default new CryptoGroup()
