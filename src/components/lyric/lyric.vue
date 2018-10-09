<template>
    <div class="lyric">
        <div class="lyric-init">
            <p>
                <img :src="musicPicUrl" alt="">
            </p>
            <template v-if="this.currentMusic.id">
                <dt>歌曲名：{{currentMusic.name}}</dt>
                <dt>歌手：{{currentMusic.singer}}</dt>
                <dt>专辑名：{{currentMusic.album}}</dt>
            </template>
        </div>

        <!-- 歌词 -->
        <div class="music-lyric" ref="musiclyric">
			<div class="music-lyric-item" :style="lyricTop">
				<template v-if="musiclyric.length > 0">
					<p :class="{on:lyricIndex===index}" v-for="(item,index) in musiclyric" :key="index">{{item.text}}</p>
				</template>
				<p v-else-if="!currentMusic.id">还没有播放音乐哦！</p>
            	<p v-else>歌词加载失败！</p>
			</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "lyric",
  data() {
    return {
      top: 0
    };
  },
  props: {
    musiclyric: {
      type: Array,
      default: []
    },
    lyricIndex: {
      tupe: Number,
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      let height = this.$refs.musiclyric.offsetHeight;
      this.top = Math.floor(height / 36 / 2);
    });
  },
  computed: {
    musicPicUrl() {
      // console.log(this.currentMusic)
      return this.currentMusic.id
        ? this.currentMusic.image
        : require("../../assets/img/player_cover.png");
    },
    lyricTop() {
      return `transform :translate3d(0px, ${-34 *
        (this.lyricIndex - this.top)}px, 0px)`;
    },
    ...mapGetters(["currentMusic"])
  }
};
</script>

<style lang="less">
.lyric-init {
  margin-bottom: 20px;
  text-align: center;
  p {
    position: relative;
    width: 186px;
    height: 186px;
    margin: 0 auto 15px;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 9px;
      width: 200px;
      height: 186px;
      background: url("../../assets/img/album_cover_player.png") 0 0 no-repeat;
    }
    img {
      width: 186px;
      height: 186px;
      vertical-align: middle;
    }
  }
  dt {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
// 歌词
.music-lyric {
  position: absolute;
  overflow: hidden;
  text-align: center;
  top: 300px;
  left: 0;
  bottom: 0;
  right: 0;
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.6) 15%,
    rgba(255, 255, 255, 1) 25%,
    rgba(255, 255, 255, 1) 75%,
    rgba(255, 255, 255, 0.6) 85%,
    rgba(255, 255, 255, 0) 100%
  );
  .music-lyric-item {
    text-align: center;
    line-height: 34px;
    font-size: 12px;
    transform: translate3d(0, 0, 0);
    transition: transform 0.6s ease-out;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(255, 255, 255, 0.4);
    .on {
      color: #40ce8f;
    }
  }
}
</style>
