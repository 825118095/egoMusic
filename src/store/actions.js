import { setPlayList } from '../assets/js/storage'
import * as type from './mutations-type'


// 添加音乐到播放列表，但是要判断添加的音乐是否已经在播放列表，如果在就直接播放，不在新加并播放
export const selectAddMusic = function ({ commit, state }, { music }) {
    let list = state.playlist.slice();
    let index = list.findIndex((items) => {
        return items.id === music.id;
    })
    if (index > -1) {
        commit(type.SET_CURRENTINDEX, index)
    } else {
        list.unshift(music);
        commit(type.SET_PLAYLIST, list);
        commit(type.SET_CURRENTINDEX, 0);
    }
    commit(type.SET_PLAYING, true);
};


// export const selectAddLikeMusic = function ({ commit, state }, { music }) {
//     let list = state.mycollection.slice();
//     let index = list.findIndex((items) => {
//         return items.id === music.id;
//     })
//     if (index > -1) {
//         commit(type.SET_CURRENTINDEX, index)
//     } else {
//         list.unshift(music);
//         commit(type.SET_PLAYLIST, list);
//         commit(type.SET_CURRENTINDEX, 0);
//     }
//   };


export const setHistory = function ({commit}, music) {
    console.log('music::::' + music);
    commit(type.SET_PLAYLIST, setPlayList(music));
};