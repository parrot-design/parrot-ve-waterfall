一起用代码吸猫！本文正在参与【喵星人征文活动】。

# 猫咪瀑布流

> 如下动态图，一张张不规则的可爱猫咪照片是否勾起了你的少女心呢？

> 瀑布流又称瀑布流式布局，是比较流行的一种网站页面布局方式。瀑布流实现的方式有很多种，但是原理都是差不多的，本文我们来详细介绍下下面这个猫咪瀑布流是如何实现的。

# 瀑布流原理

> 如上图：第1、2、3、4、5张图排在容器内的第一行，即靠近顶部。

> 我们会发现第6张图并没有排在第1张图的下面，而是排在了第3张图下面。

> 其实这就是瀑布流的关键之处，那么第6张图片是根据什么排列的呢?

> 其实他会放在当前排列图片中底部距离顶部最小的图片下面，这样做是为了图片差不会很大，我们可以看到3是高度最小的图片，然后我们就将第6张图放在3图的下面。

> 那么同理，第7张图就应该在下图所示位置。

> 那么你知道第8张图应该放在哪里吗，这里我们留个问题让大家思考，文章结尾我们会揭晓答案，你要是迫不及待可以滑到文章结尾看看你猜的对不对。

# 预加载图片

> 实现瀑布流的原理我们大概知道，那么具体的技术实现是怎么实现呢？

> 其实就是根据图片宽高等设置图片的偏移值即<b>top</b>和<b>left</b>值。

> 意味着我们肯定需要知道图片的<b>宽高比例</b>，因为我们这里的一列的宽度需要保持一致，即可以设置一个固定值。

> 如果我们等渲染完以后再进行高度的获取，然后再设置<b>top</b>值和<b>left</b>值，就会导致界面的闪动。

> 所以我们需要再一开始就先<b>预加载</b>图片并获取宽高，但是并不进行渲染等时机成熟，也就是所有图片都加载完成，即所有图片的高度都算出来以后再进行渲染，说起来柑橘很简单，但是具体实现应该怎么操作呢？

## 1.遍历传进来的img数组

```js
//imgsArr是组件外部传入的一个图片数组 里面有一个src表示图片的路径
this.imgsArr.forEach((imgItem, imgIndex) => {
    //...
    //...
})
```

## 2.loadedCount记录加载数量

```js
//声明loadedCount变量记录加载完毕的数量，为了和imgsArr大小作比较，通知加载完毕（包括无图、加载完毕，加载失败的情况）
data(){
    return {
        loadedCount: 0
    }
}
```

## 3.无图的情况下

```js
// 无图时 将高度记录为0
if (!imgItem[this.srcKey]) {
    this.imgsArr[imgIndex]._height = "0";
    this.loadedCount++;
    // 支持无图模式
    if (this.loadedCount == this.imgsArr.length) {
        this.$emit("preloaded");
    }
    return;
}
```

## 4.Image对象

```js
//使用Image API 当src属性改变并完成加载时执行
let oImg = new Image();
oImg.src = imgItem[this.srcKey];
oImg.onload = oImg.onerror = (e) => {
    //...
}
```

## 5.加载完成后，计算实际需要渲染图片的高

```js
//理论上 预加载图片的高度/预加载图片的宽度=需要渲染图片的高度/图片宽度
this.imgsArr[imgIndex]._height =
            e.type == "load"
              ? Math.round(this.imgWidth_c * (oImg.height / oImg.width))
              : this.imgWidth_c;  
```

## 6.加载失败后，标识失败标记

```js
if (e.type == "error") {
    this.imgsArr[imgIndex]._error = true;
    this.$emit("imgError", this.imgsArr[imgIndex]);
} 
```

## 7.全部加载完后，进行emit preloaded事件

```js
if (this.loadedCount === this.imgsArr.length) { 
    this.$emit("preloaded");
}
```

# 计算列数

```js
calcuCols() {
    // 需要计算出渲染多少列数据
    let waterfallWidth = this.width ? this.width : window.innerWidth;
    //最少渲染一列
    let cols = Math.max(parseInt(waterfallWidth / this.colWidth),1); 
    //最大不能超过maxCols列
    return this.isMobile ? 2 : Math.min(cols,this.maxCols;
}
```

# 使用$on/$emit监听加载完毕

