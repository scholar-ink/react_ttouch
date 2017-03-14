/**
 * Created by zhouchao on 17/1/5.
 */
import { getSignPackage, getOpenid } from '../services/weixin'

import Storage from '../utils/Storage'
import { push } from 'dva/routerRedux'
import { Toast } from 'antd-mobile'
import { FRONTEND_DOMAIN } from '../constants'

async function init(){
  
  let {data} = await getSignPackage({url: window.location.href});
  
  let sign = data.data;
  
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
      'chooseWXPay'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  
}

async function weiChatLoginByOpenId() {

  let getQueryString = function(name) {

    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;

  };

  let code = getQueryString('code');
  
  console.log(code);

  console.log(window.location);

  if(code != null){

    let { data } = await getOpenid({code: code});
    
    if (data.status == 1) {

      Storage.set('duanzu-openid', data.data.openid);

      push('/user/login');

    } else {

      Storage.remove('duanzu-openid');

      Toast.fail(data.msg);

    }

  }else{

    let _href = window.location.origin + window.location.pathname;

    window.location.href = FRONTEND_DOMAIN + 'site/direct-weixin-login?backUrl=' + encodeURIComponent(_href);

  }
}

const WeiXinHelper = {
  
  init: ()=>init(),
  onMenuShareAppMessage: (title, desc, imgUrl, link, type = '', dataUrl = '')=>{
  
    wx.showAllNonBaseMenuItem();
  
    // imgUrl = imgUrl == undefined ? baseUrl + 'mobile/images/letu.png' : imgUrl;
    // link = link == undefined ? window.location.href : link;
  
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      type: type, // 分享类型,music、video或link，不填默认为link
      dataUrl: dataUrl, //  如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  
    wx.onMenuShareTimeline({
      title: title + '-' + desc, // 分享标题
      link: link, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
    
  },
  weiChatLoginByOpenId: ()=>weiChatLoginByOpenId()
  
};

export default WeiXinHelper;
