import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native';
import { Background } from '../components/Components';
import TextDisplay from '../components/TextDisplay';
import TransactionButton from '../components/TransactionButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction } from '../store/slices/userSlice';
import { deleteUserAccount } from '../services/UserAPI'; // API call to delete user account

const DeleteAcc = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Access user data from Redux store

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      // Call the delete user API
      const response = await deleteUserAccount(user.username);
      console.log('Delete Account Response:', response);

      // Clear user data from Redux store (log out the user)
      dispatch(deleteUserAction()); // Dispatch the logout action to clear user data

      // Optionally, clear any tokens from AsyncStorage if used
      // await AsyncStorage.removeItem('auth_token'); // If you're storing tokens
      Alert.alert('Your account has been deleted Successfully!')
      // Redirect to the login screen after successful deletion
      navigation.replace('Login'); // Navigate to the login screen
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle any error (e.g., show an error message)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <TextDisplay txt={'Are you sure you want to delete this account?'} />
          <View style={styles.btnCont}>
            <TransactionButton title={'NO'} onPress={() => navigation.goBack()} />
            <TransactionButton title={'YES'} onPress={handleDeleteAccount} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
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

export default DeleteAcc;
