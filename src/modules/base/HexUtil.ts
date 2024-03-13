class HexUtil {
    /**
     * 字符串转16进制
     * @param str 字符串
     */
    encode(str: string): string {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            hex += str.charCodeAt(i).toString(16);
        }
        return hex;
    }

    /**
     * 十六进制转字符串
     * @param hex 十六进制
     */
    decode(hex: string): string {
        let str = '';
        for (let i = 0; i < hex.length; i += 2) {
            // 获取每两个字符组成的十六进制数
            let sub = hex.substr(i, 2);
            // 将十六进制数转换为十进制数
            let dec = parseInt(sub, 16);
            // 将十进制数转换为字符
            str += String.fromCharCode(dec);
        }
        return str;
    }

    /**
     * buffer转16进制
     * @param buffer 文件Buffer
     */
    bufferToHex(buffer: ArrayBuffer): string {
        const uint8Array = new Uint8Array(buffer);
        return this.unit8ArrayToHex(uint8Array);
    }

    /**
     * unit8Array转16进制
     * @param unit8Array unit8Array
     */
    unit8ArrayToHex(unit8Array: Uint8Array): string {
        // 将Uint8Array转换为16进制字符串
        let hexString = '';
        for (let i = 0; i < unit8Array.length; i++) {
            let hex = unit8Array[i].toString(16);
            hexString += hex.length === 1 ? '0' + hex : hex;
        }
        return hexString;
    }
}

export default new HexUtil();
