import ArrayUtil from "../array/ArrayUtil";

/**
 * 字符串工具
 */
class StrUtil {

    /**
     * 判断字符串是否为：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）
     * @param str 字符串
     */
    isBlank(str?: string | null): str is (undefined | null | '') {
        return this.isEmpty(str) || /^\s*$/.test(str.trim());
    }

    /**
     * 判断字符串为非：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）
     * @param str 字符串
     */
    isNotBlank(str?: string | null): str is string {
        return !this.isBlank(str);
    }

    /**
     * 判断字符串为空字符串
     * @param str 字符串
     */
    isEmpty(str?: string | null): str is (undefined | null | '') {
        return typeof str !== 'string' || str.length === 0;
    }

    /**
     * 判断字符串非空字符串
     * @param str 字符串
     */
    isNotEmpty(str?: string | null): str is string {
        return !this.isEmpty(str);
    }

    /**
     * 如果字符串为 null 返回默认值，否则返回原字符串
     * @param str 字符串
     * @param defaultStr 默认值
     */
    defaultIfNull(str: string | undefined | null, defaultStr: string): string {
        if (str == undefined || str === null) {
            return defaultStr;
        }
        return str;
    }

    /**
     * 如果字符串为空白字符串返回默认值，否则返回原字符串
     * @param str 字符串
     * @param defaultStr 默认值
     */
    defaultIfBlank(str: string | undefined | null, defaultStr: string): string {
        if (this.isBlank(str)) {
            return defaultStr;
        }
        return str;
    }

    /**
     * 如果为空字符串返回默认值，否则返回原字符串
     * @param str 字符串
     * @param defaultStr 默认值
     */
    defaultIfEmpty(str: string | undefined | null, defaultStr: string): string {
        if (this.isEmpty(str)) {
            return defaultStr;
        }
        return str;
    }

    /**
     * 判断多个字符串中是否包含空白字符串
     * @param str 字符串数组
     */
    isAnyBlank(...str: string[]): boolean {
        return str.some(str => this.isBlank(str));
    }

    /**
     * 判断多个字符串中是否“不”包含空白字符串
     * @param str 字符串数组
     */
    isNoneBlank(...str: string[]): boolean {
        return !this.isAnyBlank(...str);
    }

    /**
     * 判断多个字符串是否全为空白字符串
     * @param str 字符串数组
     */
    isAllBlank(...str: string[]): boolean {
        return str.every(str => this.isBlank(str));
    }

    /**
     * 判断多个字符串中是否包含空字符串
     * @param str 字符串数组
     */
    isAnyEmpty(...str: string[]): boolean {
        return str.some(str => this.isEmpty(str));
    }

    /**
     * 判断多个字符串中是否“不”包含空字符串
     * @param str 字符串数组
     */
    isNoneEmpty(...str: string[]): boolean {
        return !this.isAnyEmpty(...str);
    }

    /**
     * 判断多个字符串是否全为空字符串
     * @param str 字符串数组
     */
    isAllEmpty(...str: string[]): boolean {
        return str.every(str => this.isEmpty(str));
    }

    /**
     * 获取需要额外填充的字符串
     * @param str 字符串
     * @param len 目标长度
     * @param pad 要填充的字符串
     */
    getPadStr(str: string, len: number, pad?: string): string {
        const padString = pad || ' '; // 如果没有提供填充字符串，则默认为空格
        const targetLength = len || 0; // 如果没有提供目标长度，则默认为0

        // 如果字符串的长度已经达到或超过目标长度，则直接返回原字符串
        if (str.length >= targetLength) {
            return "";
        }

        // 计算需要填充的字符数
        let paddingSize = targetLength - str.length;

        // 如果填充字符串的长度大于需要填充的字符数，则只使用填充字符串的一部分
        return padString.repeat(Math.ceil(paddingSize / padString.length)).slice(0, paddingSize);
    }

    /**
     * 指定字符串长度，如果字符串长度不满足长度，则在首部填充指定字符串，直到满足长度
     * @param str 字符串
     * @param len 目标长度
     * @param pad 要填充的字符串
     */
    padStart(str: string, len: number, pad?: string): string {
        // 在原字符串的头部添加填充字符串
        return this.getPadStr(str, len, pad) + str;
    }

    /**
     * 指定字符串长度，如果字符串长度不满足长度，则在尾部填充指定字符串，直到满足长度
     * @param str 字符串
     * @param len 目标长度
     * @param pad 要填充的字符串
     */
    padEnd(str: string, len: number, pad?: string): string {
        // 在原字符串的尾部添加填充字符串
        return str + this.getPadStr(str, len, pad);
    }

