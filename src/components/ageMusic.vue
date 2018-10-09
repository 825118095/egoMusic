<template>
    <div class="music">
        <div class="music-cont">
          	<div class="music-left">
				<div class="music-btn">
					<router-link to="/" tag="span">推荐歌单</router-link>
					<router-link to="/music/playlist" tag="span">播放列表</router-link>
					<router-link to="/music/search" tag="span">搜索</router-link>
					<!-- <router-link to="/music/likemusic" tag="span">我的收藏</router-link> -->
				</div>
				<router-view class="music-list"/>
            </div>
			<lyric class="music-right" :musiclyric="musiclyric" :lyricIndex="lyricIndex"></lyric>
        </div>

		<div class="music-bar" :class="{unused : !musicReady || !currentMusic.id}">
			<a class="music-btn btn-pro" @click="pro"></a>
			<a class="music-btn btn-play" @click="play" :class="{'btn-play-pause':playing}"></a>
			<a class="music-btn btn-next" @click="next"></a>
			<div class="progress-music">
				<template v-if="percentMusic">
					<div class="music-bar-info">{{currentMusic.name}}<span> - {{currentMusic.singer}}</span></div>
                    <div class="music-bar-time">{{currentTime | format}}/{{currentMusic.duration | formatDuration}}</div>
					<musicProgress :percent="percentMusic" @percentChange="progressMusic"></musicProgress>
				</template>
				<template v-else>
					<musicProgress :percent="0"></musicProgress>
				</template>
			</div>
			<div class="progress-voice">
				<a class="voice-bar voice-dot" @click="noSound" :class="{noSound: this.volume ===0 }"></a>
				<musicProgress :percent="volume" @percentChange="volumeChange"></musicProgress>
			</div>
		</div>
        <!-- 整体背景图片 -->
        <div class="music-bg"></div>
        <div class="music-zz"></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import audioMods from "@/assets/js/audio";
import musicProgress from "./progress/progress";
import lyric from "./lyric/lyric";
import { getLyric } from "@/api/music";

export default {
  name: "music",
  components: {
    musicProgress,
    lyric
  },
  data() {
    return {
      musicReady: false, //暂停\播放
      currentTime: 0, //播放时间（百分比的）
      isMust: false, //是否禁音
      volume: 0.5, //默认声音大小
      oldvolume: 0, //记录禁音前的声音大小
      musiclyric: [], //歌词
      lyricIndex: 0 //歌词编号
    };
  },
  mounted() {
    this.$nextTick(() => {
      audioMods.initAuto(this);
    });
  },
  watch: {
    //判断当前播放器中的音乐状态（播放还是暂停），并更改
    playing(newPlaying) {
      const audio = this.audioEle;
      const u = navigator.userAgent;
      const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {
        audio.play();
        audio.pause();
      }
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
        this.musicReady = true;
      });
    },
    //如果点击歌曲和当前播放歌曲不一致，更新歌词
    currentMusic(newMusic, oldMusic) {
      if (newMusic.id === oldMusic.id) {
        return;
      }
      this.$nextTick(() => {
        this._getLyric(newMusic.id);
      });
    },
    // 播放时间改变，更新歌词编号
    currentTime(newTime) {
      let index = 0;
      for (let i = 0; i < this.musiclyric.length; i++) {
        if (newTime > this.musiclyric[i].time) {
          index = i;
        }
      }
      this.lyricIndex = index;
    }
  },
  methods: {
    //   上一曲
    pro() {
      if (!this.musicReady) {
        return;
      }
      let index = this.currentIndex - 1;
      if (index < 0) {
        index = this.playlist.length - 1;
      }
      this.SET_CURRENTINDEX(index);
      this.musicReady = false;
    },
    // 播放、暂停
    play() {
      if (!this.musicReady) {
        return;
      }
      this.SET_PLAYING(!this.playing);
    },
    // 下一曲
    next() {
      if (!this.musicReady) {
        return;
      }
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.SET_CURRENTINDEX(index);
      this.musicReady = false;
    },
    ...mapMutations({
      SET_CURRENTINDEX: "SET_CURRENTINDEX", //修改播放索引
      SET_PLAYING: "SET_PLAYING" //修改播放状态
    }),
    //修改音乐播放进度
    progressMusic(percent) {
      this.audioEle.currentTime = this.currentMusic.duration * percent;
    },
    //修改音量大小
    volumeChange(percent) {
      percent === 0 ? (this.isMust = true) : (this.isMust = false);
      this.volume = percent;
      this.audioEle.volume = percent;
    },
    // 禁音
    noSound() {
      if (this.volume === 0) {
        this.volume = this.oldvolume;
        this.audioEle.volume = this.oldvolume;
      } else {
        this.oldvolume = this.volume;
        this.volume = 0;
        this.audioEle.volume = 0;
      }
    },
    // 获取歌词
    _getLyric(id) {
      if (id) {
        getLyric(id).then(reg => {
          // console.log(reg);
          if (reg.status === 200) {
            console.log(reg.data.lrc.lyric)
            this.musiclyric = LyricTypesetting(reg.data.lrc.lyric);
            this.audioEle.play();
          }
        });
      } else {
        this.musiclyric = [];
      }
    }
  },
  computed: {
    ...mapActions(["setHistory"]),
    ...mapGetters([
      "audioEle",
      "playlist",
      "currentIndex",
      "currentMusic",
      "playing"
    ]),
    //播放进度
    percentMusic() {
      return this.currentMusic.duration && this.currentTime
        ? this.currentTime / this.currentMusic.duration
        : 0;
    }
  },
  //   当前音乐播放时间
  filters: {
    format(vules) {
      let Minute = Math.floor(vules / 60);
      let second = Math.floor(vules % 60);
      return `${Minute < 10 ? "0" + Minute : Minute} : ${
        second < 10 ? "0" + second : second
      }`;
    },
    // 当前音乐总时间
    formatDuration(vules) {
      let o = Math.floor(vules % 3600);
      let Minute = Math.floor(o / 60);
      let second = Math.floor(o % 60);
      return `${Minute < 10 ? "0" + Minute : Minute} : ${
        second < 10 ? "0" + second : second
      }`;
    }
  }
};

