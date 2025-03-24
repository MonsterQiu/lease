const app = getApp();

Page({
  data: {
    currentCity: '定位中...',
    searchValue: '',
    banners: [
      { id: 1, imageUrl: '/assets/banner1.jpg', link: '/pages/activity/index' },
      { id: 2, imageUrl: '/assets/banner2.jpg', link: '/pages/activity/index' },
      { id: 3, imageUrl: '/assets/banner3.jpg', link: '/pages/activity/index' }
    ],
    quickActions: [
      { type: 'nearby', name: '附近店铺', icon: '/assets/icons/nearby.png' },
      { type: 'brand', name: '品牌专区', icon: '/assets/icons/brand.png' },
      { type: 'activity', name: '特惠活动', icon: '/assets/icons/activity.png' },
      { type: 'new', name: '新车上市', icon: '/assets/icons/new.png' }
    ],
    recommendShops: [
      {
        id: 1,
        name: '摩托之家',
        logo: '/assets/shop1.jpg',
        distance: 1.2,
        rating: 4.8,
        tags: ['优质商家', '品牌店', '服务好']
      },
      {
        id: 2,
        name: '机车部落',
        logo: '/assets/shop2.jpg',
        distance: 2.5,
        rating: 4.6,
        tags: ['老店', '车型多', '价格实惠']
      }
    ],
    hotModels: [
      {
        id: 1,
        name: '本田 CB300R',
        image: '/assets/model1.jpg',
        price: 199,
        shopCount: 12
      },
      {
        id: 2,
        name: '川崎 Ninja 400',
        image: '/assets/model2.jpg',
        price: 299,
        shopCount: 8
      }
    ]
  },

  onLoad() {
    // 设置当前城市
    this.setData({
      currentCity: app.globalData.currentCity
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

  // 加载页面数据
  async loadPageData() {
    try {
      // TODO: 调用后端API获取数据
      // const res = await my.request({
      //   url: 'your-api-endpoint',
      //   method: 'GET'
      // });
      // this.setData({
      //   banners: res.data.banners,
      //   recommendShops: res.data.shops,
      //   hotModels: res.data.models
      // });
    } catch (error) {
      console.error('加载数据失败:', error);
    }
  },

  // 选择城市
  onSelectCity() {
    my.navigateTo({
      url: '/pages/city-select/index'
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

  // 快捷功能点击
  onQuickActionTap(e) {
    const { type } = e.target.dataset;
    switch (type) {
      case 'nearby':
        my.navigateTo({ url: '/pages/nearby-shops/index' });
        break;
      case 'brand':
        my.navigateTo({ url: '/pages/brand/index' });
        break;
      case 'activity':
        my.navigateTo({ url: '/pages/activity/index' });
        break;
      case 'new':
        my.navigateTo({ url: '/pages/new-models/index' });
        break;
    }
  },

  // 店铺点击
  onShopTap(e) {
    const { id } = e.target.dataset;
    my.navigateTo({
      url: `/pages/shop-detail/index?id=${id}`
    });
  },

  // 车型点击
  onModelTap(e) {
    const { id } = e.target.dataset;
    my.navigateTo({
      url: `/pages/model-detail/index?id=${id}`
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
  onPullDownRefresh() {
    // 页面被下拉
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
