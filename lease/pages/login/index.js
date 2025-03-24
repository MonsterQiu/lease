const app = getApp();

Page({
  data: {
    isAgree: false
  },

  onLoad() {
  },

  onAgreeChange(e) {
    this.setData({
      isAgree: e.detail.value
    });
  },

  async onAuthLogin() {
    if (!this.data.isAgree) {
      my.showToast({
        type: 'fail',
        content: '请先同意用户协议和隐私政策'
      });
      return;
    }

    try {
      const auth = await my.getAuthCode({
        scopes: ['auth_user']
      });
      
      if (auth.authCode) {
        // 获取用户信息
        const res = await my.getOpenUserInfo();
        if (res.response) {
          const userInfo = JSON.parse(res.response).response;
          // 模拟登录成功
          app.globalData.userInfo = {
            ...userInfo,
            isLogin: true
          };
          
          my.showToast({
            type: 'success',
            content: '登录成功'
          });
          
          my.navigateBack();
        }
      }
    } catch (err) {
      my.showToast({
        type: 'fail',
        content: '登录失败，请重试'
      });
    }
  },

  onShowUserAgreement() {
    // 显示用户协议
    my.alert({
      title: '用户协议',
      content: '这里是用户协议内容'
    });
  },

  onShowPrivacyPolicy() {
    // 显示隐私政策
    my.alert({
      title: '隐私政策',
      content: '这里是隐私政策内容'
    });
  }
}); 