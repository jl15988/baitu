class ScreenUtil {

    /**
     * 获取屏幕 DPI
     */
    getDpi() {
        const divElement = document.createElement('div');
        divElement.style.width = '1in';
        divElement.style.height = '1in';
        divElement.style.position = 'absolute';
        divElement.style.top = '0'
        divElement.style.left = '0';
        divElement.style.visibility = 'hidden';
        document.body.appendChild(divElement);
        const dpi = divElement.offsetWidth;
        document.body.removeChild(divElement);
        return dpi;
    }
}

export default new ScreenUtil()
