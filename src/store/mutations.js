import * as type from './mutations-type'

const mutations = {
    [type.SET_AUDIOELE](state,audioEle){
        state.audioEle = audioEle;
    },
    [type.SET_PLAYLIST](state,playlist){
        state.playlist = playlist
    },
    [type.SET_CURRENTINDEX](state,currentIndex){
        state.currentIndex = currentIndex
    },
    [type.SET_PLAYING](state,playing){
        state.playing = playing
    },
    [type.SET_MYCOLLECTION](state,mycollection){
        state.mycollection = mycollection;
    }
}

export default mutations