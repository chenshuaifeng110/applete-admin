
import Http from '@/axios'
export const sendVerifiyMsg = (url, data) => Http.get(url, data);
export const weather = (url, data) => Http.post(url, data);
export const  advert = (url, data) => Http.get(url, data);