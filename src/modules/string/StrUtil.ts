import ArrayUtil from "../array/ArrayUtil";
import NumberUtil from "../number/NumberUtil";

/**
 * 字符串工具
 */
export class StrUtil {
	/**
	 * 判断字符串是否为：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）
	 * @param str 字符串
	 */
	static isBlank(str?: string | null): str is undefined | null | "" | string {
		// 先检查是否为null、undefined或空字符串
		if (str === undefined || str === null || str === "") {
			return true;
		}
		// 再检查是否只包含空白字符
		return typeof str === "string" && /^\s*$/.test(str);
	}

	/**
	 * 判断字符串为非：null、undefined、空字符串或者只包含空白字符（如空格、制表符、换行符等）
	 * @param str 字符串
	 */
	static isNotBlank(str?: string | null): str is NonNullable<string> {
		// 确保不是null、undefined或空字符串，且不只包含空白字符
		return (
			str !== undefined &&
			str !== null &&
			str !== "" &&
			typeof str === "string" &&
			!/^\s*$/.test(str)
		);
	}

	/**
	 * 判断字符串为空字符串
	 * @param str 字符串
	 */
	static isEmpty(str?: string | null): str is undefined | null | "" {
		return str === undefined || str === null || str === "";
	}

	/**
	 * 判断字符串非空字符串
	 * @param str 字符串
	 */
	static isNotEmpty(str?: string | null): str is NonNullable<string> {
		return str !== undefined && str !== null && str !== "" && typeof str === "string";
	}

	/**
	 * 如果字符串为 null 或 undefined 返回默认值，否则返回原字符串
	 * @param str 字符串
	 * @param defaultStr 默认值
	 */
	static defaultIfNull(str: string | undefined | null, defaultStr: string): string {
		if (str === undefined || str === null) {
			return defaultStr;
		}
		return str;
	}

	/**
	 * 如果字符串为空白字符串返回默认值，否则返回原字符串
	 * @param str 字符串
	 * @param defaultStr 默认值
	 */
	static defaultIfBlank(str: string | undefined | null, defaultStr: string): string {
		if (this.isBlank(str)) {
			return defaultStr;
		}
		return str as string;
	}

	/**
	 * 如果为空字符串返回默认值，否则返回原字符串
	 * @param str 字符串
	 * @param defaultStr 默认值
	 */
	static defaultIfEmpty(str: string | undefined | null, defaultStr: string): string {
		if (this.isEmpty(str)) {
			return defaultStr;
		}
		return str;
	}

	/**
	 * 判断多个字符串中是否包含空白字符串
	 * @param str 字符串数组
	 */
	static isAnyBlank(...str: Array<string | null | undefined>): boolean {
		if (str.length === 0) {
			return false;
		}
		return str.some(s => this.isBlank(s));
	}

	/**
	 * 判断多个字符串中是否"不"包含空白字符串
	 * @param str 字符串数组
	 */
	static isNoneBlank(...str: Array<string | null | undefined>): boolean {
		return !this.isAnyBlank(...str);
	}

	/**
	 * 判断多个字符串是否全为空白字符串
	 * @param str 字符串数组
	 */
	static isAllBlank(...str: Array<string | null | undefined>): boolean {
		return str.length > 0 && str.every(s => this.isBlank(s));
	}

	/**
	 * 判断多个字符串中是否包含空字符串
	 * @param str 字符串数组
	 */
	static isAnyEmpty(...str: Array<string | null | undefined>): boolean {
		if (str.length === 0) {
			return false;
		}
		return str.some(s => this.isEmpty(s));
	}

	/**
	 * 判断多个字符串中是否"不"包含空字符串
	 * @param str 字符串数组
	 */
	static isNoneEmpty(...str: Array<string | null | undefined>): boolean {
		return !this.isAnyEmpty(...str);
	}

