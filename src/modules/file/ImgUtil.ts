import FileUtil from "./FileUtil";

/**
 * 图片剪裁结果
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

export class ImgUtil {

    /**
     * 图片转Blob
     * @param img 图片
     * @param type MIME类型
     */
    toBlob(img: HTMLImageElement, type?: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            // 创建一个canvas元素
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            // 将图像绘制到canvas上
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);

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
    cut(file: File, x: number, y: number, w: number, h: number, quality: number = 1): Promise<ImgResult> {
        return new Promise((resolve, reject) => {
            FileUtil.toImage(file).then(imgFile => {
                // 创建一个离屏Canvas元素
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = w;
                canvas.height = h;
                // 使用drawImage进行剪裁
                ctx.drawImage(imgFile.img, x, y, w, h, 0, 0, w, h);

                const cutResult: ImgResult = {
                    img: null,
                    file: null,
                    blob: null,
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
                    cutResult.blob = blob;
                    cutResult.file = FileUtil.blobToFile(blob, file.name);

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
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(img, 0, 0, width, height);

                const cutResult: ImgResult = {
                    img: null,
                    file: null,
                    blob: null,
                    name: file.name,
                    type: file.type,
                    quality: quality,
                    params: {
                        maxWidth: maxWidth,
                        maxHeight: maxHeight
                    }
                };

                canvas.toBlob(blob => {
                    cutResult.blob = blob;
                    cutResult.file = FileUtil.blobToFile(blob, file.name);

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
     * 获取文件DataURL
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
}

export default new ImgUtil();
