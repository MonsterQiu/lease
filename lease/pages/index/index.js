const app = getApp();

Page({
  data: {
    currentCity: '',
    locationCity: '',
    searchValue: '',
    banners: [
      { id: 1, image: '/assets/images/banner1.png' },
      { id: 2, image: '/assets/images/banner2.png' },
      { id: 3, image: '/assets/images/banner3.png' }
    ],
    quickNav: [
      { id: 1, icon: '/assets/icons/nav1.png', text: '附近门店' },
      { id: 2, icon: '/assets/icons/nav2.png', text: '特惠活动' },
      { id: 3, icon: '/assets/icons/nav3.png', text: '品牌专区' },
      { id: 4, icon: '/assets/icons/nav4.png', text: '骑行攻略' }
    ],
    shops: [],
    models: [],
    loading: false
  },

  onLoad() {
    // 设置当前城市
    this.setData({
      currentCity: app.globalData.currentCity || '定位中...',
      locationCity: app.globalData.locationCity || '定位中...'
    });

    // 监听城市变化
    app.cityChangeCallback = (city) => {
      this.setData({
        currentCity: city
      });
    };

    this.loadPageData();
  },

  // 页面显示时检查城市信息
  onShow() {
    // 如果全局城市信息已更新，则更新页面
    if (app.globalData.currentCity !== this.data.currentCity) {
      this.setData({
        currentCity: app.globalData.currentCity
      });
    }
  },

  // 下拉刷新监听
  onPullDownRefresh() {
    this.loadPageData(() => {
      my.stopPullDownRefresh();
    });
  },

  // 加载页面数据
  loadPageData(callback) {
    this.setData({ loading: true });
    
    // 模拟获取推荐商家数据
    const mockShops = [
      {
        id: 1,
        name: '老王摩托车行',
        address: '杭州市西湖区文三路 108 号',
        distance: '1.2km',
        rating: 4.8,
        image: '/assets/images/shop1.png'
      },
      {
        id: 2,
        name: '速达摩托',
        address: '杭州市拱墅区莫干山路 1000 号',
        distance: '2.5km',
        rating: 4.6,
        image: '/assets/images/shop2.png'
      }
    ];

    // 模拟获取热门车型数据
    const mockModels = [
      {
        id: 1,
        name: '春风 400NK',
        price: '288',
        image: '/assets/images/model1.png'
      },
      {
        id: 2,
        name: '本田 CBR300R',
        price: '328',
        image: '/assets/images/model2.png'
      }
    ];

    // 模拟网络请求延迟
    setTimeout(() => {
      this.setData({
        shops: mockShops,
        models: mockModels,
        loading: false
      });
      
      // 如果有回调函数则执行
      if (typeof callback === 'function') {
        callback();
      }
    }, 1000);
  },

  // 点击城市
  onCityTap() {
    my.navigateTo({
      url: '/pages/city-select/index'
    });
  },

  // 搜索栏点击
  onSearchTap() {
    my.showToast({
      content: '搜索功能开发中'
    });
  },

  // 快捷导航点击
  onQuickNavTap(e) {
    const { id } = e.currentTarget.dataset;
    my.showToast({
      content: '功能开发中'
    });
  },

  // 店铺点击
  onShopTap(e) {
    const { id } = e.currentTarget.dataset;
    my.showToast({
      content: '店铺详情开发中'
    });
  },

  // 车型点击
  onModelTap(e) {
    const { id } = e.currentTarget.dataset;
    my.showToast({
      content: '车型详情开发中'
    });
  },

  // 搜索
  onSearch(e) {
    const value = e.detail.value;
    this.setData({ searchValue: value });
    // TODO: 实现搜索逻辑
  },

  // 清除搜索
  onClear() {
    this.setData({ searchValue: '' });
  },

  // 轮播图点击
  onBannerTap(e) {
    const { item } = e.target.dataset;
    my.navigateTo({
      url: item.link
    });
  },

  // 查看更多店铺
  onMoreShops() {
    my.navigateTo({
      url: '/pages/shop-list/index'
    });
  },

  // 查看更多车型
  onMoreModels() {
    my.navigateTo({
      url: '/pages/model-list/index'
    });
  },

  onReady() {
    // 页面加载完成
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
