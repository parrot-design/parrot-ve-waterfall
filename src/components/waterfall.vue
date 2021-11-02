
<!-- —————————————↓HTML————————分界线———————————————————————— -->
<template>
  <div
    class="vue-waterfall-container"
    :style="{
      width: width && !isMobile ? width + 'px' : '',
      height: parseFloat(height) == height ? height + 'px' : height,
    }"
  >
    <div
      class="loading ball-beat"
      v-show="isPreloading"
      :class="{ first: isFirstLoad }"
    >
      <slot name="loading" />
      <template v-if="!hasLoadingSlot">
        <div
          class="dot"
          v-for="(item, index) in loadingDotCount"
          :key="index"
          :style="loadingDotStyle"
        ></div>
      </template>
    </div>
    <div class="vue-waterfall-scroll" ref="scrollEl">
      <slot name="waterfall-head" />
      <div
        class="vue-waterfall"
        :style="
          isMobile
            ? ''
            : {
                width: colWidth * cols + 'px',
                left: '50%',
                marginLeft: (-1 * colWidth * cols) / 2 + 'px',
              }
        "
      >
        <div
          class="img-box"
          v-for="(item, index) in imgsArr_c"
          :key="index"
          :class="[cardAnimationClass]"
          :style="{
            padding: gap_c / 2 + 'px',
            width: isMobile ? '' : colWidth + 'px',
          }"
        >
          <component
            class="img-inner-box"
            :is="linkName"
            v-if="item[srcKey]"
            :data-index="index"
            :style="{
              width: imgWidth_c + 'px',
              height: item._height ? item._height + 'px' : false,
            }"
          >
            <img :src="item[srcKey]" />
          </component>
        </div> 
      </div>
    </div>
  </div>
</template>

