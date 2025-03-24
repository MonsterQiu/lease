App({
  globalData: {
    currentCity: '定位中...',
    latitude: null,
    longitude: null
  },

  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
    // 获取位置信息
    this.getLocation();
  },

  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },

  // 获取位置信息
  getLocation() {
    my.getLocation({
      type: 1,
      success: (res) => {
        console.log('定位成功:', res);
        this.globalData.latitude = res.latitude;
        this.globalData.longitude = res.longitude;
        
        // 如果直接返回了城市信息
        if (res.city) {
          this.globalData.currentCity = res.city;
          // 通知页面更新
          if (this.cityChangeCallback) {
            this.cityChangeCallback(res.city);
          }
        } else {
          // 使用经纬度获取城市信息
          this.getCityFromLocation(res.latitude, res.longitude);
        }
      },
      fail: (error) => {
        console.error('定位失败:', error);
        this.globalData.currentCity = '定位失败';
        if (this.cityChangeCallback) {
          this.cityChangeCallback('定位失败');
        }
      }
    });
  },

  // 根据经纬度获取城市信息
  getCityFromLocation(latitude, longitude) {
    my.request({
      url: 'https://restapi.amap.com/v3/geocode/regeo',
      data: {
        key: 'dfab999249fa51a034d48c6b142ab98f',
        location: `${longitude},${latitude}`,
        extensions: 'base'
      },
      success: (res) => {
        console.log('高德地图API返回:', res);
        if (res.data && res.data.status === '1') {
          const regeocode = res.data.regeocode;
          if (regeocode && regeocode.addressComponent) {
            const addressComponent = regeocode.addressComponent;
            const city = addressComponent.city || addressComponent.province;
            this.globalData.currentCity = city;
            // 通知页面更新
            if (this.cityChangeCallback) {
              this.cityChangeCallback(city);
            }
          }
        }
      },
      fail: (error) => {
        console.error('获取城市信息失败:', error);
        if (this.cityChangeCallback) {
          this.cityChangeCallback('定位失败');
        }
      }
    });
  }
});
