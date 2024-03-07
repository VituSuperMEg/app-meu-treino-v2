import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';

export const api = axios.create({
  baseURL: 'http://192.168.0.24:3000/api/v1/',
});

export const getData = async (controller) => {
  try {
    const response = await api.get(controller);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const submit = async ({ controller, params }) => {
  try {
    const response = await api.post(controller, params);
    return response.data;
  } catch (error) {
    console.log(error);
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
