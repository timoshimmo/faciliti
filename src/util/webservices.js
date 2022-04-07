import axios from 'axios';

const instance = axios.create({
  baseURL: `http://140.238.127.236:8081/spaciofm/api/`,
  withCredentials: false,
});

instance.interceptors.request.use(
  async config => {
    let token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi1UZXN0MjUiLCJpc0FkbWluIjp0cnVlLCJleHAiOjE2NDkyNzc2OTcsImlhdCI6MTY0OTI3NzA5N30.7kU8vj_IbUkdY1p_i6KfgpuqMmDxwZzb7WgbrbxF5-bly3U31amMn2wdixKxkAku6V6Hrq2vgzfaU1zBD9t7cw';
    config.headers = {
    'Authorization': `Bearer ${token}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': false,
  }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default instance;
