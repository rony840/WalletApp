import { StyleSheet, SafeAreaView, View, Text} from 'react-native';
import { Background } from '../components/Components';
import Heading from '../components/Heading';
import { Colors } from '../assets/colors/Colors';

const ProfileCard = (props) => {
 const {bal,cred, deb} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.greetTxt}>
        Good Morning!
      </Text>
      <Text style={styles.subTitle}>
        Your Wallet Balance:
      </Text>
      <View style={styles.moneyCont}>
      <Text style={styles.balance}>
        {'$'+(bal||'NA')}
      </Text>
        <View style={styles.moneyFlowCont}>
        <Text style={styles.credit}>
        {'$ +'+(cred||'NA')}
      </Text>
      <Text style={styles.debit}>
      {'$ -'+(deb||'NA')}
      </Text>
        </View>
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.companyName,
    borderRadius:30,
    height: '50%',
    width:'100%',
    padding:20,
  },
  subTitle:{
    fontSize:25,
    color:Colors.appBackground,
    fontWeight:500,
  },
  greetTxt:{
    fontSize:30,
    color:Colors.appBackground,
    fontWeight:900,
    marginBottom: 50,
  },
  moneyCont:{
    marginTop:5,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  balance:{
    fontSize:40,
    color:Colors.appBackground,
    fontWeight:900,
  },
  credit:{
    fontSize:20,
    color:'green',
    fontWeight:400,
  },
  debit:{
    fontSize:20,
    color:'red',
    fontWeight:400,
  },

});

export default ProfileCard;
