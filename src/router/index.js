import Vue from 'vue';
import VueRouter from 'vue-router'

const Index = () => import('components/Index.vue')
const Discover = () => import('views/discover/Discover.vue')
const MusicListDetail = () => import('views/musicListDetail/MusicListDetail.vue')
const Recommend = () => import('views/discover/discoverChildren/Recommend.vue')
const MusicListIndex = () => import('views/discover/discoverChildren/musicListChildren/MusicListIndex');

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/index' },
    {
        path: '/index',
        component: Index,
        redirect: '/discover',
        children: [
            {
                path: '/discover',
                component: Discover,
                redirect: '/discover/recommend',
                children: [
                    { path: '/discover/recommend', component: Recommend },
                    { path: '/discover/musiclist/musiclistindex', component: MusicListIndex },
                ]
            },
            { path: '/musiclistdetail/:id', name: 'musicListDetail', component: MusicListDetail }
        ]
    },
]

//创建一个VueRouter实例，routes对象包括所有的路由配置信息
//mode：history表示使用这个api来管理浏览器的浏览记录了
const router = new VueRouter({
    routes,
    mode: 'history',
})

//导出默认的路由实例，让其他组件可以直接引用这个路由器实例，使用路由跳转、监听等信息。
export default router
