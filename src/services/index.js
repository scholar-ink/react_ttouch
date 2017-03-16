import { post } from '../utils/Request';

export function getCities({ phone, password, code }) {
  return post('index/wiki', { phone, password, code });
}
