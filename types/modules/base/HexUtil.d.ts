declare class HexUtil {
    /**
     * 字符串转16进制
     * @param str 字符串
     */
    encode(str: string): string;
    /**
     * 十六进制转字符串
     * @param hex 十六进制
     */
    decode(hex: string): string;
    /**
     * buffer转16进制
     * @param buffer 文件Buffer
     */
    bufferToHex(buffer: ArrayBuffer): string;
    /**
     * unit8Array转16进制
     * @param unit8Array unit8Array
     */
    unit8ArrayToHex(unit8Array: Uint8Array): string;
}
declare const _default: HexUtil;
export default _default;
