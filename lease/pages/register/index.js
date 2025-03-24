Page({
  data: {
    phone: '',
    code: '',
    canSendCode: false,
    canRegister: false,
    sendCodeText: '发送验证码',
    countdown: 60
  },

  onLoad() {
  },

  onPhoneInput(e) {
    const phone = e.detail.value;
    this.setData({
      phone,
      canSendCode: phone.length === 11
    });
    this.checkCanRegister();
  },

  onCodeInput(e) {
    const code = e.detail.value;
    this.setData({
      code
    });
    this.checkCanRegister();
  },

  checkCanRegister() {
    const { phone, code } = this.data;
    this.setData({
      canRegister: phone.length === 11 && code.length === 6
    });
  },

  onSendCode() {
    if (!this.data.canSendCode) return;
    
    // 模拟发送验证码
    my.showToast({
      type: 'success',
      content: '验证码已发送'
    });

    // 开始倒计时
    this.setData({
      canSendCode: false,
      sendCodeText: '60s后重发'
    });

    let count = this.data.countdown;
    const timer = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(timer);
        this.setData({
          canSendCode: true,
          sendCodeText: '发送验证码'
        });
      } else {
        this.setData({
          sendCodeText: `${count}s后重发`
        });
      }
    }, 1000);
  },

  onRegister() {
    if (!this.data.canRegister) return;

    // 模拟注册成功
    my.showToast({
      type: 'success',
      content: '注册成功'
    });

    // 返回登录页
    my.navigateBack();
  }
}); 