function LyricTypesetting(lyr) {
  let lyrics = lyr.split("\n");
  let lrcObj = [];
  for (let i = 0; i < lyrics.length; i++) {
    let lyric = decodeURIComponent(lyrics[i]);
    let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
    let timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr) continue;
    let clause = lyric.replace(timeReg, "");
    for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
      let t = timeRegExpArr[k];
      let min = Number(String(t.match(/\[\d*/i)).slice(1)),
        sec = Number(String(t.match(/\:\d*/i)).slice(1));
      let time = min * 60 + sec;
      if (clause !== "") {
        lrcObj.push({ time: time, text: clause });
      }
    }
  }
  return lrcObj;
}
</script>

<style lang="less">
.music {
  width: 100%;
  height: 100%;
  padding: 40px 25px 25px 25px;
  max-width: 1750px;
  margin: 0 auto;
  box-sizing: border-box;
  .music-cont {
    height: calc(~"100% - 80px");
    display: flex;
    .music-left {
      flex: 1;
      overflow: hidden;
    }
    // 列表按键
    .music-btn {
      width: 100%;
      height: 50px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.5);
      span {
        display: inline-block;
        box-sizing: border-box;
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 4px;
        margin-left: 5px;
        &:hover {
          color: #fff;
          border: 1px solid #fff;
          cursor: pointer;
        }
      }
    }
    .music-list {
      height: calc(~"100% - 50px");
    }
    .music-right {
      width: 300px;
      margin-left: 10px;
      position: relative;
      @media (max-width: 800px) {
        display: none;
      }
    }
  }
  .music-bg {
    background: url("../assets/img/app_bg.jpg") no-repeat;
    background-size: cover;
    background-position: 50%;
    z-index: -2;
    filter: blur(10px);
    opacity: 0.6;
  }
  .music-zz {
    z-index: -1;
    background: rgba(0, 0, 0, 0.5);
  }
  .music-bg,
  .music-zz {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  //   播放按键
  .music-bar {
    width: 100%;
    height: 80px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    margin-bottom: 15px;
    &.unused {
      pointer-events: none;
      .btn-pro,
      .btn-play,
      .btn-next,
      .progress-music,
      .progress-voice {
        opacity: 0.4;
      }
    }
    .music-btn {
      background: url("../assets/img/player.png") no-repeat;
      display: block;
      cursor: pointer;
      &.btn-pro {
        background-position: 0px -29px;
        width: 20px;
        height: 23px;
      }
      &.btn-play {
        background-position: 0 0;
        width: 23px;
        height: 30px;
        margin: 0 30px;
        &.btn-play-pause {
          background-position: -28px 0px;
        }
      }
      &.btn-next {
        background-position: 0 -50px;
        width: 20px;
        height: 23px;
      }
    }
    .progress-music {
      flex: 1;
      box-sizing: border-box;
      margin-left: 50px;
      position: relative;
      color: rgba(255, 255, 255, 0.5);
      .music-bar-info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .music-bar-time {
        position: absolute;
        top: 0;
        right: 0;
      }
    }
    .progress-voice {
      position: relative;
      width: 100px;
      padding-left: 45px;
      .voice-bar {
        width: 25px;
        height: 21px;
        position: absolute;
        top: -4px;
        left: 15px;
        &.voice-dot {
          background: url("../assets/img/player.png") no-repeat;
          background-position: 0 -144px;
          display: block;
          cursor: pointer;
        }
        &.noSound {
          background: url("../assets/img/player.png") no-repeat;
          background-position: 0 -182px;
        }
      }
    }
  }
}
</style>
