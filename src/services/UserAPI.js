import axios from 'axios';

const API_URL = 'https://onyx-goldenrod-eater.glitch.me'; // Replace with your actual backend URL

// Register new user (Sign Up)
export const signUpUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/adduser`, { data: userData });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Authenticate user (Sign In)
export const authenticateUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/authuser`, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch user data for editing profile
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/fetchuser`, { params: { username } });
    console.log('fetchuser response: ',response)
    console.log('fetchuser data response: ',response.data)
    return response.data;
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

// Delete user account
export const deleteUserAccount = async (username) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteuser`, { params: { username } });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Logout (Optional)
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
