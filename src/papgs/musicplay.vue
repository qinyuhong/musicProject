<template  slot-scope="scope">
    <div class="play">
        
        <div class="header">
            <div class="title">
            <router-link to="/">
                <i class="iconfont icon-shouye left"></i>
            </router-link>
            <div class="music-info">
                <p>{{currentUrl.songinfo.title}}</p>
                <p class="author">{{currentUrl.songinfo.author}}</p>
            </div>
            <router-link to="/search"><i class="iconfont icon-sousuo right"></i></router-link>
            </div>
        </div>

        <div class="song-info">
            <!-- 歌曲图片 -->
			<div class="song-info-img">
                 <img :src="currentUrl.songinfo.pic_big">
                <!-- 歌词展示 -->
                <LRC :currentTime="currentTime" :durationTime="durationTime" :songID="this.$route.params.songId" />
			</div>
			<div class="iconbox">
				<i class="iconfont icon-shoucang2 left"></i>
				<i class="box"></i>
				<i class="iconfont icon-xiazai right"></i>
			</div>
		</div>
    <div class="song">
        <!-- 音乐播放 -->
      <audio ref="player" :src="currentUrl.bitrate.show_link" controls autoplay></audio>
		</div>

    </div>
</template>

<script>
import "../assets/font/iconfont.css"
// import LRC from "../components/LRC"
import Vue from 'vue'
//异步操作歌词
const LRC = Vue.component("lrc",(resolve)=>require(["../components/LRC"],resolve))

export default {
    name:'musicplay',
    components:{
        LRC
    },
    data(){
        return{
            currentUrl:{
                // 初始化接口信息
                songinfo:{
                    title:"",
                    author:"",
                    pic_big:""
                },
                bitrate:{
                    show_link:""
                }
            },
            currentTime:0,
            durationTime:0
        }
    },
    mounted(){
        var playUrl = this.HOST+"/v1/restserver/ting?method=baidu.ting.song.play&songid="+this.$route.params.songId
        this.$axios.get(playUrl)
        .then(res=>{
            this.currentUrl=res.data
        })
        .catch(err=>{
            console.log(err);
        })
        this.addEventListeners()
    },
    beforeDestroy(){
        this.removeEventListeners()
    },
    methods:{
       addEventListeners(){
           this.$refs.player.addEventListener('timeupdate',this._currentTime)
           this.$refs.player.addEventListener('canplay',this._durationTime)
       },
       removeEventListeners(){
             this.$refs.player.removeEventListener('timeupdate',this._currentTime)
           this.$refs.player.removeEventListener('canplay',this._durationTime)
       },
       _currentTime(){
        //    currentTime是audio标签提供的获取当前播放时间的方法
           this.currentTime=this.$refs.player.currentTime
       },
       _durationTime(){
           //    duration是audio标签提供的获得歌曲播放整体时间的方法
           this.durationTime=this.$refs.player.duration
       }
    }
}
</script>

<style scoped>
    
.header{
	padding:15px;
}

.music-info{
	flex: 1;
	font-size: 20px;
}

.title{
	display: flex;
	text-align: center;
}

.left{
	font-size: 30px;
}

.ca{
  color: red;
}

.right{
	font-size: 30px;
}

.song-info{
	padding: 15px;
}

.song-info-img{
	text-align: center;
}

.song-info-img img{
	width: 50%;
	border-radius: 5px;
	box-shadow: 0 0 10px 0 rgba(50,50,50,.31);
}

.song-lrc{
	margin-top: 10px;
  min-height: 50px;
}

.iconbox{
	display: flex;
	margin-top: 30px;
}

.iconbox .box{
	flex: 1;
}

.song{
	width: 100%;
	text-align: center;
}

.song audio{
	width: 80%;
}

.active{
  color: #222;
}

.author{
  font-size: 12px;
  color: #999;
}
</style>