# egoMusic V1.2.1（2018.04.01）

模仿QQ音乐网页版界面，采用flexbox和position布局；
egoPlayer虽然是响应式，但主要以为PC端为主，移动端只做相应适配；
只做主流浏览器兼容

> api：一个开源的[网易云音乐 NodeJS 版 API](https://binaryify.github.io/NeteaseCloudMusicApi)

## 如何安装与使用

> 后台服务器

```
cd egoMusic/server //进入后台服务器目录

npm install //安装依赖

node app.js //服务端运行 访问 http://localhost:3000
```

> egoPlayer

```
git clone https://github.com/825118095/egoMusic.git  //下载egoMusic

cd egoMusic //进入egoMusic播放器目录

npm install //安装依赖

npm run dev //服务端运行

npm run build  //项目打包
```

#### 运行egoMusic后无法获取音乐请检查后台服务器是否启动
#### api目录下music的url地址要和后台服务器地址一致

## 技术栈

- Vue（核心框架）
- Vue-Router（页面路由）
- Vuex（状态管理）
- Axios（网络请求）
- Less（CSS预处理器）

## 项目布局

```
├── build                                           // webpack配置文件
├── config                                          // 项目打包路径
├── dist                                            // 项目打包文件
├── server                                          // 后台服务器目录
├── src                                             // 项目源码目录
│   ├── api                                         // 数据交互目录
│   │   └── music.js                                // 获取数据
│   ├── assets                                      // 资源目录
│   │   ├── css                                     // 数据交互目录
│   │   │   ├── public.css                          // 全局基本样式
│   │   ├── img                                     // 数据交互目录
│   │   └── js                                      // 数据交互目录
│   │        ├── audio.js                           // 对audio空间的基本操作
│   │        ├── musicItem.js                       // 搭建歌曲类
│   │        ├── play.js                            // 播放
│   │        └── storage.js                         // localstorage配置
│   ├── components                                  // 公共项目组件目录
│   │   ├── lyric
│   │   │   └── lyric.vue                       	// 歌词和封面组件
│   │   ├── playlist
│   │   │    └── playlist.vue                     	// 播放列表
│   │   ├── progress
│   │   │   └── progress.vue                        // 进度条拖动组件
│   │   ├── search
│   │   │    └── search.vue                     	// 搜索
│   │   ├── sheet
│   │   │    ├── sheet.vue                     		// 推荐歌单
│   │   │    └── sheetlist.vue                     	// 推荐歌单列表
│	│	└── ageMusic.vue							// 整合页面
│   ├── router
│   │   └── index.js                                // 路由配置
│   ├── store                                       // vuex的状态管理
│   │   ├── actions.js                              // 配置actions
│   │   ├── getters.js                              // 配置getters
│   │   ├── index.js                                // 引用vuex，创建store
│   │   ├── mutations.js                            // 配置mutations
│   │   └── mutation-types.js                       // 定义常量mutations名
│   ├── App.vue                                     // 根组件
│   └── main.js                                     // 入口主文件
├── static                                          // 静态资源文件目录
└── index.html                                      // 入口html文件
```

## 功能

- 播放器
- 歌词滚动
- 排行榜
- 搜索
- 播放历史

## 界面欣赏

![正在播放](http://img.mukewang.com/5aa645fe0001c30019201004.png)
![搜索](http://img.mukewang.com/5aa6461c00014ed419201005.png)
![我听过的](http://img.mukewang.com/5aa6462500011faf19201004.png)

## 更新说明

### v1.2.2(2018.04.11)
- 修改推荐歌单图片显示的兼容性
- 修复歌曲展示图不显示bug


### V1.2.1（2018.04.01）
- 优化正在播放列表第一次加载
- 优化删除歌曲
- 优化Vuex模块
- 提高代码复用性

### V1.2.0（2018.03.28）
- 新增搜索功能
- 新增歌曲删除功能（播放历史列表）
- 使用ES6的class对数据进行二次处理
- 优化歌词居中显示
- 优化播放可能出现的错误

### V1.1.0（2018.03.09）
- 整合公用列表组件
- 新增element-ui插件
- 整合字体大小、颜色相关CSS
- 优化清空正在播放列表功能

### V1.0.0（2018.03.05）
- 当前播放歌曲高亮
- 优化快速切歌导致歌曲播放失败的问题
- 进度条拖动适配移动端
- 优化点击时可能出现的半透明背景

## 其他说明

- 个人练手项目# egoMusic
