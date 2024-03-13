declare class FileUtil {
    /**
     * 通过截取文件名称获取文件类型
     * @param fileName 文件名称
     */
    getTypeSimple(fileName: string): string;
    /**
     * 获取文件的16进制字符串
     * @param file 文件
     * @param toUpperCase 是否转大写，默认否
     */
    getHexString(file: File, toUpperCase?: boolean): Promise<string>;
    /**
     * 获取文件Buffer
     * @param file 文件
     */
    getFileBuffer(file: File): Promise<string | ArrayBuffer>;
    /**
     * 获取文件的Unit8数组
     * @param file 文件
     */
    getUnit8Array(file: File): Promise<Uint8Array>;
    /**
     * 通过魔数获取文件类型（byte值获取）
     * 不总是准确的，因为不是所有的文件类型都有唯一的魔数
     * @param file 文件
     */
    getTypeByte(file: File): Promise<string>;
}
declare const _default: FileUtil;
export default _default;
