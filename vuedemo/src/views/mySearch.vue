<template>
    <div>
        <!-- <van-row class="van-row">
          <van-col span="6" @click="back"></van-col> -->
         <van-search v-model="value" show-action placeholder="请输入搜索关键词" >
              <template #left>
               <van-icon name="arrow-left" size="30" @click="back" />
              </template>   
                <template #action>
                    <div @click="onSearch">搜索</div>
                </template>
          </van-search>
          <!--分类搜索-->
          <div class="search">
              <!--快捷菜单-->
                <div >快捷菜单</div>
                <div class="menu" > 
                    <a v-for="(val,index) in product" :key="index"  class="router-link" @click="setclass_id(index)">{{val.cname}}</a>
                    
                     
                </div>
            <!--热门搜索-->
                <div  >热门搜索</div>
                <div class="hot">
                      <a v-for="(key,index) in hot" :key="index" class="router-link"  @click="keyword(key)">{{key}}</a>
                </div>
          </div>
          <!-- <van-col span="6"><van-icon name="ellipsis"  size="30" /></van-col>
     </van-row> -->
    </div>
</template>
<script>
import mySearchnew from '../components/mySearchnew'
import {mapMutations} from 'vuex'
export default {
      components:{
        mySearchnew
    },
    data(){
        return{
             value:"",//快捷搜索参数初始化
            product:[{cname:"全部"},{cname:'新品'},{cname:'推荐'}],//快捷菜单数据初始化设置
            hot:['和田玉','碧玉','籽料','翡翠','独山玉','玛瑙','水晶','翠青玉','猫眼','可可可乐'],//热门搜索数据初始化设置
        }
    },
    methods:{
        ...mapMutations(['classid','setkeyword']),

          back(){
        this.$router.go(-1);//返回上一层
        },

        onSearch() {
              this.keyword(this.value);
        },

        setclass_id(index){//商品分类搜索函数
            this.classid(index);
            this.$router.push('/productsList');
           // console.log(index,777);
        },
         keyword(key){//商品快捷搜索函数
            this.classid(0);
            this.setkeyword(key);
            this.$router.push('/productsList');
          //  console.log("搜索");
        },

        getProductTab(){//获取快捷菜单数据 
            this.axios.get('/pro/product').then(res=>{
                    this.product.push(...res.data);
                    //console.log(this.product);
                    //console.log(this.value);
           })  
        },
    },
    created(){
        this.getProductTab()//页面挂载时调用获取
    }
}
</script>
<style  scoped>
.search>div{
    margin: 10px;
}
.search>div>.router-link{
    display:inline-block;
    height: 30px;
    line-height: 30px;
    background: #eee;
    padding: 0 11px;
    margin: 10px;
    color:#555;
    font-size: 12px;
}

.search>.hot>.router-link{
    border-radius: 30px;
}
</style>