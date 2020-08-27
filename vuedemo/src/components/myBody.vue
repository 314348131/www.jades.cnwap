<template>
    <div class="div">
          <!--首页选项卡动态加载-->
        	<van-row class="van-row">
                    <van-col span="4" v-for="(val,index) of tab" :key="index">
                        <a @click="setclass_id(index+3)" ><span><img :src="val.cpic"  alt=""><p>{{val.cname}}</p></span></a>
                    </van-col>
                 
                    <van-col span="4">
                       <a @click="setclass_id(0)" ><span><img src="../assets/img/all.png" alt=""><p>所有材质</p></span></a>
                    </van-col>
              </van-row>
            <!--首页轮播动态加载-->
            <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image,index) in images" :key="index">
                <img :src="image" width="100%"/>
            </van-swipe-item>
            </van-swipe>
          <my-product></my-product>
    </div>
</template>
<script>
import myProduct from './myProduct.vue';
import {mapMutations} from 'vuex'
export default {
    components:{
			myProduct
		},
    data(){
        return{ 
            images:[require('../assets/img/s0_05744507586093385.jpg'),
                    require('../assets/img/s0_05744507995517056.jpg'),
                    require('../assets/img/s0_05744508130735690.jpg'),
                     require('../assets/img/s0_05744508249309601.jpg')
                     ],
            tab:"",
           
        }
    },
    methods:{
           ...mapMutations(['classid','setkeyword']),
          getTab() {
           this.axios.get('/pro/tab').then(res=>{
                    this.tab = res.data;
           })  
        },
        setclass_id(index){
            this.classid(index);
            this.$router.push('/productsList');
           // console.log(index,777);
        },
     
    },
    mounted() {
        this.getTab()

    },


}
</script>

<style scoped>
p{
    font-size: 12px;
}
.van-row{
    margin: 5px 0;
    text-align: center;
}
	.van-row img{
		width:60%;
		margin: 10px;
    }
    .div{
        margin-bottom: 60px;
    }
</style>
