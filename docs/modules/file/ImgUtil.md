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



## 2. cut

剪裁图片

### 参数

| 序号 | 名称    | 类型 | 含义                    |
| ---- | ------- | ---- | ----------------------- |
| 1    | file    | 文件 | 要剪裁的图片文件        |
| 2    | x       | 数字 | 剪裁的x坐标             |
| 3    | y       | 数字 | 剪裁的y轴坐标           |
| 4    | w       | 数字 | 剪裁的宽度              |
| 5    | h       | 数字 | 剪裁的高度              |
| 6    | quality | 质量 | 图片质量，0到1，默认为1 |

### 示例

```js
const input = document.querySelector("#input");
input.onchange = () => {
    const file = input.files[0];
    if (file) {
        try {
            Baitu.ImgUtil.cut(file, 300, 300, 500, 700, 0.5).then(res => {
                console.log(res);
                /*
                * 输出：
                * {
                        "img": {},
                        "file": {},
                        "blob": {},
                        "name": "18061117084733.jpg",
                        "type": "image/jpeg",
                        "quality": 0.5,
                        "x": 300,
                        "y": 300,
                        "w": 500,
                        "h": 700
                    }
                */
                Baitu.FileUtil.downloadBlob(res.blob, res.name);
            })
        } catch (error) {
            console.error('Error reading file:', error);
        }
    }
};
```



## 3. dataURLtoBlob

dataURL转Blob
