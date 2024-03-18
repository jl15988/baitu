import FileUtil from "./FileUtil";

class ImgUtil {

    /**
     * 图片转Blob
     * @param img 图片
     * @param type MIME类型
     */
    toBlob(img: HTMLImageElement, type: string): Promise<Blob> {
        return new Promise((resolve, reject) => {
            img.onload = () => {
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
            }
        });
    }

    /**
     * 剪裁图片
     * @param file 文件
     * @param x 剪裁的x坐标
     * @param y 剪裁的y轴坐标
     * @param w 剪裁的宽度
     * @param h 剪裁的高度
     */
    slice(file: File, x: number, y: number, w: number, h: number) {
        FileUtil.toImage(file).then(imgFile => {
            // 创建一个离屏Canvas元素
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = w;
            canvas.height = h;
            // 使用drawImage进行剪裁
            ctx.drawImage(imgFile.img, x, y, w, h, 0, 0, w, h);

            // 转blob并下载
            canvas.toBlob(blob => {
                FileUtil.downloadBlob(blob, imgFile.name);
            }, imgFile.type, 1);
        });
    }
}

export default new ImgUtil();
