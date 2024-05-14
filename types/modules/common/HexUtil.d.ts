/**
 * 16进制工具
 */
declare class HexUtil {
    /**
     * 字符串转16进制字符串，UTF8编码
     * @param str 字符串
     */
    encode(str: string): string;
    /**
     * 十六进制字符串转字符串，UTF8编码
     * @param hex 十六进制
     */
    decode(hex: string): string;
    /**
     * buffer转16进制字符串
     * @param arrayBuffer 原始二进制数据缓冲区
     */
    arrayBufferToHex(arrayBuffer: ArrayBuffer): string;
    /**
     * uint8Array转16进制字符串
     * @param uint8Array uint8Array
     */
    uint8ArrayToHex(uint8Array: Uint8Array): string;
    /**
     * 16进制字符串转Uint8
     * @param hex 16进制字符串
     */
    hexToUint8Array(hex: string): Uint8Array;
}
declare const _default: HexUtil;
export default _default;
