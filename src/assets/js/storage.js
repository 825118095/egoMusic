const storage = {
    get(key,defa = []) {
        if (window.localStorage) {
            return localStorage.getItem(key) ? (Array.isArray(defa) ? JSON.parse(localStorage.getItem(key)) : localStorage.getItem(key)): defa
        }
    },
    set(key, val) {
        if (window.localStorage) {
            localStorage.setItem(key, val)
        }
    },
}

const PLAYLIST_KEY = '__egoMusic_playList__';//播放历史

//获取播放历史
export function getPlayList() {
    return storage.get(PLAYLIST_KEY);
}
//添加播放历史
export function setPlayList(music) {
    let list = storage.get(PLAYLIST_KEY);
    const index = list.findIndex(item => {
        return item.id === music.id;
    });
    if(index === 0 ){
        return list;
    };
    if(index > 0 ){
        list.splice(index,1);
    }
    list.unshift(music);
    storage.set(PLAYLIST_KEY,JSON.stringify(list));
    return list;
}

//删除单条播放列表中的音乐
export function removePlayList(music){
    storage.set(PLAYLIST_KEY,JSON.stringify(music));
    return music;
}