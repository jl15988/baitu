import StrUtil from "../string/StrUtil";

class HexUtil {
    /**
     * 字符串转16进制字符串，UTF8编码
     * @param str 字符串
     */
    encode(str: string): string {
        const textEncoder = new TextEncoder();
        const uint8Array = textEncoder.encode(str);
        return Array.from(uint8Array, byte => StrUtil.padStart(byte.toString(16), 2, '0')).join('');
    }

    /**
     * 十六进制字符串转字符串，UTF8编码
     * @param hex 十六进制
     */
    decode(hex: string): string {
        const textDecoder = new TextDecoder('utf-8');
        const uint8Array = this.hexToUint8(hex);
        return textDecoder.decode(uint8Array);
    }

    /**
     * buffer转16进制字符串
     * @param buffer 文件Buffer
     */
    bufferToHex(buffer: ArrayBuffer): string {
        const uint8Array = new Uint8Array(buffer);
        return this.uint8ArrayToHex(uint8Array);
    }

    /**
     * unit8Array转16进制字符串
     * @param uint8Array unit8Array
     */
    uint8ArrayToHex(uint8Array: Uint8Array): string {
        // 将Uint8Array转换为16进制字符串
        return Array.from(uint8Array, byte => byte.toString(16)).join('');
    }

    /**
     * 16进制字符串转Uint8
     * @param hex 16进制字符串
     */
    hexToUint8(hex: string): Uint8Array {
        // 移除所有空格
        const hexString = hex.replace(/\s/g, '');

        // 确保字符串长度是偶数
        if (hexString.length % 2 !== 0) {
            throw new Error('Invalid hex string');
        }

        const len = hexString.length / 2;
        const bytes = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            const byteString = hexString.substr(i * 2, 2);
            const byteValue = parseInt(byteString, 16);
            if (isNaN(byteValue)) {
                throw new Error('Invalid hex string');
            }
            bytes[i] = byteValue;
        }

        return bytes;
    }
}

export default new HexUtil();
