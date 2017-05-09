
const STORAGE_KEY = 'douban'

const doubanMovieStorage = {
    fetch: function () {
        const movies = window.JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        movies.forEach(function (item, index){
            item.id = index
        })
        return movies 
    },
    save: function (item) {
        localStorage.setItem(STORAGE_KEY, window.JSON.stringify(item))
    } 
}
// 如果 有个 地址  展示 全部用户名的信息 就不需要 本地存储
// reducer  相当于 将 需要的 值 存进 reducer里面 
// { "login":{loginObj : doubanMovieStorage.fetch()}}  为了 以后 可以存其他的值

const globalReducer = ( state={ "login":{loginObj : doubanMovieStorage.fetch()}, "meUser": window.JSON.parse(localStorage.getItem("me")) }, action) => {
    switch (action.type) {
        case "LOGIN" :
            console.log ( doubanMovieStorage.fetch() )
            // 在登录 界面 的 密码 失焦 获取 login 对象 的 信息
            return { "login":{loginObj : doubanMovieStorage.fetch()}};
        case "ME" :
            // 专门 为了 存储 用户名 在 我的 界面 查看 用户名
            console.log ( state )
            return { "meUser": window.JSON.parse(localStorage.getItem("me")) };
        default:
            return state
    }
}
export default globalReducer
