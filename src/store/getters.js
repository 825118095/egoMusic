//播放器 
export const audioEle = state => state.audioEle;

//播放列表
export const playlist = state => state.playlist;

//当前播放的索引
export const currentIndex = state => state.currentIndex;

//当前播放的音乐
export const currentMusic = (state) => {
    return state.playlist[state.currentIndex] || {}
}
// 播放状态
export const playing = state => state.playing;

//我的收藏
export const mycollection = state => state.mycollection;