# @parrotjs/vue-waterfall 7.x

# 预览效果

![waterfall-mao](https://user-images.githubusercontent.com/77631518/140244189-41323dbd-734b-451a-89a3-2e6c5dfbbaeb.gif)


1. 可以进行多列展示，宽度列数都可以单独设置。
2. 支持自适应和手机端。
3. 支持滚动加载

# 支持的属性

| 属性 | 代表含义 | 是否必要 | 类型 | 默认值 |
| :-----:  | :----: | :----: | :----: | :----: |
| width  | 容器宽度 | 否 | number | - |
| height | 容器高度 | 否 | [number,string] | - |
| loadingDotCount | 加载小圆点的数量 | 否 | number | 3 |
| loadingDotStyle | 加载小圆点的样式 | 否 | style object | - |
| srcKey | 指代src的key | 否 | string | src |
| imgWidth | 图片宽度 | 否 | number | 240 |
| gap | 图片之间的间隔 | 否 | number | 20 |
| mobileGap | 移动端之间的间隔 | 否 | number | 8 |
| imgsArr | 图片数组 | 是 | array | [] |
| maxCols | 最大列数 | 否 | number | 5 |
| cardAnimationClass | 指定图片加载动画 | 否 | string | default-card-animation |
| reachBottomDistance | 滚动触底距离 | 否 | number | 20 |
| cardClass | 卡片class类 | 否 | string | - |

# 支持的事件

| 属性 | 代表含义 | 参数 |
| :-----:  | :----: | :----: |
| preloaded  | 图片预加载完毕后 | - |
| imgError  | 图片加载失败后 | 加载错误的那一项 |
| scrollReachBottom  | 滚动到底部 | - |
| click | 点击图片 | 点击那一项的坐标与值 |

# 支持的插槽

| 属性 | 代表含义 | 参数 |
| :-----:  | :----: | :----: |
| loading  | 加载中的插槽 | - |
| waterfall-head  | 瀑布流的头部插槽 | - |

# 使用方法

1.安装

```
npm install @parrotjs/vue-waterfall -S
```

2.使用

```js
<template>
  <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="handleReachBottom"></vue-waterfall-easy>
</template>

<script>
import vueWaterfallEasy from "@parrotjs/vue-waterfall"; 
import "@parrotjs/vue-waterfall/dist/vue-waterfall.css";
export default {
  components: {
    vueWaterfallEasy,
  },
  data() {
    return {
      imgsArr: [
        {
          src: "https://gimg2.baid=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F00%2F1518279736-ImsfeASJcb.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=401c068f0a25ed2a42a4b070c6ee6a96",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20190210%2F8534c3170a314d83b104d04aa120a040.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=d15af814c4ae34b95bc60e35efc88e4c", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.desktx.com%2Fd%2Ffile%2Fwallpaper%2Fanimals%2F20160822%2F05128add3de7bc5acfa3a38612673e1d.jpg&refer=http%3A%2F%2Fwww.desktx.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=667c221c38da5abdb0ed7d34d87ef564", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.yidianzhidao.com%2FUploadFiles%2Fimg_1_1195934273_1809290298_26.jpg&refer=http%3A%2F%2Fwww.yidianzhidao.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=220f9c21856a2bb0cc71f76ba0b5e2cc",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201508%2F10%2F20150810150356_hnves.thumb.400_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=0971bf1e69ad8e180fb704140d7a29b0", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
       
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F01%2F1518282902-iSBdILoxsY.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=c4c6cd3890f420680e5db7f92a8d543c",
      
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
         {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190504%2F20%2F1556972126-MAGsvFyfEd.png&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=4ecd99f7107e39197378a2b7a04176c6", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile06.16sucai.com%2F2016%2F0506%2Ff43b5bab036349f7b4ffdef661da97a8.jpg&refer=http%3A%2F%2Ffile06.16sucai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=fd805292f3f72e9d7ba51fc9f45245ea",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2F3%2F5a%2Ffe101126073_250_350.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=72446335a210920f58bf6c6e6a106abe", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbos.pgzs.com%2Frbpiczy%2FWallpaper%2F2015%2F1%2F22%2Fe975967d962e45a7af2863060371d81c-12.jpg&refer=http%3A%2F%2Fbos.pgzs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440861&t=775ff5be8b8b1e9abc8848ff575e437d", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-11%2F2017110816281636782.jpg&refer=http%3A%2F%2Fpic.qqtn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440862&t=36bd6acad4963ad2d153b3a4e220a363", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190624%2F14%2F1561358677-yVQerfxNJO.jpeg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440862&t=25e73d0d95ee43d9b160bd0dfe24aa38",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20180211%2F01%2F1518282942-vBSpHErLKP.jpg&refer=http%3A%2F%2Fimage.biaobaiju.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440862&t=809ae8cf1c654bb83dbbab9437b8e276",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.ivsky.com%2Fimg%2Ftupian%2Fpre%2F201611%2F09%2Fsugelan_zheer_mao-002.jpg&refer=http%3A%2F%2Fimg.ivsky.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638440862&t=962fa67d0f3fff40553440ccb8b06ec4", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h399%2F20180301%2F9ce9-fwnpcns9232331.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441157&t=46c567a84e0172aa430f0d058ba9a92f", 
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        }, 
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h640%2F20180109%2F9e54-fyqnici8428669.jpg&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441197&t=70f9aec9253df0dcea506df28938327a",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },

        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.euro-premium.cn%2Fsites%2Fdefault%2Ffiles%2F2017%2F12%2F2017-12-18-609.jpg&refer=http%3A%2F%2Fwww.euro-premium.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441197&t=e67e19c5e29ebd66265d2ed779359002",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fqqpublic.qpic.cn%2Fqq_public%2F0%2F0-2816258155-A3E56E8F829BF213072E703F23FC3DC1%2F0%3Ffmt%3Djpg%26size%3D21%26h%3D550%26w%3D410%26ppv%3D1.jpg&refer=http%3A%2F%2Fqqpublic.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441314&t=def05d46f7dee911d2a2a8bb306976d5",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.euro-premium.cn%2Fsites%2Fdefault%2Ffiles%2F2017%2F09%2F2017-09-30-110.jpg&refer=http%3A%2F%2Fwww.euro-premium.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441314&t=d4d758316d5f48f3800b59a2eec7dc46",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.goupuzi.com%2Fnewatt%2FMon_2004%2F1_183281_b959196b41fb01e.jpg&refer=http%3A%2F%2Fwww.goupuzi.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638441314&t=663a187a9631164c450e2b3b3e1b8d92",
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        }
      ],
    };
  },
  methods: { 
    handleReachBottom:function(){
      this.imgsArr=this.imgsArr.concat(this.imgsArr); 
    }
  },
};
</script>

<style>
</style>
```

# 2021-11-9 更新 (下载8.0.0版本)

## 1.修复点击图片报错

## 2.新增头部插槽、尾部插槽、卡片class属性

```js
<vue-waterfall-easy 
    :imgsArr="imgsArr" 
    @scrollReachBottom="handleReachBottom"
    :img-width="300"
    cardClass="cardStyle"
    @click="handleClick"
  >
    <template v-slot:header="headerProps">
      <div style="width:100%;height:100px;overflow:hidden;"><div>{{headerProps.data.headerText}}</div></div>
    </template>
    <template v-slot:footer="footerProps">
      <div style="width:100%;height:200px;overflow:hidden;"><div>{{footerProps.data.info}}</div></div>
    </template>
</vue-waterfall-easy>

<style>
.cardStyle{ 
  box-shadow:rgba(0,0, 0,.2) 0px 3px 1px -2px, rgba(0, 0, 0 ,.14) 0px 2px 2px 0px, rgba(0,0, 0, .12) 0px 1px 5px 0px;
}
</style>
```
