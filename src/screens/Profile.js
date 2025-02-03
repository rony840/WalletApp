import { StyleSheet, SafeAreaView, View} from 'react-native';
import { Background } from '../components/Components';
import ProfileCard from '../components/ProfileCard';
import TransactionButton from '../components/TransactionButton';

const Profile = () => {

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Component */}
      <Background />
      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <ProfileCard/>
          <View style={styles.btnContainer}>
          <TransactionButton title={'Load Money'}/>
          <TransactionButton title={'Withdraw Money'}/>
          <TransactionButton title={'Send Money'}/>
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
    marginTop: '5%',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: '15%',
    alignItems: 'center',
  },
});

export default Profile;
