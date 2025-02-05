import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native';
import { Background } from '../components/Components';
import TextDisplay from '../components/TextDisplay';
import TransactionButton from '../components/TransactionButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAction } from '../store/slices/userSlice';
import { useEffect } from 'react';

const Logout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user); // Access loading and error states from the Redux store

  useEffect(() => {
    if (!isAuthenticated) {
      Alert.alert('You have been logged out successfully');
      navigation.replace('Login');  // Navigate to the logged-in screen
    }
  }, [isAuthenticated, navigation]); 

  // Function to handle logout
  const handleLogout = async () => {
    try {

      // Clear user data from Redux store
      dispatch(logoutUserAction());

      // Optionally clear any tokens from AsyncStorage or local storage (if used)
      // Example: await AsyncStorage.removeItem('auth_token');
      //console.log('Logout successful:', response);
      
      // Redirect to login screen
      //navigation.replace('Login');  // Replace the current screen with login screen
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <TextDisplay txt={'Are you sure you want to log out?'} />
          <View style={styles.btnCont}>
            <TransactionButton title={'NO'} onPress={() => navigation.goBack()} />
            <TransactionButton title={'YES'} onPress={handleLogout} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Make sure it's transparent to see the background
  },
  contentContainer: {
    position: 'absolute', // Position content above the background
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between', // Ensures footer is at the bottom
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
  bodyContainer: {
    flex: 1,
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCont: {
    marginTop: '20%',
  },
});

export default Logout;
