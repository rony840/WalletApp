import { login,signup } from "./FirebaseClient";
import { Alert } from 'react-native';

export const signUpOnFirebase = async (email, password) => {
  try {
    const user = await signup(email, password);
    console.log('Signed up as:', user.email);
    Alert.alert('Signed up:', user.email);
    return user;
  } 
  catch (error) {
    console.log('Signup failed:', error.message);
    Alert.alert('Signup failed:', error.message);
    throw error;
  }
};

export const loginOnFirebase = async (email, password) => {
  try {
    const user = await login(email, password);
    console.log('Logged in as:', user.email);
    Alert.alert('Logged in:', user.email);
    return user;
  } 
  catch (error) {
    console.log('Login failed:', error.message);
    Alert.alert('Login failed:', error.message);
    throw error;
  }
};