    /**
     * 按长度分割字符串并转为数组
     * @param str 字符串
     * @param chunkSize 分割长度
     */
    chunk(str: string, chunkSize: number): string[] {
        // const chars = [...str]; // 将字符串转换为字符数组
        // const result = [];
        // for (let i = 0; i < chars.length; i += chunkSize) {
        //     result.push(chars.slice(i, i + chunkSize).join('')); // 提取指定长度的子字符串并推入结果数组
        // }
        // return result;
        const regex = new RegExp('.{1,' + chunkSize + '}', 'g');
        return str.match(regex) || []; // 如果没有匹配到任何结果，则返回空数组
    }

    /**
     * 分割字符串为固定长度并转为数组
     * @param str 字符串
     * @param count 数组长度
     */
    chunkFixed(str: string, count: number): string[] {
        if (count <= 0) {
            throw new Error('Count must be a positive integer');
        }

        const len = str.length;
        const chunkSize = Math.ceil(len / count); // 计算每个子字符串的平均长度（向上取整）
        const result = [];
        let start = 0;

        for (let i = 0; i < count; i++) {
            let end = Math.min(start + chunkSize, len); // 确保结束位置不超过字符串长度
            result.push(str.substring(start, end)); // 添加子字符串到结果数组
            start = end; // 更新起始位置
        }

        return result;
    }

    /**
     * 驼峰转连字符
     * @param str 字符串
     * @param spacer 连接符 默认-
     */
    toKebab(str: string, spacer: string = '-') {
        return str.replace(/([A-Z])/g, spacer + '$1').toLowerCase();
    }

    /**
     * 转驼峰
     * @param str 字符串
     * @param spacers 连接符 默认 '-', '_'
     */
    toHump(str: string, ...spacers: string[]) {
        if (ArrayUtil.isEmpty(spacers)) {
            spacers = ['-', '_'];
        }
        return str.replace(new RegExp('[' + spacers.join("|") + '](\\w)', 'g'), (_, c) => c ? c.toUpperCase() : '');
    }

    /**
     * 字符串格式化，将字符串中的 **{}** 替换为指定内容
     * @param str 字符串
     * @param args 格式化项
     */
    format(str: string, ...args: any[]) {
        if (this.isNotBlank(str) && ArrayUtil.isNotEmpty(args)) {
            for (let i = 0; i < args.length; i++) {
                str = str.replace('{}', args[i]);
            }
            return str;
        } else {
            return str;
        }
    }

    /**
     * 字符串 Map 格式化，将字符串中的 **{key}** 替换成 map 对应 key 的值，如果没有对应值，则默认为 ''
     * @param str 字符串
     * @param map 参数
     */
    formatMap(str: string, map: Record<string, string | number | boolean>) {
        for (let jsonKey in map) {
            str = str.replace(new RegExp(`{${jsonKey}}`, 'g'), map[jsonKey].toString() || '');
        }
        return str;
    }

    /**
     * 当字符串不为空时追加对应的字符串，否则返回空字符串
     * @param str 字符串
     * @param appends 要追加的字符串
     */
    appendIfNotEmpty(str: string, appends: string) {
        if (this.isNotEmpty(str)) {
            return str.concat(appends);
        }
        return '';
    }

    /**
     * 获取字符串的 unicode 总和
     * @param str 字符串
     */
    getUnicodeSum(str: string): number {
        let unicode = 0;
        for (let i = 0; i < str.length;) {
            let codePoint = str.codePointAt(i);
            if (codePoint == undefined) {
                throw new Error(`${str[i]} is not a valid code point`);
            }

            // 如果当前字符是UTF-16代理对的一部分，则需要递增索引两次
            if (codePoint >= 0x10000) { // 代理对的码点范围
                i += 2;
            } else {
                i += 1;
            }

            unicode += codePoint;
        }
        return unicode;
    }

    /**
     * 获取字符串的 unicode，默认获取第一个字符
     * @param str 字符串
     * @param index 要获取的字符下标
     */
    getUnicode(str: string, index: number = 0): number | undefined {
        return str.codePointAt(index);
    }

    /**
     * 比较两个字符串大小（按 unicode 总和比较），前者小于后者时结果小于 0，相反大于 0，等于时为 0
     * @param str1 字符串 1
     * @param str2 字符串 2
     */
    compare(str1: string, str2: string): number {
        return this.getUnicodeSum(str1) - this.getUnicodeSum(str2);
    }

    /**
     * 比较两个字符串大小（按第一个字符 unicode 比较），前者小于后者时结果小于 0，相反大于 0，等于时为 0
     * @param str1 字符串 1
     * @param str2 字符串 2
     */
    compareByHead(str1: string, str2: string): number {
        const val1 = this.getUnicode(str1)
        if (val1 === undefined) {
            throw new Error(`${str1} is not a valid code point`);
        }
        const val2 = this.getUnicode(str2)
        if (val2 === undefined) {
            throw new Error(`${str2} is not a valid code point`)
        }
        return val1 - val2;
    }

    replaceBetween(str: string, start: number, end: number, newChar: string): string {
        return str.substring(0, start) + newChar + str.substring(end);
    }
}

export default new StrUtil();
