import axios, { AxiosError } from 'axios';
import { Alert } from 'react-native';

interface APIParams {
  controller: string;
  params?: any;
}

function handleAxiosError(err: AxiosError) {
  if (err.response) {
    // Se a resposta de erro existe
    const status = err.response.status;
    const data = err.response.data;
    Alert.alert(`Status: ${status}`, `Data: ${JSON.stringify(data)}`);
  } else if (err.request) {
    // Se a requisição foi feita mas não houve resposta
    Alert.alert('Erro de requisição:', err.request);
  } else {
    // Algo aconteceu durante a configuração da requisição
    Alert.alert('Erro:', err.message);
  }
}

export const api = axios.create({
  baseURL: 'http://192.168.0.24:3000/api/v1/',
});

export const getData = async ({ controller }: APIParams) => {
  try {
    const response = await api.get(controller);
    return response.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      handleAxiosError(err);
    } else {
      Alert.alert(err.message);
    }
  }
};

export const submit = async ({ controller, params }: APIParams) => {
  try {
    const response = await api.post(controller, params);
    return response.data;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      handleAxiosError(err);
    } else {
      Alert.alert(err.message);
    }
  }
};

export const submitMultiPart = async ({ controller, params }: APIParams) => {
  try {
    const response = await api.post(controller, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error", error.message);
  }
};
