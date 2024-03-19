import FileTypeMagicMap from "./FileTypeMagicMap";
import HexUtil from "../base/HexUtil";
import ImgUtil from "./ImgUtil";

/**
 * 图片文件
 */
export type ImageFile = {
    name: string,
    img: HTMLImageElement,
    type: string
}

/**
 * 文件工具
 */
export class FileUtil {

    /**
     * 获取文件主名
     * @param fileName 文件名
     */
    getMainName(fileName: string): string {
        const end = fileName.lastIndexOf(".");
        return end !== -1 ? fileName.substring(0, end) : fileName;
    }

    /**
     * 通过截取文件名称获取文件类型
     * @param fileName 文件名称
     */
    getTypeSimple(fileName: string): string {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    /**
     * 通过截取文件名称获取文件类型
     * @param file 文件
     */
    getFileTypeSimple(file: File): string {
        return this.getTypeSimple(file.name);
    }

    /**
     * 通过截取文件名称判断是否某种类型
     * @param fileName 文件名称
     * @param type 文件类型
     */
    isTypeSimple(fileName: string, type: string) {
        return this.getTypeSimple(fileName) === type;
    }

    /**
     * 通过截取文件名称判断是否某种类型
     * @param file 文件
     * @param type 文件类型
     */
    isFileTypeSimple(file: File, type: string) {
        return this.isTypeSimple(file.name, type);
    }

    /**
     * 获取文件的16进制字符串
     * @param file 文件
     * @param len 截取文件的长度
     */
    getHexString(file: File, len?: number): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getArrayBuffer(file, len).then(res => {
                // @ts-ignore
                resolve(HexUtil.arrayBufferToHex(res));
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 获取文件Buffer
     * @param file 文件
     * @param len 截取文件的长度
     */
    getArrayBuffer(file: File | Blob, len?: number): Promise<string | ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const buffer = e.target.result;
                resolve(buffer);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsArrayBuffer(len ? file.slice(0, len) : file);
        });
    }

    /**
     * 获取文件的Uint8数组
     * @param file 文件
     * @param len 截取文件的长度
     */
    getUint8Array(file: File, len?: number): Promise<Uint8Array> {
        return new Promise(((resolve, reject) => {
            this.getArrayBuffer(file, len).then(res => {
                // @ts-ignore
                const uint8Array = new Uint8Array(res);
                resolve(uint8Array);
            }).catch(err => {
                reject(err);
            })
        }));
    }

    /**
     * 通过魔数获取文件类型（byte值获取）
     * 不总是准确的，因为不是所有的文件类型都有唯一的魔数
     * 支持的文件类型见：{@link FileTypeMagicMap}
     * @param file 文件
     */
    getTypeMagic(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            this.getHexString(file, 100).then(res => {
                for (let fileTypeMapKey in FileTypeMagicMap) {
                    if (res.toUpperCase().startsWith(fileTypeMapKey.toLocaleUpperCase())) {
                        resolve(FileTypeMagicMap[fileTypeMapKey]);
                    }
                }
                resolve("");
            }).catch(err => {
                reject(err);
            });
        });
    }

    /**
     * 通过魔数判断是否某种类型
     * @param file 文件
     * @param type 文件类型
     */
    isTypeMagic(file: File, type: string): Promise<boolean> {
        return new Promise(((resolve, reject) => {
            this.getTypeMagic(file).then(res => {
                resolve(res === type);
            }).catch(err => {
                reject(err);
            });
        }));
    }

    /**
     * 文件转Image
     * @param file 文件
     */
    toImage(file: File): Promise<ImageFile> {
        return new Promise((resolve, reject) => {
            const dataURL = ImgUtil.getDataURL(file);
            const image = new Image()
            image.src = dataURL;
            image.onload = () => {
                resolve({
                    name: file.name,
                    img: image,
                    type: file.type
                });
            }
            image.onerror = () => {
                reject("读取图片错误");
            }
        })
    }

    /**
     * 将文件下载
     * @param file 文件
     * @param filename 文件名，为空时，取文件原名
     * @param mime 文件MIME类型
     */
    download(file: File, filename?: string, mime?: string) {
        const blob = new Blob([file], {type: mime || 'application/octet-stream'})
        this.downloadBlob(blob, filename || file.name);
    }

    /**
     * 下载Blob
     * @param blob 文件的Blob
     * @param filename 文件名称
     */
    downloadBlob(blob: Blob, filename: string) {
        if (typeof window.navigator["msSaveBlob"] !== 'undefined') {
            /*
            “HTML7007:一个或多个blob URL已通过关闭为其创建的blob而被吊销。
            这些URL将不再解析，因为支持该URL的数据已被释放。”
             */
            window.navigator["msSaveBlob"](blob, filename)
        } else {
            const blobURL = window["URL"].createObjectURL(blob)
            const tempLink = document.createElement('a')
            tempLink.style.display = 'none'
            tempLink.href = blobURL
            tempLink.setAttribute('download', filename)

            /*
            Safari认为_blank锚点是弹出窗口。如果浏览器不支持HTML5下载属性，
            我们只想设置_blank target。如果启用了弹出窗口阻止，这允许您在桌面safari中下载文件。
             */
            if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank')
            }

            document.body.appendChild(tempLink)
            tempLink.click()
            document.body.removeChild(tempLink)
            window["URL"].revokeObjectURL(blobURL)
        }
    }

    blobToFile(blob, fileName) {
        return new File([blob], fileName, {
            type: blob.type,
            lastModified: Date.now()
        });
    }
}

export default new FileUtil();
