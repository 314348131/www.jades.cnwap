<template>
    <div>
         <van-search v-model="value" show-action placeholder="请输入搜索关键词" >
              <template #left>
               <van-icon name="arrow-left" size="30" @click="back" />
              </template>   
                <template #action>
                    <div @click="onSearch">搜索</div>
                </template>
          </van-search>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return{
            value:"",
        }
    },
    methods: {
             ...mapMutations(['classid','setkeyword']),

        back(){
        this.$router.go(-1);//返回上一层
        },

        onSearch() {
          
        let url = location.href;
        if(url.indexOf('/productsList')){
             this.classid(0);
            this.setkeyword(this.value);
            this.value='';
        }else{
             this.classid(0);
             this.setkeyword(this.value);
             this.value='';
             this.$router.push(`/productsList`);
        }

       
       
        },

       
    },
}
</script>