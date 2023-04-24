<!-- 轮播图 -->
    <!-- 1 轮播图的获取和显示 -->
<!-- 推荐歌单 -->
    <!-- 歌单的获取和显示 -->
    <!-- ListCard组件，用于循环显示歌单 -->
    <!-- Recommend中使用 -->
<!-- created初始化两个数组：bannerData、MusicList -->
<!-- get方法请求数据 -->
<template>
  <div class="recommendContainer">
      <!-- 推荐歌单 -->
      <div class="recommendMusicList">
        <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
        <list-card
          :listCardData="musicList"
          @clickListCardItem="clickListCardItem"
        ></list-card>
      </div>
  </div>
</template>

<script> 
import ListCard from "components/listCard/ListCard.vue";
export default {
  components: { ListCard },
  name: "Recommend",
  data() {
    return {
      // 轮播图数据
      bannerData: [],
      // recommend页面显示的musicList
      musicList: [],
    };
  },
  methods: {
    // 请求轮播图数据
    async getBannerData() {
      let result = await this.$request("/banner");
      // console.log(result);
      this.bannerData = result.data.banners;
    },

    // 请求推荐歌单数据的前十个
    // 请求完将结果赋值给musicList
    getMusicList() {
      this.$request("/personalized", { limit: 10 }).then((res) => {
        // console.log(res);
        this.musicList = res.data.result;
      });
    },
    // 点击歌单封面的回调
    clickListCardItem(id) {
      // console.log(id);
      this.$router.push({ name: "musicListDetail", params: { id } });
    },
  },
  created() {
    this.getBannerData();
    this.getMusicList();
  },
};
</script>

<style scoped>
.recommendContainer {
  display: flex;
  justify-content: center;  
  height: 100%;
}

.recommend {
  max-width: 100%;
}

.carousel {
  width: 100%;
}

.el-carousel {
  margin: auto;
  width: 800px;
}

.el-carousel__item {
  border-radius: 10px;
}

.el-carousel__item img {
  height: 100%;
}

.recommendMusicList {
  margin: 20px 10px;
}

.recommendMusicList h3 {
  color: #373737;
}
</style>