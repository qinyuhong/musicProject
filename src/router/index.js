import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/papgs/index.vue'
import Home from '../papgs/Home.vue'
import artists from '../papgs/artists.vue'
import listcate from '../papgs/listcate.vue'
import ucenter from '../papgs/ucenter.vue'
import search from '../papgs/search.vue'
import hotList from '../papgs/musiclist/hot_list.vue'
import kingList from '../papgs/musiclist/king_list.vue'
import NewsList from '../papgs/musiclist/news_list.vue'
import moreList from '../papgs/moreList.vue'
import musicplay from '../papgs/musicplay.vue'
import ArtistsDetails from '../papgs/artistsDetail/artistsDetail.vue'
import LicateDetails from '../papgs/licateDetail/licateDetail.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/musicplay',
            name: 'musicplay',
            component: musicplay
        },
        {
            path: '/',
            name: 'Index',
            redirect: '/Home',
            component: Index,
            children: [{
                    path: '/Home',
                    name: 'Home',
                    redirect: "/Home/hot",
                    component: Home,
                    children: [{
                            path: '/Home/hot',
                            component: hotList
                        },
                        {
                            path: '/Home/king',
                            component: kingList
                        },
                        {
                            path: '/Home/news',
                            component: NewsList
                        }

                    ]
                },
                {
                    path: '/artists',
                    name: 'artists',
                    component: artists
                },
                {
                    path: '/listcate',
                    name: 'listcate',
                    component: listcate
                },
                {
                    path: '/ucenter',
                    name: 'ucenter',
                    component: ucenter
                },
                {
                    path: '/search',
                    name: 'search',
                    component: search
                },
                {
                    path: '/more',
                    name: 'Morelist',
                    component: moreList
                },
                {
                    path: '/ArtistsDetails',
                    name: 'ArtistsDetails',
                    component: ArtistsDetails
                },
                {
                    path: '/LicateDetails',
                    name: 'LicateDetails',
                    component: LicateDetails
                }
            ]
        }
    ]
})