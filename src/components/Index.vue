<template>
  <el-container>
    <el-aside width="67px" height="100%">
        <el-menu
          active-text-color="black"
          router
          :default-active="defaultActive"
        >
        <!-- index指明对应的路径 -->
          <el-menu-item index="/discover">
            <i class="iconfont icon-yinle"></i>
            <span slot="title"></span>
          </el-menu-item>
          <el-menu-item
            v-if="createdMusicList.length != 0"
            :index="`/musiclistdetail/${likeId}`">
              <i class="iconfont icon-xiai"></i>
              <span slot="title"></span>
          </el-menu-item>
          <el-menu-item index="/album">
            <i class="iconfont icon-24gf-videoAlbum"></i>
            <span slot="title"></span>
          </el-menu-item>
        </el-menu>
    </el-aside>
    <el-container width="91%">
        <el-header>
            <HeaderControl></HeaderControl>
        </el-header>
        <el-main>
            <router-view class="routerView" :key="$route.fullPath"></router-view>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
import axios from "axios";
import HeaderControl from "./headerControl/HeaderControl.vue";

export default {
    components:{
        HeaderControl
    },
    data(){
        return{
            defaultActive: "",
            createdMusicList:[],
            collectedMusicList:[],
            likeId:"",
        };
    },
    methods:{
      async getUserMusicList() {
        if (!this.$store.state.isLogin) {
          // 说明已经退出登录
          this.$message.error("请先进行登录操作");
          return;
        }
        let timestamp = Date.parse(new Date());
        // 先从localStorage里面读取用户信息  如果登录成功是有存的
        // this.userInfo =
        //   window.localStorage.getItem("userInfo") &&
        //   JSON.parse(window.localStorage.getItem("userInfo"));

        let res = await this.$request("/user/playlist", {
          uid: window.localStorage.getItem("userId"),
          timestamp,
        });
        // console.log(res);
        // 对数据进行处理分类
        res = res.data.playlist;
        let index = res.findIndex((item) => item.subscribed == true);
        this.createdMusicList = res.slice(0, index);
        this.collectedMusicList = res.slice(index);
        this.createdMusicList[0].name = "我喜欢的音乐";
        this.likeId=this.createdMusicList[0].id;
        // console.log(this.createdMusicList, this.collectedMusicList);
        // 将收藏的歌单上传至vuex
        this.$store.commit("updateCollectMusicList", this.collectedMusicList);
        // 将创建的歌单上传至vuex
        this.$store.commit("updateCreatedMusicList", this.createdMusicList);
      },
    },
    created() {
        if (this.$route.path.search("/musiclistdetail") == -1) {
          this.defaultActive = "/" + this.$route.path.split("/")[1];
        } else {
          this.defaultActive = this.$route.path;
        }
    },
    watch:{
        "$store.state.collectedMusicList"(current){
            this.collectedMusicList=current
        },
        "$route.path"(current) {
            // 取路由中的首地址 用于侧边栏的导航active
            if (current.search("/musiclistdetail") == -1) {
                this.defaultActive = "/" + current.split("/")[1];
            } else {
                this.defaultActive = current;
            }
            // console.log(current, this.defaultActive);
        },
            // 监听vuex中的登录状态
        "$store.state.isLogin"(current) {
          // console.log(current);
          if (current) {
            this.getUserMusicList();
          } else {
            // 清空收藏和创建歌单
            this.createdMusicList = [];
            this.collectedMusicList = [];

          }
        },
    }
}
</script>

<style>

.el-header{
    /* background-color: black; */
    border-bottom: 1px solid rgb(167, 167, 167);
}

.el-aside {
  border-right: 1px solid #ccc;
  height: calc(100vh - 105px);
}
.iconfont{
    font-size: 24px;
    margin: 0px;
}
</style>