/**
 * 树节点处理函数
 */
export type TreeNodeMapper = (current: any, parent: any, parentChildList: any[]) => any;
/**
 * 树叶子节点处理函数
 */
export type TreeLeafNodeMapper = (current: any) => any;

export class TreeUtil {

    /**
     * 默认的级别属性名
     */
    LEVEL_NAME = '__tree_level';
    /**
     * 默认的开始级别
     */
    LEVEL_BEGIN = 1;

    /**
     * 构建树结构（保留非根节点）
     * @param list 数组
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param childName 子节点属性名
     * @param levelName 级别属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     */
    buildTree(list: any[], idName: string, parentName: string, childName: string, levelName?: string, mapper?: TreeNodeMapper, leafMapper?: TreeLeafNodeMapper): any[] {
        if (!list) return [];
        levelName = levelName || this.LEVEL_NAME;
        const result = list.map(item => {
            item[levelName] = this.LEVEL_BEGIN;
            return item;
        });
        for (let item of result) {
            this.buildTreeMapper(list, item, idName, parentName, (current, parent, parentChildList) => {
                current[levelName] = parent[levelName] + 1;
                parent[childName] = parentChildList;
                mapper && mapper(current, parent, parentChildList);
                return current;
            }, leafMapper);
        }
        return result;
    }

    /**
     * 构建树结构
     * @param list 数组
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param childName 子节点属性名
     * @param levelName 级别属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     */
    buildCommonTree(list: any[], idName: string, parentName: string, childName: string, levelName: string, mapper: TreeNodeMapper, leafMapper: TreeLeafNodeMapper): any[] {
        return this.filterRoot(this.buildTree(list, idName, parentName, childName, levelName, mapper, leafMapper))
    }

    /**
     * 获取根节点数组（用于构建树结构后清楚非根节点数据）
     * @param list 数组
     * @param levelName 级别属性名
     */
    filterRoot(list: any[], levelName?: string) {
        levelName = levelName || this.LEVEL_NAME;
        return list.filter(item => item[levelName] === this.LEVEL_BEGIN);
    }

    /**
     * 递归树结构变换器
     * @param list 全数组
     * @param obj 父级节点
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     */
    buildTreeMapper(list: any[], obj: any, idName: string, parentName: string, mapper: TreeNodeMapper, leafMapper?: TreeLeafNodeMapper): void {
        const childList = list.filter(item => item[parentName] === obj[idName]);
        if (childList.length > 0) {
            for (let children of childList) {
                const child = mapper ? mapper(children, obj, childList) : children;
                this.buildTreeMapper(list, child, idName, parentName, mapper, leafMapper);
            }
        } else {
            leafMapper && leafMapper(obj);
        }
    }
}

export default new TreeUtil()
