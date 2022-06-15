import Http from '@/axios'
export const login = (url, data) => Http.post(url, data);
export const regist = (url, data) => Http.post(url, data);
export const queryMerchantAccount = (url, data) => Http.get(url, data);
export const modifyMerchantAccount = (url, data) => Http.get(url, data);
export const forgotMerchantAccount = (url, data) => Http.post(url, data);