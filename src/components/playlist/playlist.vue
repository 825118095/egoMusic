<template>
	<div class="playlist">
		<div class="list-title header">
			<span class="music-name">歌曲</span>
			<span class="music-singer tit-size">歌手</span>
			<span class="music-time tit-size">时长</span>
		</div>
		<div class="list-cont" v-if="list.length > 0">
			<div class="list-title" v-for="(item,index) in list" :key="index">
				<span class="music-num" :class="{on: !(item.id != currentMusic.id)}" :title="item.id">{{index + 1}}</span>
        <!-- <span class="list-menu-like"></span> -->
				<div class="music-name">
					<span>{{item.name}}</span>
					<div class="list-menu">
						<span class="list-menu-play" @click="selectAddPlay(item)"  :title="item.name"></span>
					</div>
				</div>
				<span class="music-singer">{{item.singer}}</span>
				<span class="music-time"  :title="item.name">
					{{item.duration | formatDuration}}
					<i class="list-menu-del" @click="deleteItem(index)"></i>
				</span>
			</div>
		</div>
		<div v-else class="list-empty">
			 怎么回事，客官怎么还没有点单了(;´༎ຶД༎ຶ`)
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { listPlay } from "@/assets/js/play";
import { Message } from "element-ui";
import { removePlayList } from "../../assets/js/storage";

export default {
  name: "playlist",
  data() {
    return {
      list: []
    };
  },
  mixins: [listPlay],
  computed: {
    ...mapGetters(["playlist", "audioEle", "currentMusic"])
  },
  created() {
    this.list = this.playlist;
  },
  filters: {
    formatDuration(vules) {
      let o = Math.floor(vules % 3600);
      let Minute = Math.floor(o / 60);
      let second = Math.floor(o % 60);
      return `${Minute < 10 ? "0" + Minute : Minute} : ${
        second < 10 ? "0" + second : second
      }`;
    }
  },
  methods: {
    deleteItem(id) {
      let delelist = this.playlist.slice();
      delelist.splice(id, 1);
      this.setPlaylist(delelist);
      this.list = delelist;
      if (this.list.length === 0) {
        this.audioEle.pause();
        this.setAudioEle = false;
      }
      Message({
        message: "删除成功"
      });
      removePlayList(this.list);
    },
    ...mapMutations({
      setPlaylist: "SET_PLAYLIST",
      setAudioEle: "SET_AUDIOELE"
    })
  }
};
</script>

<style lang="less">
.playlist {
  width: 100%;
  height: 100%;
  .list-title {
    width: 100%;
    height: 50px;
    display: flex;
    line-height: 50px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    &.header {
      .music-name {
        padding-left: 40px;
      }
    }
    &:hover {
      .music-name {
        .list-menu {
          display: block;
        }
      }
      .music-time {
        font-size: 0;
        .list-menu-del {
          display: block;
        }
      }
    }
    span {
      color: rgba(255, 255, 255, 0.7);
      font-size: 14px;
    }
    .music-name {
      flex: 1;
      position: relative;
      box-sizing: border-box;
      margin-left: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      padding-right: 50px;
      .list-menu {
        display: none;
        position: absolute;
        height: 36px;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        span {
          display: inline-block;
          width: 36px;
          height: 36px;
          cursor: pointer;
          background: url("../../assets/img/icon_list_menu.png") no-repeat;
        }
        .list-menu-play {
          background-position: -80px 0px;
          &:hover {
            background-position: -120px 0px;
          }
        }
      }
    }
    .music-num {
      width: 40px;
      text-align: center;
      &.on {
        font-size: 0px;
        background: url("../../assets/img/wave.gif") no-repeat center center;
      }
    }
    .music-singer {
      width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
    }
    .music-time {
      width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;

      .list-menu-del {
        display: none;
        position: absolute;
        width: 36px;
        height: 36px;
        top: 50%;
        transform: translateY(-50%);
        background: url("../../assets/img/icon_list_menu.png") no-repeat;
        background-position: 0px -160px;
        cursor: pointer;
        &:hover {
          background-position: -120px -160px;
        }
      }
    }
    .tit-size {
      font-size: 14px !important;
    }
  }
  .list-cont {
    width: 100%;
    height: calc(~"100% - 60px");
    overflow-x: hidden;
    overflow-y: auto;
    .list-menu-like {
      display: block;
      width: 25px;
      height: 25px;
      background: url("../../assets/img/player.png") no-repeat;
      background-position: 0px -94px;
      cursor: pointer;
      margin-top: 14px;
      &:hover {
        background-position: -29px -94px;
      }
    }
  }
  .list-empty {
    text-align: center;
    height: 100%;
    line-height: 6;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>
