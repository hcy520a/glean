export default {


    /* 获取背景颜色 */
    getBgColor(state, index) {
        return index => ({
            "background-color": state.colorList[index],
        });
    },

}
