class ObjectUtil {

    /**
     * 判断任意一种类型数据是否为空：字符串、null、undefined、数组、对象、
     * @param value 数据
     */
    isEmpty(value) {
        // 如果值未定义或者为null，返回true
        if (value == null) {
            return true;
        }

        // 如果值是字符串，并且长度为0，返回true
        if (typeof value === 'string' && value.trim() === '') {
            return true;
        }

        // 如果值是数组，并且长度为0，返回true
        if (Array.isArray(value) && value.length === 0) {
            return true;
        }

        // 如果值是对象，并且没有可枚举的属性，返回true
        if (typeof value === 'object' && Object.keys(value).length === 0) {
            return true;
        }

        // 其他情况，返回false
        return false;
    }
}

export default new ObjectUtil();
