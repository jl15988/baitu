/**
 * 图片剪裁结果
 */
export type ImgCutResult = {
    img: HTMLImageElement;
    file: File;
    blob: Blob;
    name: string;
    type: string;
    quality: number;
    x: number;
    y: number;
    w: number;
    h: number;
};
declare class ImgUtil {
    /**
     * 图片转Blob
     * @param img 图片
     * @param type MIME类型
     */
    toBlob(img: HTMLImageElement, type: string): Promise<Blob>;
    /**
     * 剪裁图片
     * @param file 文件
     * @param x 剪裁的x坐标
     * @param y 剪裁的y轴坐标
     * @param w 剪裁的宽度
     * @param h 剪裁的高度
     * @param quality 质量，0到1
     */
    cut(file: File, x: number, y: number, w: number, h: number, quality?: number): Promise<ImgCutResult>;
    dataURLtoBlob(dataurl: string): Blob;
}
declare const _default: ImgUtil;
export default _default;
