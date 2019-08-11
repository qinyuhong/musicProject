<template lang="html">
  <MusicList :url="url"/>
</template>

<script>
import MusicList from "../../components/Music_list"
export default {
    data(){
        return {
             url:"/v1/restserver/ting?method=baidu.ting.billboard.billList&type=11&size=5&offset=0"
        }
    },
    components:{
        MusicList
    }
}
</script>

<style lang="css">
</style>
