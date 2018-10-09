<template>
	<div class="search">
		<div class="search-head">
			<span @click="searchSpan(item.name)" v-for="(item , index) in HotSinger" :key="index">{{item.name}}</span>
			<input type="text" class="search-input" placeholder="音乐/歌手" v-model.trim="searchValue" @keyup.enter="onEnter">
		</div>
		<div class="list-title header" v-if="list.length > 0 ">
			<span class="music-name">歌曲</span>
			<span class="music-singer">歌手</span>
			<span class="music-album">专辑</span>
		</div>
		<div class="sheet-cont" v-if="list.length > 0 " @scroll="listScroll($event)">
			<div class="list-title" v-for="(item,index) in list" :key="index">
				<span class="music-num">{{index + 1}}</span>
				<div class="music-name">
					<span>{{item.name}}</span>
					<div class="list-menu">
						<span class="list-menu-play" @click="selectItem(item)"></span>
					</div>
				</div>
				<span class="music-singer">{{item.singer}}</span>
				<span class="music-album" :title="item.album.name">{{item.album}}</span>
			</div>
		</div>
		<div class="sheet-cont" v-else>
			<p>快来搜索自己喜欢的音乐/歌手吧＼＼\٩('ω')و//／／</p>
		</div>
	</div>
</template>

<script>
import { search, artists, songDetail } from "@/api/music";
import { listPlay } from "@/assets/js/play";
import { createSearch } from "@/assets/js/musicItem";
import { Message, Loading } from "element-ui";

function _formatSong(list) {
  let rel = [];
  list.forEach(reg => {
    const m = reg;
    if (m.id) {
      rel.push(createSearch(m));
    }
  });
  return rel;
}
export default {
  name: "search",
  data() {
    return {
      HotSinger: [],
      searchValue: null,
      list: [],
      page: 0
    };
  },
  mixins: [listPlay],
  created() {
    artists().then(reg => {
      this.HotSinger = reg.data.artists;
    });
  },
  methods: {
    //查询搜索出来的歌曲图片
    async selectItem(music) {
      let image = await songDetail(music.id).then(res => {
        return res.data.songs[0].al.picUrl;
      });
      music.image = image;
      this.selectAddPlay(music);
    },
    //根据点击的推荐歌手名称来查找歌曲
    searchSpan(name) {
      this.searchValue = name;
      search(name, this.page).then(reg => {
        this.list = _formatSong(reg.data.result.songs);
      });
    },
    //根据搜索框内的参数查找歌曲
    onEnter() {
      search(this.searchValue, this.page).then(reg => {
        this.list = _formatSong(reg.data.result.songs);
      });
    },
    //获取滚动条位子
    listScroll(e) {
      let scrollTop = e.target.scrollTop,
        scrollHeight = e.target.scrollHeight,
        height = e.target.offsetHeight;
      if (scrollTop + height >= scrollHeight) {
        this.listUpDataLoad();
      }
    },

    listUpDataLoad() {
      this.page += 1;
      search(this.searchValue, this.page).then(reg => {
        if (!reg.data.result.songs) {
          Message({
            message: "没有更多歌曲啦！⊙﹏⊙|||",
            type: "warning"
          });
          return;
        }
        this.list = this.list.concat(_formatSong(reg.data.result.songs));
      });
    }
  }
};
</script>

<style lang="less">
.search {
  position: relative;
  width: 100%;
  height: 100%;
  .search-head {
    display: flex;
    height: 40px;
    padding: 10px;
    background: rgba(0, 0, 0, 0.2);
    span {
      line-height: 40px;
      margin: 0 10px;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .search-input {
      flex: 1;
      height: 40px;
      line-height: 40px;
      margin: 0 10px;
      padding: 0 15px;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.5);
      box-shadow: 0px 0px 2px 0px #fff inset;
      outline: 0;
      box-sizing: border-box;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  .list-title {
    height: 50px;
    width: 100%;
    display: flex;
    line-height: 50px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    &:hover {
      .music-name {
        .list-menu {
          display: block;
        }
      }
    }
    span {
      color: rgba(255, 255, 255, 0.8);
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
    .music-singer {
      width: 150px;
    }
    .music-album {
      width: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .music-num {
      width: 30px;
      text-align: center;
    }
  }
  .sheet-cont {
    width: 100%;
    height: calc(~"100% - 112px");
    overflow-x: hidden;
    overflow-y: auto;
    p {
      height: 40px;
      line-height: 40px;
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
