<template  slot-scope="scope">
    <div>
       <TodayRecommend title="今日推荐" type='2'/>
       <newsMusic/>
       <swiperBanner/>
       <musicListnav/>
       <router-view></router-view>
        <TodayRecommend title="热门歌单" type='24'/>
    </div>
</template>

<script>
import TodayRecommend from '../components/Today_recommend.vue'
import newsMusic from '../components/news_music.vue'
import swiperBanner from '../components/swiper_banner.vue'
import musicListnav from './musiclist/music_listnav.vue'

export default {
   name:'home',
    components:{
        TodayRecommend,
        newsMusic,
        swiperBanner,
        musicListnav
    }
}
</script>

<style scoped>
    
</style>