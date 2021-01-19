1、引入 js-sdk

```html
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
```

2、在页面挂载之后

```js
export default {
  async mounted() {
    const thisPageUrl = window.location.href.split('#')[0];
    const response = await requestWxSignature(thisPageUrl); // 向后端请求拿到签名
    const { data, code } = response;
    if (code === 0 && data) {
      this.testLauch(data.appId, data.timestamp, data.nonceStr, data.signature);
    }
  }

  methods: {
    // 配置微信
    testLauch(appId, timestamp, nonceStr, signature) {
      const _this = this;
      wx.config({
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: ['openLocation', 'getLocation'],
        // wx-open-launch-weapp 打开小程序， wx-open-launch-app 打开app
        openTagList: ['wx-open-launch-weapp'], 
      });

      wx.ready(() => {
        console.log('aaa');
      });

      wx.error(err => {
        console.log('err', err);
      });
    }
  }
}
```

3、在 `template` 中这样使用。

```html
<!-- 打开app -->
 <wx-open-launch-app
  id="launch-btn"
  appid="公众号appid"
  @launch="handleLaunchFn"
  @error="handleErrorFn"
>
  <!-- 在vue的template中 -->
  <script type="text/wxtag-template">
    <style>.btn { padding: 40px; border: 1px solid blue; }</style>
    <button class="btn">打开App</button>
  </script>
  <!-- 在其他环境 -->
  <template>
    <style>.btn { padding: 40px; border: 1px solid blue; }</style>
    <button class="btn">打开App2</button>
  </template>
</wx-open-launch-app>

<!-- 打开小程序 注意，两者标签不一样，接受的属性也不一样 -->
<wx-open-launch-weapp
  id="launch-btn"
  username="原始小程序id"
  path="小程序路径/page/index/index.html"
  @launch="handleLaunchFn"
  @error="handleErrorFn"
>
  <script type="text/wxtag-template">
    <style>.btn { padding: 40px; border: 1px solid blue; }</style>
    <button class="btn">打开小程序</button>
  </script>
</wx-open-launch-weapp>
```

参考 https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html