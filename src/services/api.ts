import  axios from 'axios';

interface IAxios {
  controller : string;
  params?: any;
}
export const api = axios.create({
  baseURL : 'http://192.168.18.56:3000/api/v1/'
});

export const getData = async (controller : IAxios) => {
  try {
    const response = await api.get(`${controller}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export const submit = async ({
   controller,
   params
}:IAxios) => {
  try {
    const response = await api.post(`${controller}`, 
      params
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}