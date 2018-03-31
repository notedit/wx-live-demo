App({
  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
  },
  globalData: {
    userInfo: null
  }
})