```js
//当加载完以后 页面开始进行渲染 imgsArr_c 为真实渲染数组
this.$emit("preloaded");

this.$on("preloaded", () => { 
    this.imgsArr_c = this.imgsArr.concat([]); // 预加载完成，这时才开始渲染
    // ...
});
```

# 使用$nextTick寻找更新时机

> 当data中的某个属性改变的时候，这个值并不是立即渲染到页面上，而是先放到watcher队列上（异步），只有当前任务空闲的时候才会去执行watcher队列上的任务。所以导致，改变的数据挂载到dom上会有一定的延迟，这也就导致了，当我们在改变属性值的时候，立即通过dom去拿改变的值时发现拿到的值并不是改变的值，而是之前的值。

> 上面的data也就是对应了我们的imgsArr_c。

> this.$nextTick作用：在下次dom更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获得更新后的dom。

```js
this.$nextTick(() => {
    //表示欲加载结束
    this.isPreloading = false;
    this.waterfall();
});
```

# 使用waterfall方法排列（核心）

```js
waterfall() {
    //选择所有图片
    this.imgBoxEls = this.$el.getElementsByClassName("img-box");
    //如果一个都没有则没有东西可以排列 故直接返回
    if (!this.imgBoxEls) return;
    //声明top、left、height、colwidth即列的宽度
    let top,
        left,
        height,
        colWidth = this.isMobile
          ? this.imgBoxEls[0].offsetWidth
          : this.colWidth;
    //开始排列的坐标大小 如果是从0开始排列 则将colsHeightArr置空，colsHeightArr的作用是用来比较 当前排列图片中哪个最小
    if (this.beginIndex == 0) this.colsHeightArr = [];
    //从0开始排列
    for (let i = this.beginIndex; i < this.imgsArr.length; i++) {
        if (!this.imgBoxEls[i]) return;
        //获取渲染元素的高度
        height = this.imgBoxEls[i].offsetHeight;
        if (i < this.cols) {
            //如果小于列数 则将第一排的几个元素全部push进数组里面 将top置为0 left为列坐标乘以列的宽度
            this.colsHeightArr.push(height);
            top = 0;
            left = i * colWidth;
        } else {
            //当第一行排列完以后 算出当前最小的高度
            let minHeight = Math.min.apply(null, this.colsHeightArr); // 最低高低
            //当第一行排列完以后 算出当前最小的索引
            let minIndex = this.colsHeightArr.indexOf(minHeight); // 最低高度的索
            //新元素的top值即为数组中最小的值
            top = minHeight;
            //左边的值即为最小索引乘以列宽
            left = minIndex * colWidth;
            // 设置元素定位的位置
            // 更新colsHeightArr
            this.colsHeightArr[minIndex] = minHeight + height;
        }
        //设置单个元素的left、top值
        this.imgBoxEls[i].style.left = left + "px";
        this.imgBoxEls[i].style.top = top + "px";
      }
      this.beginIndex = this.imgsArr.length; // 排列完之后，新增图片从这个索引开始预加载图片和排列
}
```

# 添加响应式

```js
window.addEventListener("resize", this.response);

response: function () {
      let old = this.cols;
      //重新计算列数
      this.cols = this.calcuCols();
      //如果列数不变 则不需要重新排列
      if (old === this.cols) return; // 列数不变直接退出
      this.beginIndex = 0; // 开始排列的元素索引
      this.waterfall();
}
```

# 添加滚动触底

```js
this.scroll();

scroll() {
      this.$refs.scrollEl.addEventListener("scroll", this.scrollFn);
}

scrollFn() {
      let scrollEl = this.$refs.scrollEl;
      //如果正在预加载
      if (this.isPreloading) return;
      let minHeight = Math.min.apply(null, this.colsHeightArr);
      if (
        scrollEl.scrollTop + scrollEl.offsetHeight >
        minHeight - this.reachBottomDistance
      ) {
        this.isPreloading = true;
        this.$emit("scrollReachBottom");
      }
}
```

# 更多细节

> 更多细节，尽在[github](https://github.com/parrot-design/parrot-ve-waterfall-pic)上,欢迎大家踊跃star!

# 发布到npm上供大家使用

```js
npm install @parrotjs/vue-waterfall -S
```

> 具体可以去我的github README.md进行查看