	/**
	 * 判断多个字符串是否全为空字符串
	 * @param str 字符串数组
	 */
	static isAllEmpty(...str: Array<string | null | undefined>): boolean {
		return str.length > 0 && str.every(s => this.isEmpty(s));
	}

	/**
	 * 获取需要额外填充的字符串
	 * @param str 字符串
	 * @param len 目标长度
	 * @param pad 要填充的字符串
	 */
	static getPadStr(str: string, len: number, pad: string = " "): string {
		if (!str || typeof str !== "string") {
			return "";
		}

		const targetLength = Math.max(0, len || 0); // 确保目标长度不为负数

		// 如果字符串的长度已经达到或超过目标长度，则直接返回空字符串
		if (str.length >= targetLength) {
			return "";
		}

		// 确保填充字符串不为空
		const padString = pad && typeof pad === "string" && pad.length > 0 ? pad : " ";

		// 计算需要填充的字符数
		const paddingSize = targetLength - str.length;

		// 使用repeat创建填充字符串
		return padString.repeat(Math.ceil(paddingSize / padString.length)).slice(0, paddingSize);
	}

	/**
	 * 指定字符串长度，如果字符串长度不满足长度，则在首部填充指定字符串，直到满足长度
	 * @param str 字符串
	 * @param len 目标长度
	 * @param pad 要填充的字符串
	 */
	static padStart(str: string, len: number, pad: string = " "): string {
		if (!str || typeof str !== "string") {
			return str || "";
		}

		// 在原字符串的头部添加填充字符串
		return this.getPadStr(str, len, pad) + str;
	}

	/**
	 * 指定字符串长度，如果字符串长度不满足长度，则在尾部填充指定字符串，直到满足长度
	 * @param str 字符串
	 * @param len 目标长度
	 * @param pad 要填充的字符串
	 */
	static padEnd(str: string, len: number, pad: string = " "): string {
		if (!str || typeof str !== "string") {
			return str || "";
		}

		// 在原字符串的尾部添加填充字符串
		return str + this.getPadStr(str, len, pad);
	}

	/**
	 * 按长度分割字符串并转为数组
	 * @param str 字符串
	 * @param chunkSize 分割长度
	 */
	static chunk(str: string, chunkSize: number): string[] {
		if (!str || typeof str !== "string") {
			return [];
		}

		if (chunkSize <= 0) {
			return [
				str,
			];
		}

		const regex = new RegExp(`.{1,${chunkSize}}`, "g");
		return str.match(regex) || [];
	}

	/**
	 * 分割字符串为固定长度并转为数组
	 * @param str 字符串
	 * @param count 数组长度
	 */
	static chunkFixed(str: string, count: number): string[] {
		if (!str || typeof str !== "string") {
			return [];
		}

		if (count <= 0) {
			return [
				str,
			];
		}

		const len = str.length;
		const chunkSize = Math.ceil(len / count); // 计算每个子字符串的平均长度（向上取整）
		const result: string[] = [];
		let start = 0;

		for (let i = 0; i < count; i++) {
			let end = Math.min(start + chunkSize, len); // 确保结束位置不超过字符串长度
			result.push(str.substring(start, end)); // 添加子字符串到结果数组
			if (end >= len) break; // 如果已经到达字符串末尾，则停止循环
			start = end; // 更新起始位置
		}

		return result;
	}

	/**
	 * 驼峰转连字符
	 * @param str 字符串
	 * @param spacer 连接符 默认-
	 */
	static toKebab(str: string, spacer: string = "-"): string {
		if (!str || typeof str !== "string") {
			return str || "";
		}

		return str.replace(/([A-Z])/g, match => `${spacer}${match}`).toLowerCase();
	}

	/**
	 * 转驼峰
	 * @param str 字符串
	 * @param spacers 连接符 默认 '-', '_'
	 */
	static toHump(str: string, ...spacers: string[]): string {
		if (!str || typeof str !== "string") {
			return str || "";
		}

		if (ArrayUtil.isEmpty(spacers)) {
			spacers = [
				"-", "_",
			];
		}

		const safeSpacers = spacers.filter(s => typeof s === "string" && s.length > 0);
		if (safeSpacers.length === 0) {
			return str;
		}

		const pattern = new RegExp(`[${safeSpacers.join("")}](\\w)`, "g");
		return str.replace(pattern, (_, c) => (c ? c.toUpperCase() : ""));
	}

