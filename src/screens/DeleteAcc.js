import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Background } from '../components/Components';
import TextDisplay from '../components/TextDisplay';
import TransactionButton from '../components/TransactionButton';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // User context to clear user data
import { deleteUserAccount } from '../services/UserAPI'; // API call to delete user account

const DeleteAcc = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext); // Access the user data from context

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      // Call the delete user API
      const response = await deleteUserAccount(user.username);
      console.log('Delete Account Response:', response);

      // Clear user data from context (log out the user)
      setUser(null);

      // Optionally, clear any tokens from AsyncStorage if used
      // await AsyncStorage.removeItem('auth_token'); // If you're storing tokens

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
