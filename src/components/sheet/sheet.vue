<template>
    <div class="sheet">
        <div class="list-item" v-for="(item,index) in list" :key="index" :title="item.name">
            <router-link :to="{path:'/music/sheetlist',query:{id:item.id}}" class="sheet-item" tag="div">
			    <!-- <img  :src="item.picUrl"> -->
          <div class="picUrl" :style="{background: 'url(' +item.picUrl+ ')  center/100% 100% no-repeat'}"></div>
			    <h3 class="name">{{item.name}}</h3>
		    </router-link>
        </div>
    </div>
</template>

<script>
import { personalized } from "@/api/music";

export default {
  name: "sheet",
  data() {
    return {
      list: []
    };
  },
  // 获取每日推荐歌单
  created() {
    personalized().then(reg => {
      this.list = reg.data.result;
    });
  }
};
</script>

<style lang="less">
.sheet {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  .list-item {
    width: calc(~"100% / 6");
    float: left;
    height: 32%;
    .sheet-item {
      margin: 0 auto 10px;
      width: 80%;
      text-align: center;
      cursor: pointer;
    }
    .name {
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
    }
    .picUrl {
      width: 100%;
      height: 0;
      padding-bottom: 100%; //关键所在
      overflow: hidden;
      list-style: none;
    }
    @media (max-width: 1400px) {
      width: calc(~"100% / 5");
      height: auto;
    }
    @media (max-width: 1280px) {
      width: calc(~"100% / 3");
      height: auto;
    }
    @media (max-width: 1100px) {
      width: calc(~"100% / 3");
      height: auto;
    }
    @media (max-width: 960px) and (min-width: 768px) {
      width: calc(~"100% / 4");
      height: auto;
    }
    @media (max-width: 640px) and (min-width: 320px) {
      width: calc(~"100% / 2");
      height: auto;
    }
  }
}
</style>
