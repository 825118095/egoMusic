import { mapActions, mapGetters, mapMutations } from 'vuex'


export const listPlay = {
    computed: {
        ...mapGetters(['currentMusic','audioEle'])
    },
    methods: {

        // 判断当前音乐是否和点击播放音乐一样，并且判断当前的播放状态，如果不一样就像播放列表中添加
        selectAddPlay(music) {
            // this.audioEle.play();
            if (music.id === this.currentMusic.id && this.setplaying) {
                this.setplaying(false)
            } else {
                console.log(music)
                this.selectAddMusic({ music });
            }
        },
        ...mapActions([
            'selectAddMusic'
        ]),
        ...mapMutations({ setplaying: 'SET_PLAYING' })
    }
}