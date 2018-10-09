import axios from 'axios'

const URL = 'http://localhost:3000'

//推荐歌单
export function personalized(){
    const url = URL +'/personalized';
    return axios.get(url)
}

//歌单详情
export function playlistDetail(id){
    const url = URL +'/playlist/detail';
    return axios.get(url,{
        params:{
            id:id
        }
    })
}

//歌曲详情
export function songDetail(id){
    const url = URL +'/song/detail';
    return axios.get(url,{
        params:{
            ids:id
        }
    })
}

//获取歌词
export function getLyric(id) {
    const url = URL+'/lyric';
    return axios.get(url, {
        params: {
            id: id
        }
    })
}

//搜索
export function search(keywords,page=0) {
    const url = URL+'/search';
    return axios.get(url, {
        params: {
            keywords : keywords,
            offset:page*50,
            limit: 50
        }
    })
}
//获取热门歌手
export function artists() {
    const url = URL+'/top/artists';
    return axios.get(url, {
        params: {
            limit: 5
        }
    })
}