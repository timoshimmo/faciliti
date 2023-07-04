import axios from 'axios';

const instance = axios.create({
  baseURL: `http://132.145.58.252:8081/spaciofm/api/`,
  withCredentials: false,
});

instance.interceptors.request.use(
  async config => {
    let token = localStorage.getItem('spfmtoken');
   // let provider = localStorage.getItem('provider');
   // let tenantId = localStorage.getItem('tenantId');
    let userId = localStorage.getItem('userId');
   // let currentEstateXri = localStorage.getItem('currentEstateXri');
    let tenantSegment = localStorage.getItem('tenantSegment');
    //const adminUser = `admin-${tenantSegment}`;
    //console.log(token);
    //'JAGG66'

    /*
    currentEstateXri
    config.headers = {
      'Authorization': `Bearer ${token}`,
      'provider': 'CRX',
      'tenantId' : 'INJREAM26606',
      'userId' : 'JAGG66'
    }
*/
    config.headers = {
      'Authorization': `Bearer ${token}`,
      'provider': 'CRX',
      'tenant-id' : tenantSegment,
      'user-id' : userId
    }


  /*  config.headers = {
      'Authorization': `Bearer ${token}`,
      'provider': 'CRX',
      'tenant-id' : 'INJREAM26606',
      'user-id' : 'JAGG66',
      'currentEstateXri': currentEstateXri,
    }*/
    return config;
  },
  error => {
    Promise.reject(error)
});

instance.interceptors.response.use((response) => {
  //console.log("AXIOS RESPONSE: " + JSON.stringify(response));
  return response
}, async function (error) {
  //console.log("AXIOS ERROR: " + JSON.stringify(error));
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    //console.log("AXIOS ERROR RESPONSE: " + JSON.stringify(error.response.status));
    //originalRequest._retry = true;
    //const access_token = await refreshAccessToken();
    //axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    //return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default instance;
