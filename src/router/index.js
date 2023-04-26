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

//����һ��VueRouterʵ����routes����������е�·��������Ϣ
//mode��history��ʾʹ�����api������������������¼��
const router = new VueRouter({
    routes,
    mode: 'history',
})

//����Ĭ�ϵ�·��ʵ�����������������ֱ���������·����ʵ����ʹ��·����ת����������Ϣ��
export default router
