export default class song {
    constructor({ id, name, singer, album, image, duration, url }) {
        this.id = id;
        this.name = name;
        this.singer = singer;
        this.album = album;
        this.image = image;
        this.duration = duration;
        this.url = url
    }
}

export function createSheet(item) {
    return new song({
        id: item.id,
        name: item.name,
        singer: item.artists[0].name,
        album: item.album.name,
        image: item.album.picUrl,
        duration: item.duration / 1000,
        url: 'http://music.163.com/song/media/outer/url?id=' + item.id + '.mp3 '

    })
}

export function createSearch(item) {
    return new song({
        id: item.id,
        name: item.name,
        singer: item.artists[0].name,
        album: item.album.name,
        image: item.album.picUrl,
        duration: item.duration / 1000,
        url: 'http://music.163.com/song/media/outer/url?id=' + item.id + '.mp3 '

    })
}
