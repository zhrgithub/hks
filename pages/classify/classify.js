// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isclose: true,
    searchvalue:"热门搜索",
    searchsubmit: true,
    searchreset: false,
    hotsearch: [{ message: "短裤" }, { message: "背带裙" }, { message: "牛仔裤男" }, { message: "运动 休闲男鞋" }, { message: "蕾丝连衣裙" }, { message: "电视" }, { message: "长裙" }, { message: "oppo" }, { message: "蓝牙耳机" }, { message: "女包" }, { message: "格力空调" }, { message: "魅族" }],
    falg: true,
    hotsearch1: [{ message: "短裤" }, { message: "背带裙" }, { message: "牛仔裤男" }, { message: "运动 休闲男鞋" }, { message: "蕾丝连衣裙" }, { message: "电视" }, { message: "长裙" }, { message: "oppo" }, { message: "蓝牙耳机" }, { message: "女包" }, { message: "格力空调" }, { message: "魅族" }],
    hotsearch2: [{ message: "平板电脑" }, { message: "耳机" }, { message: "男鞋" }, { message: "iPhone" }, { message: "蕾丝连衣裙" }, { message: "电视" }, { message: "长裙" }, { message: "oppo" }, { message: "蓝牙耳机" }, { message: "女包" }, { message: "格力空调" }, { message: "魅族手机" }],
    historydata: [],
    historydatashow: false,
    searchresult: false,
    inputsearch: "",//输入框内的值,
    searchResult: [{ result: "苹果手机" }, { result: "手机支架" }, { result: "手机自营" }, { result: "手机套" }, { result: "手机膜" }, { result: "手机卡" }, { result: "手机报" }, { result: "苹果手机壳" }, { result: "手机车载支架" }],//虚拟的查询结果
    shopList: [],
    //由于第一次加载页面的时候页面会自增1，所以设置为0
    pageIndex: 2,
    pageSize: 5,
    catId: 1,

  },
  loadMore: function () {
    wx.request({//cat表示页数，_limit表示每页页最大数据量，_page表示默认到第一页
      url: 'https://locally.uieee.com/categories/' + this.data.catId + '/shops',
      data: {
        _limit: this.data.pageSize,
        _page: ++this.data.pageIndex
      },
      success: (res) => {
        console.log(res);
        //bug:每次请求过来的数据把本来的数据替换掉了
        //6.解决bug的思路，先获取本来的数据,再通过concatb把新数据拼接起来
        var newList = this.data.shopList.concat(res.data);
        this.setData({
          shopList: newList
        })
      },
    })
  },

  /*输入框输入后触发，用于联想搜索和切换取消确认*/
  inputoperation: function (e) {
    this.setData({
      searchsubmit: false,
      searchreset: true,
      isclose: false,
      searchvalue: e.detail.value
      // searchvalue: this.data.searchvalue.concat(e.detail.value)
    })
    
  },
  //点击清空
  resetinput: function (e) {
    this.setData({
      searchsubmit: false,
      searchreset: false,
      inputsearch: "",
      searchresult: false,
      isclose: true,
    })
  },
//   /*取消 */
//  cancelsearch: function () {
//     wx.navigateBack({
//       url: '../classify/classify'
//     })
//   },
  /*返回搜索页*/
  backsearch: function () {
    
  },
  /*点击清除 */
  removeall:function(){
    this.setData({
      historydata: [],
      historydatashow:false
    })
    wx.clearStorageSync()
  },
  /*换一批操作 */
  changeother: function () {
    this.setData({
      falg: !this.data.falg
    })
  },
  /*点击搜索*/
  searchbegin: function () {
    let that = this
    wx.setStorage({
      key: "historydata",
      data: that.data.historydata.concat(that.data.searchvalue)
    })
    console.log(that.data.historydata)

    //请求数据调页面
    // wx.navigateTo({
    //   url: '../detail/detail'
    // })
    this.setData({
      // 显示searchResult里面的数组
      // searchresult: true,
      isclose:false,
    })
    that.onLoad()
    // 进入搜索页面
    wx.navigateTo({
      url: '/pages/goods-search/goods-search?keywords=' + that.data.searchvalue
    });
  },
  //点击进入详情页
  gotodetail: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 历史搜索
    let that = this
    wx.getStorage({
      key: 'historydata',
      success: function (res) {
        console.log(res.data)
        that.setData({
          historydatashow: true,
          historydata: res.data
        })
      }
    })
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title,
      });
    }
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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