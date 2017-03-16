/**
 * Created by zhouchao on 17/1/5.
 */
import { Toast } from 'antd-mobile';
import { push } from 'dva/routerRedux';
import { getSignPackage, getOpenid } from '../services/weixin';
import Storage from '../utils/Storage';
import { FRONTEND_DOMAIN } from '../constants';

async function init() {
  const { data } = await getSignPackage({ url: window.location.href });
  const sign = data.data;
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: sign.appId, // 必填，公众号的唯一标识
    timestamp: sign.timestamp, // 必填，生成签名的时间戳
    nonceStr: sign.nonceStr, // 必填，生成签名的随机串
    signature: sign.signature,  // 必填，签名，见附录1
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'hideMenuItems',
      'showMenuItems',
      'showAllNonBaseMenuItem',
      'hideAllNonBaseMenuItem',
      'startRecord',
      'stopRecord',
      'onVoiceRecordEnd',
      'uploadVoice',
      'downloadVoice',
      'playVoice',
      'onVoicePlayEnd',
      'pauseVoice',
      'stopVoice',
      'openLocation',
      'getLocation',
      'chooseWXPay',
    ], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
}

async function weiChatLoginByOpenId() {
  const getQueryString = (name) => {
    const exp = `(^|&)${name}=([^&]*)(&|$)`;
    const reg = new RegExp(exp, 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  };
  const code = getQueryString('code');
  if (code != null) {
    const { data } = await getOpenid({ code });
    if (data.status === 1) {
      Storage.set('duanzu-openid', data.data.openid);
      push('/user/login');
    } else {
      Storage.remove('duanzu-openid');
      Toast.fail(data.msg);
    }
  } else {
    let href = window.location.origin + window.location.pathname;
    href = encodeURIComponent(href);
    window.location.href = `${FRONTEND_DOMAIN}site/direct-weixin-login?backUrl=${href}`;
  }
}
const WeiXinHelper = {
  init: () => init(),
  onMenuShareAppMessage: (title, desc, imgUrl, link, type = '', dataUrl = '') => {
    wx.showAllNonBaseMenuItem();
    // imgUrl = imgUrl == undefined ? baseUrl + 'mobile/images/letu.png' : imgUrl;
    // link = link == undefined ? window.location.href : link;
    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接
      imgUrl, // 分享图标
      type, // 分享类型,music、video或link，不填默认为link
      dataUrl, //  如果type是music或video，则要提供数据链接，默认为空
      success() {
        // 用户确认分享后执行的回调函数
      },
      cancel() {
        // 用户取消分享后执行的回调函数
      },
    });
    const timeLineTitle = `${title}-${desc}`;
    wx.onMenuShareTimeline({
      title: timeLineTitle, // 分享标题
      link, // 分享链接
      imgUrl, // 分享图标
      success() {
        // 用户确认分享后执行的回调函数
      },
      cancel() {
        // 用户取消分享后执行的回调函数
      },
    });
  },
  weiChatLoginByOpenId: () => weiChatLoginByOpenId(),
};
export default WeiXinHelper;
