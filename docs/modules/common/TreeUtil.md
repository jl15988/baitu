---
title: TreeUtil - 树工具
category:
 - 通用
tag:
 - 树工具
---



在处理数据时，尤其是表格类、树组件数据，后端返回的数据可能不是一个属性结构的数据，或者其他树结构处理，这个时候我们需要对数据进行递归、拼接等一系列操作，于是 `TreeUtil` 应运而生，提供构建、处理树形数据的方法，让树形数据的处理更加简洁高效！



## 1. 常规使用

如有以下数组：

```js
const list = [
    {
        "deptId": 100,
        "parentId": 0,
        "deptName": "百涂科技",
        "children": []
    },
    {
        "deptId": 101,
        "parentId": 100,
        "deptName": "深圳总公司",
        "children": []
    },
    {
        "deptId": 102,
        "parentId": 100,
        "deptName": "长沙分公司",
        "children": []
    },
    {
        "deptId": 103,
        "parentId": 101,
        "deptName": "研发部门",
        "children": []
    },
    {
        "deptId": 104,
        "parentId": 101,
        "deptName": "市场部门",
        "children": []
    },
    {
        "deptId": 105,
        "parentId": 101,
        "deptName": "测试部门",
        "children": []
    },
    {
        "deptId": 106,
        "parentId": 101,
        "deptName": "财务部门",
        "children": []
    },
    {
        "deptId": 107,
        "parentId": 101,
        "deptName": "运维部门",
        "children": []
    },
    {
        "deptId": 108,
        "parentId": 102,
        "deptName": "市场部门",
        "children": []
    },
    {
        "deptId": 109,
        "parentId": 102,
        "deptName": "财务部门",
        "children": []
    }
]
```



通过树形构建函数 `buildTree` 来构建树形结构数据：

```js
TreeUtil.buildTree(list, 'deptId', 'parentId', 'children');
```



构建树形结构时，默认会添加 `__built_tag` 和 `__tree_level` 参数，用于分别表示是否已参与构建树和当前元素层级（从1开始），buildTree 构建后的数据会保留原数组长度，如果你只想得到一个树，那么你可以使用 `buildCommonTree` 函数

最终结果：

