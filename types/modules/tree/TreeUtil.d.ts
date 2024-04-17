/**
 * 树节点处理函数
 */
export type TreeNodeMapper = (current: any, parent: any, parentChildList: any[]) => any;
/**
 * 树叶子节点处理函数
 */
export type TreeLeafNodeMapper = (current: any) => any;
export declare class TreeUtil {
    /**
     * 默认的级别属性名
     */
    LEVEL_NAME: string;
    /**
     * 默认的开始级别
     */
    LEVEL_BEGIN: number;
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
    buildTree(list: any[], idName: string, parentName: string, childName: string, levelName?: string, mapper?: TreeNodeMapper, leafMapper?: TreeLeafNodeMapper): any[];
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
    buildCommonTree(list: any[], idName: string, parentName: string, childName: string, levelName: string, mapper: TreeNodeMapper, leafMapper: TreeLeafNodeMapper): any[];
    /**
     * 获取根节点数组（用于构建树结构后清楚非根节点数据）
     * @param list 数组
     * @param levelName 级别属性名
     */
    filterRoot(list: any[], levelName?: string): any[];
    /**
     * 递归树结构变换器
     * @param list 全数组
     * @param obj 父级节点
     * @param idName 主键属性名
     * @param parentName 父级主键属性名
     * @param mapper 节点处理函数
     * @param leafMapper 叶子节点处理函数
     */
    buildTreeMapper(list: any[], obj: any, idName: string, parentName: string, mapper: TreeNodeMapper, leafMapper?: TreeLeafNodeMapper): void;
}
declare const _default: TreeUtil;
export default _default;
