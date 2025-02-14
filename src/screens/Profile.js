import { StyleSheet, SafeAreaView, View} from 'react-native';
import { Background } from '../components/Components';
import ProfileCard from '../components/ProfileCard';
import TransactionButton from '../components/TransactionButton';
import { useSelector } from 'react-redux';
import { fetch } from 'react-native-ssl-pinning';

const Profile = () => {
  const user = useSelector((state) => state.user.user); // Fetch user data from Redux state
  const { walletBalance, credit, debit } = user || {}; // Destructuring
  const sslPinning = () => {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "GET",
        timeoutInterval: 10000,
        sslPinning: {
            certs: ["mycert"]
        }
    })
        .then(response => {
            console.log('positive response: ',JSON.stringify(response.bodyString, null, "\t"))
        })
        .catch(err => {
            console.log(`error: ${err}`)
        })
}

const pkPinning = () => {
  fetch("https://publicobject.com", {
      method: "GET",
      timeoutInterval: 10000,
      pkPinning: true,
      sslPinning: {
          certs: ["sha256/OpW2lxrMxKYHMAKUAkTMksl+URfwYNmkQyd8eOoDw/U=",
            "sha256/K7rZOrXHknnsEhUH8nLL4MZkejquUuIvOIr6tCa0rbo=",
            "sha256/C5+lpZ7tcVwmwQIMcRtPbsQtWLABXhQzejna0wHFr8M="]
      }
  })
      .then(response => {
          console.log('positive response: ',JSON.stringify(response.bodyString, null, "\t"))
      })
      .catch(err => {
          console.log(`error: ${err}`)
      })
}



  return (
    <SafeAreaView style={styles.container}>
      {/* Background Component */}
      <Background />
      <View style={styles.contentContainer}>
        <View style={styles.bodyContainer}>
          <ProfileCard bal={walletBalance} cred={credit} deb={debit}/>
          <View style={styles.btnContainer}>
          <TransactionButton title={'Ssl Pinning'} onPress={()=>sslPinning()}/>
          <TransactionButton title={'PK Pinning'} onPress={()=>pkPinning()}/>
          {/* <TransactionButton title={'Load Money'}/>
          <TransactionButton title={'Withdraw Money'}/>
          <TransactionButton title={'Send Money'}/> */}
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
