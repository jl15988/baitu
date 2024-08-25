class ChineseNumber {
    NUMBERS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

    convertSingle(number: number): string {
        if (number < 0 || number > 10) {
            throw new Error("The number can only be between 1 and 10.");
        }
        return this.NUMBERS[number];
    }
}

export default new ChineseNumber();
