import {setPlayList} from './storage'
const audioMod = {
    initAuto(that) {
        const ele = that.audioEle;
        // 当前的播放时间
        ele.ontimeupdate = () => {
            that.currentTime = ele.currentTime
        };
        // 下一曲
        ele.onended = () =>{
            that.next()
        };
        
        ele.onplay = () => {
            let timer;
            clearTimeout(timer);
            timer = setTimeout(() => {
                that.musicReady = true
            }, 100);
        };
        ele.onerror = () => {
            that.musicReady = true
        };
        //在开始播放视频/音频（audio/video）时触发，把歌曲存入localStorage
        ele.oncanplay = () => {
            setPlayList(that.currentMusic)
        };
    }
}

export default audioMod