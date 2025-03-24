const app = getApp();

Page({
  data: {
    userInfo: null
  },

  onLoad() {
    // 检查登录状态
    this.checkLoginStatus();
  },

  onShow() {
    // 每次显示页面时检查登录状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus() {
    const userInfo = my.getStorageSync({ key: 'userInfo' }).data;
    if (userInfo) {
      this.setData({ userInfo });
    }
  },

  // 授权登录
  onLogin() {
    my.getAuthCode({
      scopes: ['auth_user'],
      success: (res) => {
        // 获取到授权码
        const authCode = res.authCode;
        console.log('授权码:', authCode);
        
        // 获取用户信息
        my.getOpenUserInfo({
          success: (res) => {
            const userInfo = JSON.parse(res.response).response;
            console.log('用户信息:', userInfo);
            
            // 调用后端接口，用授权码换取用户信息
            this.loginWithAuthCode(authCode, userInfo);
          },
          fail: (error) => {
            console.error('获取用户信息失败:', error);
            my.showToast({
              type: 'fail',
              content: '获取用户信息失败'
            });
          }
        });
      },
      fail: (error) => {
        console.error('获取授权码失败:', error);
        my.showToast({
          type: 'fail',
          content: '授权失败'
        });
      }
    });
  },

  // 使用授权码登录
  loginWithAuthCode(authCode, userInfo) {
    // TODO: 调用后端接口，用授权码换取用户信息
    // my.request({
    //   url: 'your-api-endpoint/login',
    //   method: 'POST',
    //   data: {
    //     authCode,
    //     userInfo
    //   },
    //   success: (res) => {
    //     // 保存用户信息和token
    //     my.setStorageSync({
    //       key: 'userInfo',
    //       data: res.data.userInfo
    //     });
    //     my.setStorageSync({
    //       key: 'token',
    //       data: res.data.token
    //     });
    //     this.setData({
    //       userInfo: res.data.userInfo
    //     });
    //   },
    //   fail: (error) => {
    //     console.error('登录失败:', error);
    //     my.showToast({
    //       type: 'fail',
    //       content: '登录失败'
    //     });
    //   }
    // });

    // 临时使用模拟数据
    const mockUserInfo = {
      avatar: userInfo.avatar,
      nickname: userInfo.nickName,
      phone: '138****8888'
    };
    
    my.setStorageSync({
      key: 'userInfo',
      data: mockUserInfo
    });
    
    this.setData({
      userInfo: mockUserInfo
    });
    
    my.showToast({
      type: 'success',
      content: '登录成功'
    });
  },

  // 查看订单
  onViewOrders(e) {
    const status = e.target.dataset.status;
    my.navigateTo({
      url: `/pages/orders/index?status=${status}`
    });
  },

  // 查看全部订单
  onViewAllOrders() {
    my.navigateTo({
      url: '/pages/orders/index'
    });
  },

  // 查看收藏
  onViewCollection() {
    my.navigateTo({
      url: '/pages/collection/index'
    });
  },

  // 查看优惠券
  onViewCoupons() {
    my.navigateTo({
      url: '/pages/coupons/index'
    });
  },

  // 查看消息
  onViewMessages() {
    my.navigateTo({
      url: '/pages/messages/index'
    });
  },

  // 查看设置
  onViewSettings() {
    my.navigateTo({
      url: '/pages/settings/index'
    });
  }
}); 