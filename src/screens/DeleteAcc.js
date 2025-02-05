import { StyleSheet, SafeAreaView, View, Alert } from 'react-native';
import { Background } from '../components/Components';
import TextDisplay from '../components/TextDisplay';
import TransactionButton from '../components/TransactionButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAction } from '../store/slices/userSlice';
import { useEffect } from 'react';

const DeleteAcc = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {user,isAuthenticated} = useSelector((state) => state.user); 

  useEffect(() => {
      if (!isAuthenticated) {
        Alert.alert('Your Account has been Deleted successfully');
        navigation.replace('Login');  // Navigate to the logged-in screen
        console.log('user state in delete:',user)
      }
    }, [isAuthenticated, navigation]); 

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserAction({ username: user.username })); 
    } catch (error) {
      console.error('Error deleting account:', error);
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
