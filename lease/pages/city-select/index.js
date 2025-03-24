const app = getApp();

Page({
  data: {
    searchValue: '',
    currentCity: '',
    locationCity: '定位中...',
    hotCities: ['北京市', '上海市', '广州市', '深圳市', '成都市', '杭州市'],
    allCities: [
      '北京市', '上海市', '广州市', '深圳市', '成都市', '杭州市',
      '武汉市', '西安市', '南京市', '重庆市', '天津市', '长沙市',
      '青岛市', '大连市', '厦门市', '济南市', '沈阳市', '长春市'
    ]
  },

  onLoad() {
    // 获取当前选择的城市
    this.setData({
      currentCity: app.globalData.currentCity,
      locationCity: app.globalData.currentCity
    });
  },

  // 搜索城市
  onSearch(e) {
    const value = e.detail.value;
    this.setData({ searchValue: value });
    
    // 过滤城市列表
    const filteredCities = this.data.allCities.filter(city => 
      city.toLowerCase().includes(value.toLowerCase())
    );
    
    this.setData({
      allCities: filteredCities
    });
  },

  // 选择城市
  onSelectCity(e) {
    const city = e.target.dataset.city;
    
    // 更新全局城市信息
    app.globalData.currentCity = city;
    
    // 返回上一页
    my.navigateBack();
  },

  // 重新定位
  onRelocate() {
    this.setData({
      locationCity: '定位中...'
    });
    app.getLocation();
  }
}); 