// pages/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    playing: false,
    frontCamera: true,
    cameraContext: {},
    pushUrl: "",
    showHDTips: false, //显示清晰度弹窗
    mode: "HD",
    muted: false,
    enableCamera: true,
    orientation: "vertical",
    beauty: 6.3,
    whiteness: 3.0,
    backgroundMute: false,
    hide: false,
    debug: false,
    playUrl: "",
  },


  onInputTap: function() {
    this.setData({
      focus: true
    })
  },

  // input框内容同步到js
  onInputChange: function (e) {
    this.setData({
      pushUrl: e.detail.value,
      playUrl: "",
    })
  },


  onScanQR: function () {

    this.stop();
    console.log("onScaneQR");
    var self = this;
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        self.setData({
          pushUrl: res.result,
          playUrl: "",
        })
      }
    })
  },



  onPushClick: function () {
    // this.data.pusherConfig.debug = !this.data.pusherConfig.debug;
    console.log("onPushClick", this.data);
    if (this.data.pushUrl.indexOf("rtmp://") != 0) {
      wx.showModal({
        title: '提示',
        content: '推流地址不合法，请点击右上角+按钮先获取推流地址',
        showCancel: false
      });
      return;
    }
    this.setData({
      playing: !this.data.playing,
    })
    if (this.data.playing) {
      this.data.cameraContext.start();
      console.log("camera start");
    } else {
      this.data.cameraContext.stop();
      console.log("camera stop");
    }
  },


  onSwitchCameraClick: function () {
    this.data.frontCamera = !this.data.frontCamera;
    this.setData({
      frontCamera: this.data.frontCamera
    })
    this.data.cameraContext.switchCamera();
  },

  onBeautyClick: function () {
    if (this.data.beauty != 0) {
      this.data.beauty = 0;
      this.data.whiteness = 0;
    } else {
      this.data.beauty = 6.3;
      this.data.whiteness = 3.0;
    }

    this.setData({
      beauty: this.data.beauty,
      whiteness: this.data.whiteness
    })
  },

  onOrientationClick: function () {
    if (this.data.orientation == "vertical") {
      this.data.orientation = "horizontal";
    } else {
      this.data.orientation = "vertical";
    }
    this.setData({
      orientation: this.data.orientation
    })
  },


  onLogClick: function () {
    this.setData({
      debug: !this.data.debug
    })
  },

  onSwitchMode: function () {
    var showTips = !this.data.showHDTips;
    this.setData({
      showHDTips: showTips
    })
  },

  onModeClick: function (event) {
    var mode = "SD";
    switch (event.target.dataset.mode) {
      case "SD":
        mode = "SD";
        break;
      case "HD":
        mode = "HD";
        break;
      case "FHD":
        mode = "FHD";
        break;
      case "RTC":
        mode = "RTC";
        break;
    }

    this.setData({
      mode: mode,
      showHDTips: false
    })
  },

  onEnableCameraClick: function () {
    this.setData({
      enableCamera: !this.data.enableCamera
    })
    if (this.data.playing) {
      this.data.cameraContext.stop();
      setTimeout(() => {
        this.data.cameraContext.start();
      }, 500)
    }
  },

  onMuteClick: function () {
    this.setData({
      muted: !this.data.muted
    })
  },

  onPushEvent: function (e) {
    console.log(e.detail.code);

    if (e.detail.code == -1307) {
      this.stop();
      wx.showToast({
        title: '推流多次失败',
      })
    }
  },

  stop: function () {
    this.setData({
      playing: false,
      mode: "HD",
      muted: false,
      enableCamera: true,
      orientation: "vertical",
      beauty: 6.3,
      whiteness: 3.0,
      backgroundMute: false,
      debug: false
    })
    this.data.cameraContext.stop();
  },

  createContext: function () {
    this.setData({
      cameraContext: wx.createLivePusherContext('camera-push'),
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    console.log("onLoad onReady");
    this.createContext();

    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onLoad onShow");
    // 保持屏幕常亮
    wx.setKeepScreenOn({
      keepScreenOn: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onLoad onUnload");
    this.stop();

    wx.setKeepScreenOn({
      keepScreenOn: false,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})