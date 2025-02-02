import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { FormButton, FormField, Background } from '../components/Components';
//import { useNavigation } from '@react-navigation/native';
//import { Formik } from 'formik';

const Signup = () => {

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Background Component */}
      <Background />
      
      <View style={styles.logoContainer}>
      </View>
      <View style={styles.contentContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.formContainer}>
            <FormField
            title={'Email'}
            placeholder={'johndoe@example.com'}
            onChange={()=>{}}
            
            />
            <FormField
            title={'Password'}
            placeholder={'* * * * * * *'}
            onChange={()=>{}}
           
            />
            <FormButton title={'Login'} onPress={()=>{}}/>
          </View>
      </ScrollView>
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
  header: {
    marginTop:"90%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50, // Adjust for spacing between header and form
  },
  formContainer: {
    flex: 1,
    marginTop:'-5%',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1, // Makes the content scrollable
    justifyContent: 'space-between', // Ensures footer stays at the bottom
  },
});

export default Signup;

