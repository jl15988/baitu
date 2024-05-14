/**
 * 图片处理结果
 */
export type ImgResult = {
    img: HTMLImageElement;
    file: File;
    blob: Blob;
    name: string;
    type: string;
    quality: number;
    params: any;
};
/**
 * 图片工具
 */
declare class ImgUtil {
    /**
     * Html 图片转 Blob
     * @param img 图片
     * @param type MIME类型
     */
    toBlob(img: HTMLImageElement, type?: string): Promise<Blob>;
    /**
     * 剪裁图片
     * @param file 文件
     * @param x 剪裁的x坐标
     * @param y 剪裁的y轴坐标
     * @param w 剪裁的宽度
     * @param h 剪裁的高度
     * @param quality 质量，0到1
     */
    cut(file: File, x: number, y: number, w: number, h: number, quality?: number): Promise<ImgResult>;
    dataURLtoBlob(dataurl: string): Blob;
    resize(file: File, maxWidth: number, maxHeight: number, quality?: number): Promise<unknown>;
    /**
     * 获取文件 DataURL
     * @param file 文件
     */
    getDataURL(file: File | Blob): string;
    /**
     * 文件或 Blob 转 Base64 数据
     * @param file 文件
     */
    getBase64(file: File | Blob): string;
    /**
     * 文件转 Base64 数据
     * @param file 文件
     */
    /**
     * 获取 Base64 中的文件类型
     * @param base64Data base64 数据
     */
    getBase64ContentType(base64Data: string): string;
    /**
     * 获取 Base64 中的文件内容
     * @param base64Data base64 数据
     */
    getBase64Content(base64Data: string): string;
    /**
     * Base64 转 Blob
     * @param base64Data base64 数据
     */
    base64ToBlob(base64Data: string): Blob;
    /**
     * base64 转文件
     * @param base64Data base64 数据
     * @param filename 文件名称
     */
    base64ToFile(base64Data: string, filename: string): File;
}
declare const _default: ImgUtil;
export default _default;
