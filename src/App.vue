<template>
  <div id="app">
    <section class="MusicCont">
		<header>小我在线音乐</header>
		<router-view class="router-view"/>
    </section>
	<audio ref="egoPlay" :src="currentMusic.url" autoplay="autoplay"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { Loading } from "element-ui";

export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      this.setAudio(this.$refs.egoPlay);
    });
  },
  computed: {
    ...mapGetters(["currentMusic"])
  },
  methods: {
    ...mapMutations({ setAudio: "SET_AUDIOELE" })
  }
};
</script>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
.MusicCont {
  position: relative;
  width: 100%;
  height: 100%;
  header {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .router-view {
    width: 100%;
    height: 100%;
  }
}
</style>
