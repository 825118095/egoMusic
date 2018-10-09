import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as getters from './getters'
import * as actions from './actions';
import {getPlayList} from '../assets/js/storage'

Vue.use(Vuex)

const state = {
    audioEle: null,//播放器
    playlist: getPlayList() || [],//播放列表
    playing: false,//播放状态
    currentIndex: -1,//当前播放的索引
    mycollection: [],//我的收藏
}

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions
})