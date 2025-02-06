import axios from 'axios';

const API_URL = 'https://onyx-goldenrod-eater.glitch.me'; // Replace with your actual backend URL

import { post, get, put, del } from './ClientAPI';

export const signUpUser = async (userData) => {
  try {
    const response = await post('/adduser', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const authenticateUser = async (username, password) => {
  try {
    console.log('username and pass: ',username, password)
    const response = await post('/authuser', { username, password });
    return response;
  } catch (error) {
    throw error;
  }
};

/// Example usage of GET request
export const fetchUserData = async (username) => {
  try {
    const response = await get('/fetchuser', { username });
    return response;
  } catch (error) {
    throw error;
  }
};

// Update user profile
export const updateUserProfile = async (username, updatedData) => {
  try {
    console.log('username in api:',username)
    console.log('updated data in api:',updatedData)
    // Sending the username and updatedData in the correct format
    const response = await axios.put(`${API_URL}/updateuser`, {
        username: username, 
        updatedData: updatedData
      });
    console.log('respone for update:',response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

// // Example usage of PUT request
// export const updateUserProfile = async (username, updatedData) => {
//   try {
//     const response = await put('/updateuser', { username, updatedData });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// Example usage of DELETE request
export const deleteUserAccount = async (username) => {
  try {
    const response = await del('/deleteuser', { username });
    return response;
  } catch (error) {
    throw error;
  }
};

// Example usage of logout request
export const logoutUser = async () => {
  try {
    const response = await post('/logout');
    return response;
  } catch (error) {
    throw error;
  }
};