<!-- —————————————↓JS————————分界线———————————————————————— -->
<script>
import Link from "./link.vue"; 
import { isMobile } from "../util";
export default {
  name: "pt-vue-waterfall",
  props: {
    width: {
      // 容器宽度
      type: Number,
    },
    height: {
      // 容器高度
      type: [Number, String],
    },
    loadingTimeOut: {
      // 预加载事件小于500毫秒就不显示加载动画，增加用户体验
      type: Number,
      default: 500,
    },
    loadingDotCount: {
      // loading 点数
      type: Number,
      default: 3,
    },
    loadingDotStyle: {
      type: Object,
    },
    srcKey: {
      type: String,
      default: "src",
    },
    imgWidth: {
      type: Number,
      default: 240,
    },
    gap: {
      // .img-box 间距
      type: Number,
      default: 20,
    },
    mobileGap: {
      type: Number,
      default: 8,
    },
    imgsArr: {
      type: Array,
      required: true,
    },
    maxCols: {
      type: Number,
      default: 5,
    },
    cardAnimationClass: {
      type: [String],
      default: "default-card-animation",
    },
    enablePullDownEvent: {
      type: Boolean,
      default: false,
    },
    reachBottomDistance:{// 滚动触底距离，触发加载新图片
      type: Number, // selector
      default: 20  // 默认在最低那一列到底时触发
    }
  },
  data() {
    return {
      isMobile: isMobile(),
      isPreloading: true, // 正在预加载中，显示加载动画
      imgsArr_c: [], // 待图片预加载imgsArr完成，插入新的字段height之后,才会生成imgsArr_c，这时才开始渲染
      cols: NaN, // 需要根据窗口宽度初始化
      loadedCount: 0,
      isFirstLoad: true, // 首次加载
      imgBoxEls: null, //所有的.img-box元素
      beginIndex: 0, // 开始要排列的图片索引,首次为第二列的第一张图片，后续加载则为已经排列图片的下一个索引
      colsHeightArr: [], 
      linkName: "Link",
    };
  },
  components: {
    Link,
  },
  computed: {
    hasLoadingSlot() {
      return !!this.$scopedSlots.loading;
    },
    imgWidth_c() {
      //对于移动端重新计算图片宽度
      return this.isMobile ? window.innerWidth / 2 : this.imgWidth;
    },
    gap_c() {
      return this.isMobile ? this.mobileGap : this.gap;
    },
    colWidth() {
      // 每一列的宽度
      return this.imgWidth_c + this.gap_c;
    },
  },
  watch: {
    imgsArr(newVal,oldVal){
      if(this.imgsArr_c.length > newVal.length||(this.imgsArr_c.length > 0 && newVal[0] && !newVal[0]._height)){
        this.reset()
      }
      this.preload();
    }
  },
  methods: {
    // ==1== 预加载
    preload(src, imgIndex) {  
      this.imgsArr.forEach((imgItem, imgIndex) => {
        if (imgIndex < this.loadedCount) return; // 只对新加载图片进行预加载
        // 无图时
        if (!imgItem[this.srcKey]) {
          this.imgsArr[imgIndex]._height = "0";
          this.loadedCount++;
          // 支持无图模式
          if (this.loadedCount == this.imgsArr.length) {
            this.$emit("preloaded");
          }
          return;
        }
        let oImg = new Image();
        oImg.src = imgItem[this.srcKey];
        oImg.onload = oImg.onerror = (e) => {
          this.loadedCount++;
        
          // 预加载图片，计算图片容器的高
          this.imgsArr[imgIndex]._height =
            e.type == "load"
              ? Math.round(this.imgWidth_c * (oImg.height / oImg.width))
              : this.imgWidth_c;  

          if (e.type == "error") {
            this.imgsArr[imgIndex]._error = true;
            this.$emit("imgError", this.imgsArr[imgIndex]);
          } 
          if (this.loadedCount === this.imgsArr.length) { 
            this.$emit("preloaded");
          }
        };
      });
      
    },
    // ==2== 计算cols
    calcuCols() {
      // 列数初始化
      let waterfallWidth = this.width ? this.width : window.innerWidth;
      let cols = Math.max(parseInt(waterfallWidth / this.colWidth),1); 
      return this.isMobile ? 2 : Math.min(cols,this.maxCols);
    },
    // ==3== waterfall布局
    waterfall() {
      this.imgBoxEls = this.$el.getElementsByClassName("img-box");
      if (!this.imgBoxEls) return;
      let top,
        left,
        height,
        colWidth = this.isMobile
          ? this.imgBoxEls[0].offsetWidth
          : this.colWidth;
      if (this.beginIndex == 0) this.colsHeightArr = [];
      for (let i = this.beginIndex; i < this.imgsArr.length; i++) {
        if (!this.imgBoxEls[i]) return;
        height = this.imgBoxEls[i].offsetHeight; 
        if (i < this.cols) {
          this.colsHeightArr.push(height);
          top = 0;
          left = i * colWidth;
        } else {
          let minHeight = Math.min.apply(null, this.colsHeightArr); // 最低高低
          let minIndex = this.colsHeightArr.indexOf(minHeight); // 最低高度的索引
          top = minHeight; 
          left = minIndex * colWidth;
          // 设置元素定位的位置
          // 更新colsHeightArr
          this.colsHeightArr[minIndex] = minHeight + height;
        } 
        this.imgBoxEls[i].style.left = left + "px";
        this.imgBoxEls[i].style.top = top + "px";
      }
      this.beginIndex = this.imgsArr.length; // 排列完之后，新增图片从这个索引开始预加载图片和排列
    },
    // ==4== resize 响应式
    response: function () {
      let old = this.cols;
      this.cols = this.calcuCols();
      if (old === this.cols) return; // 列数不变直接退出
      this.beginIndex = 0; // 开始排列的元素索引
      this.waterfall(); 
    },
    // ==5== 滚动触底事件
    scrollFn() {
      let scrollEl = this.$refs.scrollEl;
      //如果正在预加载
      if (this.isPreloading) return;
      let minHeight = Math.min.apply(null, this.colsHeightArr);
      if(scrollEl.scrollTop + scrollEl.offsetHeight > minHeight - this.reachBottomDistance){
        this.isPreloading=true;
        this.$emit('scrollReachBottom') 
      }
    },
    scroll() {
      this.$refs.scrollEl.addEventListener("scroll", this.scrollFn);
    },
    // ==6== 点击事件绑定
    bindClickEvent(){
      this.$el.querySelector('.vue-waterfall')
        .addEventListener('click',e=>{
          let targetEl=e.target;
          let targetClassName=targetEl.className; 
          if(targetClassName.indexOf('img-box')!=-1) return;
          while(targetClassName.indexOf('img-inner-box')==-1){
            targetEl=targetEl.parentNode;
          }
          let index=targetEl.getAttribute('data-index');
          this.$emit('click',e,{
            index,
            value:this.imgsArr_c[index]
          })
        })
    },
    // ==7== 下拉事件
    pullDown() {
      let scrollEl = this.$el.querySelector(".vue-waterfall-scroll");
      let startY;
      scrollEl.addEventListener("touchmove", (e) => {
        if (scrollEl.scrollTop === 0) {
          let t = e.changedTouches[0];
          if (!startY) startY = t.pageY;
          let pullDownDistance = t.pageY - startY;
          if (pullDownDistance > 0) {
            e.preventDefault();
          }
          this.$emit("pullDownMove", pullDownDistance);
        }
      });
      scrollEl.addEventListener("touchend", (e) => {
        if (scrollEl.scrollTop === 0) {
          startY = NaN;
          this.$emit("pullDownEnd");
        }
      });
    },
    reset: function () {
      this.imgsArr_c = [];
      this.beginIndex = 0
      this.loadedCount = 0;
      this.isFirstLoad = true;
      this.isPreloading=true; 
    },
  },
  mounted() {
    this.bindClickEvent();
    //this.loadingMiddle();

    this.preload();
    this.cols = this.calcuCols();
    this.$on("preloaded", () => {
      this.isFirstLoad = false;
      this.imgsArr_c = this.imgsArr.concat([]); // 预加载完成，这时才开始渲染 
      this.$nextTick(() => {
        this.isPreloading = false;  
        this.waterfall();
      });
    });
    if (!this.isMobile && !this.width)
      window.addEventListener("resize", this.response);
    if (this.isMobile && this.enablePullDownEvent) this.pullDown();
    this.scroll();
  },
};
</script>

