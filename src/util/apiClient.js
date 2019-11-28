import React from 'react'
import axios from 'axios'
import { BACKEND_URL } from 'react-native-dotenv'
import { AsyncStorage } from 'react-native';

export const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 15000,
});
 
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    AsyncStorage.getItem('authToken').then((authToken) => {
        if (authToken)
            config.headers.Authorization = `Bearer ${authToken}`;
    })

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

getData = async () => {
    try {
        return await AsyncStorage.getItem('authToken')
    } catch (e) {
        console.error(e)
        return null;
    }
}

