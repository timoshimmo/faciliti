import axios from 'axios';

const instance = axios.create({
  baseURL: `http://140.238.127.236:8081/spaciofm/api/`,
  withCredentials: false,
});

instance.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('spfmtoken');
    console.log(token);

    config.headers = {
    'Authorization': `Bearer ${token}`
  }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default instance;
