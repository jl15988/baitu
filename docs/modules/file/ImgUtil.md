# ImgUtil - 图片工具



## 1. toBlob

将Image转为Blob

### 参数

| 序号 | 名称 | 类型                                  | 含义                    |
| ---- | ---- | ------------------------------------- | ----------------------- |
| 1    | img  | HTMLImageElement，Image类型的Html元素 | 图片元素                |
| 2    | type | 字符串                                | MIME类型，默认image/png |

### 示例

```js
const image = new Image()
image.src = "...";
ImgUtil.toBlob(image).then(res => console.log(res));
```



## 2. slice

剪裁图片并下载

### 参数

| 序号 | 名称 | 类型 | 含义             |
| ---- | ---- | ---- | ---------------- |
| 1    | file | 文件 | 要剪裁的图片文件 |
| 2    | x    | 数字 | 剪裁的x坐标      |
| 3    | y    | 数字 | 剪裁的y轴坐标    |
| 4    | w    | 数字 | 剪裁的宽度       |
| 5    | h    | 数字 | 剪裁的高度       |

### 示例

```js
const input = document.querySelector("#input");
input.onchange = async () => {
    const file = input.files[0];
    if (file) {
        ImgUtil.slice(file, 300, 300, 500, 700);
    }
};
```

