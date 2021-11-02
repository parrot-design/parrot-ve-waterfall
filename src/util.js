//判断是否是移动端
global.navigator = {
    userAgent: 'node',
}
export const isMobile = () => {
    if (navigator) {
        return !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
    }
}