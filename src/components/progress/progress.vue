<template>
	<div class="musicProgress" ref="musicProgress" @click="barclick">
		<div class="musicProgress-bar"></div>
		<div class="musicProgress-inner" ref="musicProgressinner">
			<div class="musicProgress-dot" @mousedown="barDown" @touchstart.prevent="barDown"></div>
		</div>
	</div>
</template>

<script>
const dotwidth = 10;
export default {
  name: "musicProgress",
  data() {
    return {
      move: {
        status: false,
        statusX: 0,
        left: 0
      }
    };
  },
  props: {
    percent: {
      type: [Number],
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.bindEvents();
      const barwidth = this.$refs.musicProgress.clientWidth - dotwidth;
      const dotleft = this.percent * barwidth;
      this.moveSilde(dotleft);
    });
  },
  methods: {
    //添加绑定事件
    bindEvents() {
      document.addEventListener("mousemove", this.barMove);
      document.addEventListener("mouseup", this.barUp);

      document.addEventListener("touchmove", this.barMove);
      document.addEventListener("touchend", this.barUp);
    },
    //移除绑定事件
    unbindEvents() {
      document.removeEventListener("mousemove", this.barMove);
      document.removeEventListener("mouseup", this.barUp);

      document.removeEventListener("touchmove", this.barMove);
      document.removeEventListener("touchend", this.barUp);
    },
    // 进度条点击事件
    barclick(e) {
      let rect = this.$refs.musicProgress.getBoundingClientRect();
      let dotleft = Math.min(
        this.$refs.musicProgress.clientWidth - dotwidth,
        Math.max(0, e.clientX - rect.left)
      );
      this.moveSilde(dotleft);
      this.commitPercent();
    },
    //鼠标按下事件
    barDown(e) {
      this.move.status = true;
      this.move.startX = e.clientX || e.touches[0].pageX;
      this.move.left = this.$refs.musicProgressinner.clientWidth;
    },
    //鼠标/触摸移动事件
    barMove(e) {
      if (!this.move.status) {
        return false;
      }
      let endX = e.clientX || e.touches[0].pageX;
      let dist = endX - this.move.startX;
      let offsetWidth = Math.min(
        this.$refs.musicProgress.clientWidth - dotwidth,
        Math.max(0, this.move.left + dist)
      );
      this.moveSilde(offsetWidth);
      this.commitPercent();
    },
    //鼠标/触摸释放事件
    barUp(e) {
      e.stopPropagation();
      this.move.status = false;
    },
    // 进度条滑动
    moveSilde(dotleft) {
      this.$refs.musicProgressinner.style.width = `${dotleft}px`;
    },

    //计算圆点所在进度条上的百分比,并返回给父级
    commitPercent() {
      let w = this.$refs.musicProgress.clientWidth - dotwidth;
      let percent = this.$refs.musicProgressinner.clientWidth / w;
      this.$emit("percentChange", percent);
    }
  },
  watch: {
    percent(newpercent) {
      if (newpercent >= 0 && !this.move.status) {
        const barwidth = this.$refs.musicProgress.clientWidth - dotwidth;
        const dotleft = this.percent * barwidth;
        this.moveSilde(dotleft);
      }
    }
  },
  beforeDestroy() {
    this.unbindEvents();
  }
};
</script>

<style lang="less">
.musicProgress {
  width: 100%;
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 5px;
  .musicProgress-bar {
    width: 100%;
    height: 2px;
    background: rgba(135, 135, 135, 0.5);
  }
  .musicProgress-inner {
    position: absolute;
    top: 50%;
    left: 5px;
    display: inline-block;
    background: #fff;
    width: 0;
    margin-top: -1px;
    height: 2px;
    .musicProgress-dot {
      width: 10px;
      height: 10px;
      position: absolute;
      border-radius: 100%;
      background: #fff;
      top: 50%;
      right: -5px;
      transform: translateY(-50%);
    }
  }
}
</style>