<!-- —————————————↓Css————————分界线———————————————————————— -->
<style lang="scss">
@keyframes loading {
  50% {
    opacity: 0.2;
    transform: scale(0.75);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
.vue-waterfall-container {
  width: 100%;
  height: 100%;
  position: relative;

  .vue-waterfall-scroll {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .vue-waterfall {
    position: absolute;
    width: 100%;

    @keyframes show-card {
      0% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(1);
      }
    }

    .img-box {
      position: absolute;
      box-sizing: border-box;
      width: 50%; //移动端生效

      &.default-card-animation {
        animation: show-card 0.4s;
        transition: left 0.6s, top 0.6s;
        transition-delay: 0.1s;
      }

      .img-inner-box {
        // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        border-radius: 4px;
        display: block;

        & > img {
          width: 100%;
          display: block;
          border: none;
        }
      }
    } 
  }

  > .loading {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 6px;
    z-index: 999;

    &.first {
      bottom: 50%;
      transform: translate(-50%, 50%);
    }

    &.ball-beat {
      > .dot {
        vertical-align: bottom;
        background-color: #4b15ab;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin: 3px;
        animation-fill-mode: both;
        display: inline-block;
        animation: loading 0.7s 0s infinite linear;

        &:nth-child(2n-1) {
          animation-delay: 0.35s;
        }
      }
    }
  }
}
</style>
