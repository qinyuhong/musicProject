<template  slot-scope="scope">
     <div class="lrcContainer">
         <div class="lrc" ref="lrc">
             <!-- 调用了 才执行keyArr -->
            {{getALLkey}}  
             
         <!-- <p v-show="(parseInt(currentTime) >=keyArr[index]) && (parseInt(currentTime) <keyArr[index+1])" class="lrc-p" v-for="(item,key,index) in lrcData" :key="index">{{item}}</p> -->
         <p
        class="lrc-p"
        :class="{active:parseInt(currentTime) >= keyArr[index] && parseInt(currentTime) < keyArr[index+1]}"
        v-for="(item,key,index) in lrcData"
        :key="index">
        {{ item }}{{ srcollLrc(key,index) }}
      </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            LRCdata:{},
            lrcData:{},
            keyArr:[]
        }
    },
    props:{
        songID:{
            type:[String,Number],
            default:""
        },
        currentTime:{
            type:[String,Number],
            default:""
        },
        durationTime:[String,Number],
            default:""
    },
    mounted(){
        var LRCurl=this.HOST+"/v1/restserver/ting?method=baidu.ting.song.lry&songid="+this.songID;
        this.$axios.get(LRCurl)
        .then(res=>{
            this.LRCdata=res.data

            //数据处理 变成键值对格式数据
        var lyrics = res.data.lrcContent.split("\n");
        var lrcObj = {};
        for(var i = 0 ;i<lyrics.length;i++){
          var lyric = decodeURIComponent(lyrics[i]);
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
          var timeRegExpArr = lyric.match(timeReg);
          if(!timeRegExpArr)continue;
          var clause = lyric.replace(timeReg,'');
             for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
                 var t = timeRegExpArr[k];
                 var min = Number(String(t.match(/\[\d*/i)).slice(1)),
                     sec = Number(String(t.match(/\:\d*/i)).slice(1));
                 var time = min * 60 + sec;
                 lrcObj[time] = clause;
             }
           }
           this.lrcData = lrcObj;
        //    console.log("------")
        //    console.log(lrcObj)
        })
        .catch(err=>{
            console.log(err)
        })
    },
    computed:{
        getALLkey(){
            for(var i in this.lrcData){
                this.keyArr.push(i)
            }
        //    console.log(this.keyArr)
        }
    },
    methods:{
        // 歌词滚动
         srcollLrc(key,index){
      const lrcDiv = this.$refs.lrc
       if(key < this.currentTime && key > this.currentTime - (this.keyArr[index+1] - this.keyArr[index])){
           lrcDiv.style.top = -((index-2)*30)+"px"
       }
    }
    }
}
</script>

<style scoped>

.lrcContainer{
  width: 100%;
  height: 150px;
  overflow: hidden;
  position: relative;
}

.lrc{
	width: 100%;
  position: absolute;
  top: 0;
}
.active{
  color: red !important;
}
.lrc-p{
  height: 30px;
	line-height: 30px;
}

.up30{
	margin-top: -30px;
}


</style>