```json
[
    {
        "deptId": 100,
        "parentId": 0,
        "deptName": "百涂科技",
        "children": [
            {
                "deptId": 101,
                "parentId": 100,
                "deptName": "深圳总公司",
                "children": [
                    {
                        "deptId": 103,
                        "parentId": 101,
                        "deptName": "研发部门",
                        "children": [],
                        "__built_tag": true,
                        "__tree_level": 3
                    },
                    {
                        "deptId": 104,
                        "parentId": 101,
                        "deptName": "市场部门",
                        "children": [],
                        "__built_tag": true,
                        "__tree_level": 3
                    },
                    {
                        "deptId": 105,
                        "parentId": 101,
                        "deptName": "测试部门",
                        "children": [],
                        "__built_tag": true,
                        "__tree_level": 3
                    },
                    {
                        "deptId": 106,
                        "parentId": 101,
                        "deptName": "财务部门",
                        "children": [],
                        "__built_tag": true,
                        "__tree_level": 3
                    },
                    {
                        "deptId": 107,
                        "parentId": 101,
                        "deptName": "运维部门",
                        "children": [],
                        "__built_tag": true,
                        "__tree_level": 3
                    }
                ],
                "__built_tag": true,
                "__tree_level": 2
            },
            {
                "deptId": 102,
                "parentId": 100,
                "deptName": "长沙分公司",
                "children": [
                    {
                        "deptId": 108,
                        "parentId": 102,
                        "deptName": "市场部门",
                        "children": [],
                        "__built_tag": true,
                        "__tree_level": 3
                    },
                    {
                        "deptId": 109,
                        "parentId": 102,
                        "deptName": "财务部门",
                        "children": [],
                        "__built_tag": true,
                        "__tree_level": 3
                    }
                ],
                "__built_tag": true,
                "__tree_level": 2
            }
        ],
        "__tree_level": 1
    },
    {
        "deptId": 101,
        "parentId": 100,
        "deptName": "深圳总公司",
        "children": [
            {
                "deptId": 103,
                "parentId": 101,
                "deptName": "研发部门",
                "children": [],
                "__built_tag": true,
                "__tree_level": 3
            },
            {
                "deptId": 104,
                "parentId": 101,
                "deptName": "市场部门",
                "children": [],
                "__built_tag": true,
                "__tree_level": 3
            },
            {
                "deptId": 105,
                "parentId": 101,
                "deptName": "测试部门",
                "children": [],
                "__built_tag": true,
                "__tree_level": 3
            },
            {
                "deptId": 106,
                "parentId": 101,
                "deptName": "财务部门",
                "children": [],
                "__built_tag": true,
                "__tree_level": 3
            },
            {
                "deptId": 107,
                "parentId": 101,
                "deptName": "运维部门",
                "children": [],
                "__built_tag": true,
                "__tree_level": 3
            }
        ],
        "__built_tag": true,
        "__tree_level": 2
    },
    {
        "deptId": 102,
        "parentId": 100,
        "deptName": "长沙分公司",
        "children": [
            {
                "deptId": 108,
                "parentId": 102,
                "deptName": "市场部门",
                "children": [],
                "__built_tag": true,
                "__tree_level": 3
            },
            {
                "deptId": 109,
                "parentId": 102,
                "deptName": "财务部门",
                "children": [],
                "__built_tag": true,
                "__tree_level": 3
            }
        ],
        "__built_tag": true,
        "__tree_level": 2
    },
    {
        "deptId": 103,
        "parentId": 101,
        "deptName": "研发部门",
        "children": [],
        "__built_tag": true,
        "__tree_level": 3
    },
    {
        "deptId": 104,
        "parentId": 101,
        "deptName": "市场部门",
        "children": [],
        "__built_tag": true,
        "__tree_level": 3
    },
    {
        "deptId": 105,
        "parentId": 101,
        "deptName": "测试部门",
        "children": [],
        "__built_tag": true,
        "__tree_level": 3
    },
    {
        "deptId": 106,
        "parentId": 101,
        "deptName": "财务部门",
        "children": [],
        "__built_tag": true,
        "__tree_level": 3
    },
    {
        "deptId": 107,
        "parentId": 101,
        "deptName": "运维部门",
        "children": [],
        "__built_tag": true,
        "__tree_level": 3
    },
    {
        "deptId": 108,
        "parentId": 102,
        "deptName": "市场部门",
        "children": [],
        "__built_tag": true,
        "__tree_level": 3
    },
    {
        "deptId": 109,
        "parentId": 102,
        "deptName": "财务部门",
        "children": [],
        "__built_tag": true,
        "__tree_level": 3
    }
]
```



## 2. 自定义处理

如果你想自己处理树元素，可以通过 `buildTreeMapper` 函数实现

```js
TreeUtil.buildTreeMapper(list2, 'deptId', 'parentId', (current, parent, parentChilds, level) => {
    if (level !== 1) {
        // 根节点遍历时没有父级
        parent['children'] = parentChilds;
    }
    current['level'] = level;
    return current;
});
```



## 3. 参数



### 构建树结构 - buildTree 和 buildCommonTree

| 序号 | 名称       | 类型   | 含义                   |
| ---- | ---------- | ------ | ---------------------- |
| 1    | list       | 数组   | 要构建树结构数据的数组 |
| 2    | idName     | 字符串 | 主键属性名             |
| 3    | parentName | 字符串 | 父级主键属性名         |
| 4    | childName  | 字符串 | 子节点属性名           |
| 5    | levelName  | 字符串 | 级别属性名             |
| 6    | mapper     | 函数   | 节点处理函数           |
| 7    | leafMapper | 函数   | 叶子节点处理函数       |

### mapper 函数

| 序号 | 名称            | 类型 | 含义           |
| ---- | --------------- | ---- | -------------- |
| 1    | current         | 任意 | 当前元素       |
| 2    | parent          | 任意 | 父级元素       |
| 3    | parentChildList | 数组 | 父级子元素集合 |
| 4    | level           | 数字 | 当前层级       |

### leafMapper 函数

| 序号 | 名称    | 类型 | 含义     |
| ---- | ------- | ---- | -------- |
| 1    | current | 任意 | 当前元素 |

### 递归树结构变换器 - buildTreeMapper

| 序号 | 名称       | 类型   | 含义                   |
| ---- | ---------- | ------ | ---------------------- |
| 1    | list       | 数组   | 要构建树结构数据的数组 |
| 2    | idName     | 字符串 | 主键属性名             |
| 3    | parentName | 字符串 | 父级主键属性名         |
| 4    | mapper     | 函数   | 节点处理函数           |
| 5    | leafMapper | 函数   | 叶子节点处理函数       |
