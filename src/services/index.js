import { post } from '../utils/Request';

export async function getCities({ phone, password, code }) {
  
  return post('index/wiki',{phone: phone, password: password, code: code});
  
}
