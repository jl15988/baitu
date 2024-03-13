import FileTypeMap from "./FileTypeMap";

class FileUtil {

    /**
     * 通过截取文件名称获取文件类型
     * @param fileName 文件名称
     */
    getTypeSimple(fileName: string): string {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    /**
     * 获取文件的16进制字符串
     * @param file 文件
     * @param toUpperCase 是否转大写，默认否
     */
    getHexString(file: File, toUpperCase?: boolean): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (event) {
                const arrayBuffer = event.target.result;
                // @ts-ignore
                const uint8Array = new Uint8Array(arrayBuffer);

                // 将Uint8Array转换为16进制字符串
                let hexString = '';
                for (let i = 0; i < uint8Array.length; i++) {
                    let hex = uint8Array[i].toString(16);
                    if (toUpperCase) {
                        hex = hex.toUpperCase();
                    }
                    hexString += hex.length === 1 ? '0' + hex : hex;
                }

                resolve(hexString);
            };

            reader.onerror = function (error) {
                reject(error);
            };

            // 读取文件内容为ArrayBuffer
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * 获取文件Buffer
     * @param file 文件
     */
    getFileBuffer(file: File): Promise<string | ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const buffer = e.target.result;
                resolve(buffer);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * 获取文件的Unit8数组
     * @param file 文件
     */
    getUnit8Array(file: File): Promise<Uint8Array> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const buffer = e.target.result;
                // @ts-ignore
                const uint8Array = new Uint8Array(buffer);
                resolve(uint8Array);
            };
            reader.onerror = function (error) {
                reject(error);
            };
            reader.readAsArrayBuffer(file);
        });
    }

    /**
     * 通过魔数获取文件类型（byte值获取）
     * 不总是准确的，因为不是所有的文件类型都有唯一的魔数
     * @param file 文件
     */
    getTypeByte(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const buffer = e.target.result;
                // @ts-ignore
                const uint8Array = new Uint8Array(buffer);

                // 将Uint8Array转换为16进制字符串
                let hexString = '';
                for (let i = 0; i < uint8Array.length; i++) {
                    const hex = uint8Array[i].toString(16).toUpperCase();
                    hexString += hex.length === 1 ? '0' + hex : hex;
                }

                for (let fileTypeMapKey in FileTypeMap) {
                    if (hexString.startsWith(fileTypeMapKey.toLocaleUpperCase())) {
                        resolve(FileTypeMap[fileTypeMapKey]);
                    }
                }

                resolve("");
            };
            reader.onerror = function (error) {
                reject(error);
            };
            ;
            reader.readAsArrayBuffer(file);
        });
    }
}

export default new FileUtil();
