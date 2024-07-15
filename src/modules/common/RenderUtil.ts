/**
 * 渲染工具
 */
class RenderUtil {

    /**
     * 匹配数组中的项渲染
     * @param arr 数组
     * @param resField 匹配成功后，要返回的字段值，如果为空，则直接返回匹配的项
     * @param findMapper 匹配处理函数
     * @param defaultRes 匹配失败返回的默认值，默认空字符串
     */
    renderArrFind<T, R>(arr?: T[] | null,
                        resField?: keyof T | null,
                        findMapper?: (item: T, index: number, obj: T[]) => boolean,
                        defaultRes: R | string = '') {
        if (!arr) return defaultRes;
        if (!findMapper) findMapper = (item, index) => index === 0;
        const item = arr.find(findMapper);
        if (!item) return defaultRes;
        return (resField ? item[resField] : item) || defaultRes;
    }
}

export default new RenderUtil();