	/**
	 * 字符串格式化，将字符串中的 **{}** 替换为指定内容
	 * @param str 字符串
	 * @param args 格式化项
	 */
	static format(str: string, ...args: any[]): string {
		if (!str || typeof str !== "string") {
			return str || "";
		}

		if (this.isNotBlank(str) && ArrayUtil.isNotEmpty(args)) {
			let result = str;
			for (let i = 0; i < args.length; i++) {
				// 将参数转换为字符串（避免undefined/null出现）
				const arg = args[i] === null || args[i] === undefined ? "" : String(args[i]);
				result = result.replace("{}", arg);
			}
			return result;
		} else {
			return str;
		}
	}

	/**
	 * 字符串 Map 格式化，将字符串中的 **{key}** 替换成 map 对应 key 的值，如果没有对应值，则默认为 ''
	 * @param str 字符串
	 * @param map 参数
	 */
	static formatMap(str: string, map: Record<string, string | number | boolean>): string {
		if (!str || typeof str !== "string" || !map || typeof map !== "object") {
			return str || "";
		}

		let result = str;
		for (const key in map) {
			if (Object.prototype.hasOwnProperty.call(map, key)) {
				const value = map[key] === null || map[key] === undefined ? "" : String(map[key]);
				result = result.replace(new RegExp(`{${key}}`, "g"), value);
			}
		}
		return result;
	}

	/**
	 * 当字符串不为空时追加对应的字符串，否则返回空字符串
	 * @param str 字符串
	 * @param appends 要追加的字符串
	 */
	static appendIfNotEmpty(str: string, appends: string): string {
		if (this.isNotEmpty(str) && appends !== undefined && appends !== null) {
			return str.concat(String(appends));
		}
		return "";
	}

