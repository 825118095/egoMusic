<template>
  <div class="likemusic">
		<div class="list-title header">
			<span class="music-name">歌曲</span>
			<span class="music-singer">歌手</span>
			<span class="music-album">专辑</span>
		</div>
		<div class="sheet-cont" v-if="list.length > 0">
			<div class="list-title" v-for="(item,index) in list" :key="index">
				<span class="music-num">{{index + 1}}</span>
				<div class="music-name">
					<span>{{item.name}}</span>
					<div class="list-menu">
						<span class="list-menu-play" @click="selectAddPlay(item)"></span>
					</div>
				</div>
				<span class="music-singer">{{item.singer}}</span>
				<span class="music-album" :title="item.album">{{item.album}}</span>
			</div>
		</div>
		<div v-else class="list-empty">
			 怎么回事，客官怎么还没有中意的歌曲(;´༎ຶД༎ຶ`)
		</div>
  </div>
</template>

<script>
export default {
	data () {
		return {
			list:[]
		}
	}
};
</script>

<style lang="less">
.likemusic {
  width: 100%;
  height: 100%;
  .header {
    .music-name {
      padding-left: 30px;
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
    height: calc(~"100% - 60px");
    overflow-x: hidden;
    overflow-y: auto;
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
