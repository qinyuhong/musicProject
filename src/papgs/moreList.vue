<template>
    <div class="more-list">
        <div class="wrapper">   
        <h3>{{this.$route.params.title}}</h3>
        <VuePullRefresh :on-refresh="onRefresh">
            <router-link :to="{name:'musicplay',params:{songId:item.song_id}}" tag="div"  class="info url log" v-for="(item,index) in moreMusic " :key="index">
                <div class="poster">
                     <img :src="item.pic_big" :alt="item.title">
                </div>
              <div class="text-wrap">
                  <div class="title">{{ item.title }}</div>
                  <div class="author">{{ item.artist_name }}</div>
              </div>
            </router-link>
        </VuePullRefresh>
        

        </div>
    </div>
</template>

<script>
import VuePullRefresh from 'vue-pull-refresh';


export default {
    name:'Morelist',
    components:{
         VuePullRefresh
    },
    data(){
        return{
            moreMusic:[],
            offset:0
        }
    },
    mounted(){
        var url = this.HOST +  "/v1/restserver/ting?method=baidu.ting.billboard.billList&type="+
        this.$route.params.Musictype +"&size=12&offset=0";
        this.$axios.get(url)
        .then(res=>{
            
            this.moreMusic=res.data.song_list;
            this.offset=this.offset+12;
        })
        .catch(err=>{
            console.log(err);
        })
    },
    methods:{
        onRefresh(){
        var that = this;
        const moreListUrl = this.HOST + "/v1/restserver/ting?method=baidu.ting.billboard.billList&type="
        + this.$route.params.Musictype +"&size=12&offset="+this.offset;
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                that.$axios.get(moreListUrl)
                .then(res=>{
                    console.log(res.data);
                    that.offset>=res.data.billboard.billboard_songnum-12?console.log('没有数据了'):that.offset+=12;
                    that.moreMusic=res.data.song_list;
                    resolve();
                })
                .catch(err=>{
                    console.log(err);
                })
            })
        })
        }
    }
}
</script>

<style scoped>
    
.wrapper {
    padding-top: 13px;
    text-align: center;
    margin-bottom: 10px;
    background: #fff;
    clear: both;
    overflow: hidden;
}

h3{
  font-size: 22px;
  text-align: left;
  margin-left: 17px;
  margin-bottom: 5px;
}

.wrapper .info {
    width: 42%;
    float: left;
    text-align: center;
    padding-left: 17px;
    display: block;
    text-align: left;
    margin-bottom: 10px;
    position: relative;
}
</style>