/**
 * Created by zhouchao on 17/1/5.
 */
import { post } from '../utils/Request';

export async function getSignPackage({ url }) {
  return post('index/wei-xin-sign-package', { url });
}

export async function getOpenid({ code }) {
  return post('user/get-openid-by-code', { code });
}
