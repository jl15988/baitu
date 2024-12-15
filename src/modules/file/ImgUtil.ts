import FileUtil from "./FileUtil";

/**
 * 图片处理结果
 */
export type ImgResult = {
    img: HTMLImageElement,
    file: File,
    blob: Blob,
    name: string,
    type: string,
    quality: number,
    params: any
}

/**
 * 图片工具
 */
class ImgUtil {

    /**
     * Html 图片转 Blob
     * @param img 图片
     * @param type MIME类型
     */
    toBlob(img: HTMLImageElement, type?: string): Promise<Blob | null> {
        return new Promise((resolve, reject) => {
            // 创建一个canvas元素
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            // 将图像绘制到canvas上
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, img.width, img.height);

            // 将canvas内容转换为Blob对象
            canvas.toBlob(function (blob) {
                // 在这里，blob就是包含图像数据的Blob对象
                // 你可以使用它进行进一步的操作，比如上传到服务器
                resolve(blob);
            }, type || 'image/png', 1); // 第二个参数是MIME类型，第三个参数是图像质量（0到1之间）
        });
    }

    /**
     * 剪裁图片
     * @param file 文件
     * @param x 剪裁的x坐标
     * @param y 剪裁的y轴坐标
     * @param w 剪裁的宽度
     * @param h 剪裁的高度
     * @param quality 质量，0到1
     */
    cut(file: File, x: number, y: number, w: number, h: number, quality: number = 1): Promise<Partial<ImgResult>> {
        return new Promise((resolve, reject) => {
            FileUtil.toImage(file).then(imgFile => {
                // 创建一个离屏Canvas元素
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = w;
                canvas.height = h;
                // 使用drawImage进行剪裁
                ctx?.drawImage(imgFile.img, x, y, w, h, 0, 0, w, h);

                const cutResult: Partial<ImgResult> = {
                    img: undefined,
                    file: undefined,
                    blob: undefined,
                    name: file.name,
                    type: imgFile.type,
                    quality: quality,
                    params: {
                        x: x,
                        y: y,
                        w: w,
                        h: h
                    }
                };

                // 转blob并下载
                canvas.toBlob(blob => {
                    cutResult.blob = blob || undefined;
                    cutResult.file = blob ? FileUtil.blobToFile(blob, file.name) : undefined;

                    // 将Canvas转换为DataURL
                    const dataURL = canvas.toDataURL(file.type);
                    const croppedImg = new Image();
                    croppedImg.src = dataURL;
                    cutResult.img = croppedImg;
                    URL.revokeObjectURL(dataURL);
                    resolve(cutResult);
                }, imgFile.type, quality);
            }).catch(err => {
                reject(err);
            });
        })
    }

    dataURLtoBlob(dataurl: string): Blob {
        // @ts-ignore
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    resize(file: File, maxWidth: number, maxHeight: number, quality: number = 1) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // 计算新的图片尺寸
                let width = img.width;
                let height = img.height;
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;

                // 绘制图片到canvas
                ctx?.clearRect(0, 0, width, height);
                ctx?.drawImage(img, 0, 0, width, height);

                const cutResult: Partial<ImgResult> = {
                    img: undefined,
                    file: undefined,
                    blob: undefined,
                    name: file.name,
                    type: file.type,
                    quality: quality,
                    params: {
                        maxWidth: maxWidth,
                        maxHeight: maxHeight
                    }
                };

                canvas.toBlob(blob => {
                    cutResult.blob = blob || undefined;
                    cutResult.file = blob ? FileUtil.blobToFile(blob, file.name) : undefined;

                    // 将Canvas转换为DataURL
                    const dataURL = canvas.toDataURL(file.type);
                    const croppedImg = new Image();
                    croppedImg.src = dataURL;
                    cutResult.img = croppedImg;
                    URL.revokeObjectURL(dataURL);
                    resolve(cutResult);
                });
            }
            img.onerror = () => {
                reject("读取图片错误");
            }
        })
    }

    /**
     * 获取文件 DataURL
     * @param file 文件
     */
    getDataURL(file: File | Blob): string {
        return URL.createObjectURL(file);
        // return new Promise((resolve, reject) => {
        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         const dataURL = e.target.result;
        //         resolve(String(dataURL));
        //     };
        //     reader.onerror = function (error) {
        //         reject(error);
        //     };
        //     reader.readAsDataURL(len ? file.slice(0, len) : file);
        // });
    }

    /**
     * 文件或 Blob 转 Base64 数据
     * @param file 文件
     */
    getBase64(file: File | Blob): string {
        return URL.createObjectURL(file);
    }

    /**
     * 文件转 Base64 数据
     * @param file 文件
     */
    // fileToBase64(file: File): Promise<string> {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             let data
    //             if (typeof e.target.result === 'object') {
    //                 data = window.URL.createObjectURL(new Blob([e.target.result]))
    //             } else {
    //                 data = e.target.result
    //             }
    //             resolve(data);
    //         }
    //         reader.onerror = function (error) {
    //             reject(error);
    //         };
    //         //转化为base64
    //         reader.readAsDataURL(file);
    //     });
    // }

    /**
     * 获取 Base64 中的文件类型
     * @param base64Data base64 数据
     */
    getBase64ContentType(base64Data: string): string {
        const parts = base64Data.split(';base64,');
        return parts[0].split(':')[1];
    }

    /**
     * 获取 Base64 中的文件内容
     * @param base64Data base64 数据
     */
    getBase64Content(base64Data: string): string {
        const parts = base64Data.split(';base64,');
        return parts[1];
    }

    /**
     * Base64 转 Blob
     * @param base64Data base64 数据
     */
    base64ToBlob(base64Data: string): Blob {
        // 将base64的数据部分提取出来
        const contentType = this.getBase64ContentType(base64Data);
        const raw = window.atob(this.getBase64Content(base64Data));

        // 将原始数据转换为Uint8Array
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        // 使用Uint8Array创建Blob，然后使用Blob创建File
        return new Blob([uInt8Array], {type: contentType});
    }

    /**
     * base64 转文件
     * @param base64Data base64 数据
     * @param filename 文件名称
     */
    base64ToFile(base64Data: string, filename: string): File {
        const blob = this.base64ToBlob(base64Data);
        const contentType = this.getBase64ContentType(base64Data);
        return new File([blob], filename, {type: contentType});
    }

    /**
     * 获取文件的图片数据
     * @param file 文件
     */
    async getImageData(file: File) {
        const res = await FileUtil.toImage(file)
        const img = res.img
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        return ctx.getImageData(0, 0, img.width, img.height)
    }
}

export default new ImgUtil();
