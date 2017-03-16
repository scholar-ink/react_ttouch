import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import { API_DOMAIN, REQ_TIME, REQ_TOKEN, REQ_AUTH_TOKEN } from '../constants';

/**
 * 解析json
 * @param response
 */
function parseJSON(response) {
  return response.json();
}

/**
 *
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 *
 * @param data
 * @returns {{data: *}}
 */
const preResponse = (data) => {
  if (data.status === 1) {
    return { data };
  } else {
    throw new Error(data.msg);
  }
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} path       The URL we want to request
 * @param  {object} [postData] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function post(path, postData) {
  Toast.loading('加载中...', 1, () => {});
  
  const requestUrl = API_DOMAIN + path;
  
  const formData = new window.FormData();
  
  postData = { ...postData, time: REQ_TIME, token: REQ_TOKEN, authToken: REQ_AUTH_TOKEN };
  
  Object.keys(postData).forEach((key) => {
    formData.append(key, postData[key]);
  });
  
  const response = await fetch(requestUrl, { method: 'post', body: formData });
  
  checkStatus(response);
  
  const data = await parseJSON(response);
  
  preResponse(data);
  
  return data;
}
/**
 * 上传一个文件至指定地址，返回一个 Promise
 *
 * @param {string} path 请求路径
 * @param {object} file 上传的文件
 * @param {string} name [options] 上传文件的 form input name
 * @param {object} postData [options] 额外需要POST的参数
 * @return {object} 一个包含 data 或 error 的对象
 */
export async function upload(path, file, name = 'file', postData) {
  Toast.loading('上传中...', 1, () => ({}));
  
  const requestUrl = API_DOMAIN + path;
  
  const formData = new window.FormData();
  
  postData = { ...postData, time: REQ_TIME, token: REQ_TOKEN, authToken: REQ_AUTH_TOKEN };
  formData.append(name, file);
  
  Object.keys(postData).forEach((key) => {
    formData.append(key, postData[key]);
  });
  
  const response = await fetch(requestUrl, { method: 'post', body: formData });
  
  checkStatus(response);
  
  const data = await parseJSON(response);
  
  preResponse(data);
  
  return data;
}
