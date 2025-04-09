import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Login method
export const login = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    console.log('User signed in:', userCredential.user);
    return userCredential.user;
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    } else if (error.code === 'auth/wrong-password') {
      console.log('Incorrect password!');
    } else if (error.code === 'auth/user-not-found') {
      console.log('No user found with this email!');
    } else {
      console.error(error);
    }
    throw error; 
  }
};

// Signup method
export const signup = async (email, password, userData) => {
  try {
    // Step 1: Create the user with Firebase Authentication
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    // Check if the signup was successful
    if (!userCredential || !userCredential.user) {
      throw new Error('User signup failed');
    }

    const { user, additionalUserInfo } = userCredential;

    // Step 2: Prepare user data to store in Firestore
    const userDocData = {
      uid: user.uid, // Firebase User ID
      email: user.email, // Store email
      firstname: userData.firstname,
      lastname: userData.lastname,
      contact: userData.contact,
      username: userData.username,
      createdAt: firestore.FieldValue.serverTimestamp(), // Timestamp for when user was created
      providerId: additionalUserInfo?.providerId || "email/password",
      walletBalance: 1000,
      credit: 200,
      debit: 50,
    };

    // Step 3: Store user data in Firestore under 'users' collection, with email as the document ID
    await firestore().collection('users').doc(user.email).set(userDocData);

    console.log('User created and data saved to Firestore:', userDocData);

    return userDocData;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    } else if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    } else {
      console.error(error);
    }
    console.error('Signup failed:', error.message);
    throw error;
  }
};

