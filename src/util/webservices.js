import axios from 'axios';

const instance = axios.create({
  baseURL: `http://140.238.127.236:8081/spaciofm/api/`,
  withCredentials: false,
});

instance.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('spfmtoken');
    let provider = localStorage.getItem('provider');
    let tenantId = localStorage.getItem('tenantId');
    let userId = localStorage.getItem('userId');
    //console.log(token);

    config.headers = {
    'Authorization': `Bearer ${token}`,
    'provider': 'CRX',
    'tenantId' : 'INJREAM26606',
    'userId' : 'JAGG66'

  }
    return config;
  },
  error => {
    Promise.reject(error)
});

export default instance;
