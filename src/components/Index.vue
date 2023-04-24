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
          <el-menu-item index="/favorites">
            <i class="iconfont icon-xiai" ></i>
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
        };
    },
    created() {
        if (this.$route.path.search("/musiclistdetail") == -1) {
        this.defaultActive = "/" + this.$route.path.split("/")[1];
        } else {
        this.defaultActive = this.$route.path;
        }
    },
    watch:{
        "$route.path"(current) {
            // 取路由中的首地址 用于侧边栏的导航active
            if (current.search("/musiclistdetail") == -1) {
                this.defaultActive = "/" + current.split("/")[1];
            } else {
                this.defaultActive = current;
            }
            // console.log(current, this.defaultActive);
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