import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile'
import { API_DOMAIN, REQ_TIME, REQ_TOKEN, REQ_AUTH_TOKEN } from '../constants'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  
  const error = new Error(response.statusText);
  
  error.response = response;
  
  throw error;
}

const catchError = (error)=> {
  
  Toast.offline('网络连接失败!!!');
  
  console.log('接口报错----' + error);
  
  return {};
  
};
const preResponse = (data)=>{
  
  if(data.status==1){
    
    return { data };
    
  }else{
  
    Toast.offline(data.msg);
    
    return {}
  }
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} path       The URL we want to request
 * @param  {object} [postData] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function post(path, postData) {
  
  let formData, requestUrl;
  
  Toast.loading('加载中...', 1, () => {});
  
  requestUrl = API_DOMAIN + path;
  
  formData = new FormData();
  
  postData = {...postData, time: REQ_TIME, token: REQ_TOKEN, authToken: REQ_AUTH_TOKEN };
  
  Object.keys(postData).forEach((key)=>formData.append(key, postData[key]));
 
  return fetch(requestUrl, { method: 'post', body: formData })
    .then(checkStatus)
    .then(parseJSON)
    .then(preResponse)
    .catch(catchError);
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
export function upload(path, file, name = 'file', postData) {
  
  let formData, requestUrl;
  
  Toast.loading('上传中...', 1, () => ({}));
  
  formData = new FormData();
  
  requestUrl = API_DOMAIN + path;
  
  postData = {...postData, time: REQ_TIME, token: REQ_TOKEN, authToken: REQ_AUTH_TOKEN };
  
  formData.append(name, file);
  
  Object.keys(postData).forEach((key)=>formData.append(key, postData[key]));
  
  return fetch(requestUrl, { method: 'POST', body: formData })
    .then(checkStatus)
    .then(parseJSON)
    .then(preResponse)
    .catch(catchError);
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(preResponse)
    .catch((data) => ({ data }));
}
