// ClientAPI.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://onyx-goldenrod-eater.glitch.me',
  headers: {
    'Content-Type': 'application/json',
  },//can use interceptor here to add custom header for eg  auth token inside header after login
});

// POST request
export const post = async (endpoint, data) => {
  try {
    console.log("printing data param", data)
    const response = await axiosInstance.post(endpoint,  {data});
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// GET request
export const get = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// PUT request
export const put = async (endpoint, data) => {
    console.log('data in put: ',data)
  try {
    const response = await axiosInstance.put(endpoint, {data});
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE request
export const del = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.delete(endpoint, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};