import ArrayUtil from "../array/ArrayUtil";
import NumberUtil from "../number/NumberUtil";

export type BuildTreeOptionType<T> = {
    // 主键属性名
    idName?: string
    // 父级主键属性名
    parentName?: string
    // 叶子节点处理函数
    leafMapper?: TreeLeafNodeMapper<T>
}

export type BuildTreeLevelOptionType<T> = BuildTreeOptionType<T> & {
    // 子节点属性名
    childName?: string
    // 节点处理函数
    mapper?: TreeNodeMapper<T>
    // 等级属性名
    levelName?: string
}
/**
 * 树节点处理函数
 * @param current 当前元素
 * @param parent 父级元素
 * @param parentChildList 父级子元素集合
 * @param level 当前层级
 */
export type TreeNodeMapper<T> = (current: T, parent?: T, parentChildList?: T[], level?: number) => T
/**
 * 树叶子节点处理函数
 * @param current 当前元素
 */
export type TreeLeafNodeMapper<T> = (current: T) => T

class TreeUtil {
    /**
     * 默认的级别属性名
     */
    LEVEL_NAME = '__tree_level'
    /**
     * 默认的开始级别
     */
    LEVEL_BEGIN = 1
    /**
     * 已构建标记
     */
    BUILT_TAG = '__built_tag'

    /**
     * 构建树结构（保留非根节点）
     * @param list 数组
     * @param options 配置信息
     */
    buildTree<T extends Record<string, any>>(list: T[], options?: BuildTreeLevelOptionType<T>): T[] {
        if (!list) return []
        const newList = ArrayUtil.deepCopy(list)
        const {idName, parentName, mapper, leafMapper} = options || {}
        let {childName, levelName} = options || {}
        childName = childName || 'children'
        levelName = levelName || this.LEVEL_NAME
        this.buildTreeMapper(
            newList,
            (current, parent, parentChildList, level) => {
                if (level !== this.LEVEL_BEGIN) {
                    // 根节点遍历时没有父级
                    // @ts-ignore
                    parent[childName] = parentChildList
                }
                // @ts-ignore
                current[levelName] = level
                mapper && mapper(current, parent, parentChildList, level)
                return current
            },
            {
                idName,
                parentName,
                leafMapper
            }
        )
        // @ts-ignore
        return newList
    }

    /**
     * 构建树结构
     * @param list 数组
     * @param options 配置信息
     */
    buildCommonTree<T extends Record<string, any>>(
        list: T[],
        options?: BuildTreeLevelOptionType<T>
    ): T[] {
        return this.filterRoot(this.buildTree(list, options))
    }

    /**
     * 获取根节点数组（用于构建树结构后清楚非根节点数据）
     * @param list 数组
     * @param levelName 级别属性名
     */
    filterRoot<T>(list: T[], levelName?: string) {
        levelName = levelName || this.LEVEL_NAME
        // @ts-ignore
        return list.filter((item) => item[levelName] === this.LEVEL_BEGIN)
    }

    /**
     * 递归树结构变换器
     * @param list 全数组
     * @param mapper 节点处理函数
     * @param options 配置信息
     */
    buildTreeMapper<T extends Record<string, any>>(
        list: T[],
        mapper: TreeNodeMapper<T>,
        options?: BuildTreeOptionType<T>
    ): void {
        if (!list || list.length <= 0) return
        const {idName, parentName, leafMapper} = options || {}
        for (const item of list) {
            const level = this.LEVEL_BEGIN
            // @ts-ignore
            if (item[this.BUILT_TAG]) continue
            mapper && mapper(item, undefined, [], level)
            this.toTreeMapper(list, item, mapper, idName, parentName, leafMapper, level)
        }
    }

    /**
     * 递归树结构变换器
     * @param list 全数组
     * @param obj 父级节点
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     * @param parentLevel 上级层级
     */
    toTreeMapper<T extends Record<any, any>>(
        list: T[],
        obj: T,
        mapper: TreeNodeMapper<T>,
        idName?: string,
        parentName?: string,
        leafMapper?: TreeLeafNodeMapper<T>,
        parentLevel?: number
    ): void {
        idName = idName || 'id'
        parentName = parentName || 'parentId'
        const childList: T[] = []
        for (const item of list) {
            // @ts-ignore
            if (item[parentName] === obj[idName]) {
                // @ts-ignore
                item[this.BUILT_TAG] = true
                childList.push(item)
            }
        }
        if (childList.length > 0) {
            for (const children of childList) {
                const level = NumberUtil.defaultIfEmpty(parentLevel, this.LEVEL_BEGIN - 1) + 1;
                const child = mapper ? mapper(children, obj, childList, level) : children
                this.toTreeMapper(list, child, mapper, idName, parentName, leafMapper, level)
            }
        } else {
            leafMapper && leafMapper(obj)
        }
    }
}

export default new TreeUtil()
