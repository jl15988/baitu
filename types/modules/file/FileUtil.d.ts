declare class FileUtil {
    /**
     * 通过截取文件名称获取文件类型
     * @param fileName 文件名称
     */
    getTypeSimple(fileName: string): string;
    /**
     * 通过截取文件名称获取文件类型
     * @param file 文件
     */
    getFileTypeSimple(file: File): string;
    /**
     * 通过截取文件名称判断是否某种类型
     * @param fileName 文件名称
     * @param type 文件类型
     */
    isTypeSimple(fileName: string, type: string): boolean;
    /**
     * 通过截取文件名称判断是否某种类型
     * @param file 文件
     * @param type 文件类型
     */
    isFileTypeSimple(file: File, type: string): boolean;
    /**
     * 获取文件的16进制字符串
     * @param file 文件
     * @param len 截取文件的长度
     */
    getHexString(file: File, len?: number): Promise<string>;
    /**
     * 获取文件Buffer
     * @param file 文件
     * @param len 截取文件的长度
     */
    getFileBuffer(file: File | Blob, len?: number): Promise<string | ArrayBuffer>;
    /**
     * 获取文件的Unit8数组
     * @param file 文件
     * @param len 截取文件的长度
     */
    getUnit8Array(file: File, len?: number): Promise<Uint8Array>;
    /**
     * 通过魔数获取文件类型（byte值获取）
     * 不总是准确的，因为不是所有的文件类型都有唯一的魔数
     * 支持的文件类型见：{@link FileTypeMagicMap}
     * @param file 文件
     */
    getTypeMagic(file: File): Promise<string>;
    /**
     * 将文件下载
     * @param file 文件
     * @param filename 文件名，为空时，取文件原名
     * @param mime 文件MIME类型
     */
    download(file: File, filename?: string, mime?: string): void;
}
declare const _default: FileUtil;
export default _default;
