/**
 * 图片文件
 */
export type ImageFile = {
    name: string;
    img: HTMLImageElement;
    type: string;
};
/**
 * 文件工具
 */
declare class FileUtil {
    /**
     * 获取文件主名
     * @param fileName 文件名
     */
    getMainName(fileName: string): string;
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
     * @param start 截取文件的开始
     */
    getHexString(file: File, len?: number, start?: number): Promise<string>;
    /**
     * 获取文件Buffer
     * @param file 文件
     * @param len 截取文件的长度
     * @param start 截取文件的开始
     */
    getArrayBuffer(file: File | Blob, len?: number, start?: number): Promise<string | ArrayBuffer>;
    /**
     * 获取文件的Uint8数组
     * @param file 文件
     * @param len 截取文件的长度
     * @param start 截取文件的开始
     */
    getUint8Array(file: File, len?: number, start?: number): Promise<Uint8Array>;
    /**
     * 通过魔数获取文件类型（byte值获取）
     * 不总是准确的，因为不是所有的文件类型都有唯一的魔数
     * 支持的文件类型见：{@link FileTypeMagicMap}
     * @param file 文件
     */
    getTypeMagic(file: File): Promise<string>;
    /**
     * 通过魔数判断是否某种类型
     * @param file 文件
     * @param type 文件类型
     */
    isTypeMagic(file: File, type: string): Promise<boolean>;
    /**
     * 文件转Image
     * @param file 文件
     */
    toImage(file: File): Promise<ImageFile>;
    /**
     * 将文件下载
     * @param file 文件
     * @param filename 文件名，为空时，取文件原名
     * @param mime 文件MIME类型
     */
    download(file: File, filename?: string, mime?: string): void;
    /**
     * 下载Blob
     * @param blob 文件的Blob
     * @param filename 文件名称
     */
    downloadBlob(blob: Blob, filename: string): void;
    blobToFile(blob: any, fileName: any): File;
    /**
     * 获取文件的 MD5
     * @param file 文件
     * @param len 截取文件的长度
     * @param start 截取文件的开始
     */
    getMD5(file: File, len?: number, start?: number): Promise<string>;
    /**
     * 获取文件的 SHA256，该方法依赖于 CryptoJs，使用前请先通过 CryptoGroup.initCryptoJS 方法初始化 CryptoJs
     * @param file 文件
     * @param len 截取文件的长度
     * @param start 截取文件的开始
     */
    getSha256(file: File, len?: number, start?: number): Promise<string>;
}
declare const _default: FileUtil;
export default _default;
