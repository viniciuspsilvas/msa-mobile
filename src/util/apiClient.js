import React from 'react'
import axios from 'axios'
import { BACKEND_URL } from 'react-native-dotenv'

export const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    timeout: 15000,
});