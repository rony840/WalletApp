import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Background } from '../components/Components';
import TextDisplay from '../components/TextDisplay';
import TransactionButton from '../components/TransactionButton';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { logoutUser } from '../services/UserAPI'; // Import your logout API function

const Logout = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext); // Use context to clear user data

  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Call logout API
      const response = await logoutUser();
      console.log('Logout successful:', response);

      // Clear user data from context
      setUser(null); // This will clear the user data in context

      // Optionally clear any tokens from AsyncStorage or local storage (if used)
      // Example: await AsyncStorage.removeItem('auth_token');

      // Redirect to login screen
      navigation.replace('Login');  // Replace the current screen with login screen
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
