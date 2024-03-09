import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';

interface APIParams {
  controller: string
  params?: any;
}
function handleAxiosError (err : AxiosError) {
   Alert.alert(err.response?.status);
   Alert.alert(err.response?.data);
}
export const api = axios.create({
  //baseURL: 'http://192.168.0.31:3000/api/v1/',
  baseURL: 'http://192.168.0.24:3000/api/v1/',
});

export const getData = async ({controller}:APIParams) => {
  try {
    const response = await api.get(controller);
    return response.data;
  } catch (err: any) {
    if(err.isAxiosError) {
      handleAxiosError(err);
    }else{
     Alert.alert(err.message)
    }
  }
};
export const submit = async ({ controller, params }) => {
  try {
    const response = await api.post(controller, params);
    return response.data;
  } catch (err) {
     if(err.isAxiosError) {
       handleAxiosError(err);
     }else{
      Alert.alert(err.message)
     }
  }
};

export const submitMultiPart = async ({ controller, params }) => {
  try {
    const response = await api.post(controller, params, {
      headers : {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.log("Error", error.message)
  }
};
