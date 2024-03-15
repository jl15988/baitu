class ArrayUtil {

    /**
     * 将数组循环拼接
     * @param arr 数组
     * @param count 循环次数
     */
    repeat(arr: [string | number], count: number): string {
        return arr.join('').repeat(count);
    }
}

export default new ArrayUtil();