	/**
	 * 获取字符串的 unicode 总和
	 * @param str 字符串
	 */
	static getUnicodeSum(str: string): number {
		if (!str || typeof str !== "string") {
			return 0;
		}

		let unicode = 0;
		for (let i = 0; i < str.length; ) {
			const codePoint = str.codePointAt(i);
			if (codePoint === undefined) {
				i += 1;
				continue;
			}

			// 如果当前字符是UTF-16代理对的一部分，则需要递增索引两次
			if (codePoint >= 0x10000) {
				// 代理对的码点范围
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
	static getUnicode(str: string, index: number = 0): number | undefined {
		if (!str || typeof str !== "string" || index < 0 || index >= str.length) {
			return undefined;
		}

		return str.codePointAt(index);
	}

	/**
	 * 比较两个字符串大小（按 unicode 总和比较），前者小于后者时结果小于 0，相反大于 0，等于时为 0
	 * @param str1 字符串 1
	 * @param str2 字符串 2
	 */
	static compare(str1: string, str2: string): number {
		if (this.isEmpty(str1) && this.isEmpty(str2)) {
			return 0;
		}
		if (this.isEmpty(str1)) {
			return -1;
		}
		if (this.isEmpty(str2)) {
			return 1;
		}

		return this.getUnicodeSum(str1) - this.getUnicodeSum(str2);
	}

	/**
	 * 比较两个字符串大小（按第一个字符 unicode 比较），前者小于后者时结果小于 0，相反大于 0，等于时为 0
	 * @param str1 字符串 1
	 * @param str2 字符串 2
	 */
	static compareByHead(str1: string, str2: string): number {
		if (this.isEmpty(str1) && this.isEmpty(str2)) {
			return 0;
		}
		if (this.isEmpty(str1)) {
			return -1;
		}
		if (this.isEmpty(str2)) {
			return 1;
		}

		const val1 = this.getUnicode(str1) || 0;
		const val2 = this.getUnicode(str2) || 0;
		return val1 - val2;
	}

	/**
	 * 替换字符串指定位置的内容
	 * @param str 原字符串
	 * @param startIndex 开始索引
	 * @param endIndex 结束索引
	 * @param newChar 替换的新字符串
	 */
	static replaceBetween(
		str: string,
		startIndex: number,
		endIndex: number,
		newChar: string
	): string {
		if (!str || typeof str !== "string") {
			return str || "";
		}

		// 校正参数
		startIndex = Math.max(0, Math.min(startIndex, str.length));
		endIndex = Math.max(startIndex, Math.min(endIndex, str.length));

		return str.substring(0, startIndex) + (newChar || "") + str.substring(endIndex);
	}

	/**
	 * 截取 startIndex 到 endIndex - 1 字符串，支持大小纠正（endIndex > startIndex），支持负数下标
	 *
	 * 对于非字符串或者为空的字符串，将返回空字符串
	 *
	 * 当下标为负数时，注意由于左闭右开，最后一位截取不到
	 * @param str 字符串
	 * @param startIndex 开始下标，支持负数
	 * @param endIndex 结束下标，支持负数
	 */
	static sub(str: string, startIndex: number, endIndex?: number): string {
		if (this.isEmpty(str)) {
			return "";
		}

		const len = str.length;
		if (len === 0) return "";

		if (NumberUtil.isEmpty(endIndex)) endIndex = len;

		// 校正下标
		startIndex = NumberUtil.turnOverZeroBetweenMax(startIndex, len);
		endIndex = NumberUtil.turnOverZeroBetweenMax(endIndex, len);

		// 确保起始索引小于结束索引
		if (startIndex > endIndex) {
			[
				startIndex, endIndex,
			] = [
				endIndex, startIndex,
			];
		}

		return str.substring(startIndex, endIndex);
	}

	/**
	 * 截取指定长度字符串
	 * @param str 字符串
	 * @param subLen 截取长度
	 * @param fromIndex 截取的开始下标，支持负数，为负数时注意左闭右开（fromIndex 位截取不到）
	 */
	static subLen(str: string, subLen: number, fromIndex: number = 0): string {
		if (this.isEmpty(str)) {
			return "";
		}

		// 确保截取长度为正数
		subLen = Math.max(0, subLen);

		const endIndex = fromIndex < 0 ? fromIndex - subLen : subLen + fromIndex;
		return this.sub(str, fromIndex, endIndex);
	}

	/**
	 * 反向截取字符串，注意截取规则为左开右闭，不支持负数下标
	 * @param str 字符串
	 * @param startIndex 开始下标
	 * @param endIndex 结束下标
	 */
	static subReverse(str: string, startIndex: number, endIndex?: number): string {
		if (this.isEmpty(str)) return "";

		// 确保索引为非负数
		startIndex = Math.max(0, startIndex);

		const len = str.length;
		if (NumberUtil.isEmpty(endIndex)) endIndex = len;

		// 确保结束索引为非负数
		endIndex = Math.max(0, endIndex);

		// 计算正向索引
		const reverseEndIndex = len - endIndex;
		const reverseStartIndex = len - startIndex;

		return this.sub(str, Math.max(0, reverseEndIndex), Math.min(len, reverseStartIndex));
	}

	/**
	 * 反向截取指定长度字符串
	 * @param str 字符串
	 * @param subLen 截取长度
	 * @param fromIndex 截取的开始下标，非负数
	 */
	static subReverseLen(str: string, subLen: number, fromIndex: number = 0): string {
		if (this.isEmpty(str)) {
			return "";
		}

		// 确保参数为非负数
		fromIndex = Math.max(0, fromIndex);
		subLen = Math.max(0, subLen);

		const endIndex = subLen + fromIndex;
		return this.subReverse(str, fromIndex, endIndex);
	}
}
