<template>
  <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="handleReachBottom"></vue-waterfall-easy>
</template>

<script>
import vueWaterfallEasy from "../../src";
//import vueWaterfallEasy from "vue-waterfall-easy";
export default {
  components: {
    vueWaterfallEasy,
  },
  data() {
    return {
      imgsArr: [
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/9.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/9.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/9.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/9.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },

        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/images/202110/thumb_img/1282_thumb_G_1633668789001.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
        {
          src: "https://www.chhes.com/assets/img/cat/1.jpg",
          height: 400,
          href: "https://www.baidu.com",
          info: "一些图片描述文字",
        },
      ],
    };
  },
  methods: {
    getData: function () {},
    handleReachBottom:function(){
      this.imgsArr=this.imgsArr.concat(this.imgsArr);
      console.log("--this.imgsArr--",this.imgsArr)
    }
  },
};
</script>

<style>
</style>