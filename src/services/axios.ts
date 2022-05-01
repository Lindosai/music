import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export default function request(option: AxiosRequestConfig) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: '',
      timeout: 5000
    });

    instance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    }, (e: AxiosError) => {
      return e;
    });

    instance.interceptors.response.use((res: AxiosResponse) => {
      return res.data;
    }, (e: AxiosError) => {
      if (e && e.response) {
        switch (e.response.status) {
          case 400:
            e.message = '请求错误';
            break;
          case 401:
            e.message = '未授权的访问';
            break;
          default:
            e.message = '其他错误信息';
        }
      }
    });

    instance(option).then(res => {
      resolve(res);
    }, e => {
      reject(e);
    });
  });
};
