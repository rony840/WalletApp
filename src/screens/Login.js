import { StyleSheet, SafeAreaView, View, ScrollView, Image, Text } from 'react-native';
import { FormButton, FormField, Background } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import FormFooter from '../components/FormFooter';
import { Colors } from '../assets/colors/Colors';
import { Formik } from 'formik';
import { LoginSchema } from '../schemas/LoginSchema';
import { authenticateUser } from '../services/UserAPI';
import {UserContext} from '../context/UserContext';
import { useContext, useState } from 'react';

const Login = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext); // To store user data in context
  const [errorMessage, setErrorMessage] = useState('');
  // Handle login
  const handleLogin = async (values) => {
    try {
      // Call the API to authenticate the user
      const response = await authenticateUser(values.username, values.password);
      
      if (response.message === "Authentication successful") {
        // Store user data in context
        setUser({
          firstName: response.user.firstname,
          lastName: response.user.lastname,
          username: response.user.username,
        });

        // Navigate to LoggedIn screen
        navigation.replace('LoggedIn');
      } else {
        setErrorMessage('Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Background Component */}
      <Background />
      <View style={styles.contentContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.headerContainer}>
        <Image 
          source={require('../assets/icons/wallet.png')} 
          style={styles.logo}
        />
        <Text style={styles.companyName}>Wallet Network</Text>
        <Text style={styles.heading}>Login</Text>
      </View>
      <Formik
      initialValues={{username:'',password:''}}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}>

        {({handleChange,handleSubmit,values,errors}) =>(
          <View style={styles.formContainer}>
          <FormField
          title={'Username'}
          placeholder={'johndoe678'}
          onChange={handleChange('username')}
          error={errors.username} 
          />
          <FormField
          title={'Password'}
          placeholder={'* * * * * * *'}
          onChange={handleChange('password')}
          secure={true}
          error={errors.password}
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <FormButton title={'Login'} onPress={handleSubmit}/>
        </View>
        )}
      
      </Formik>
      </ScrollView>
      {/* Footer */}
      <FormFooter title1={"Don't have an account?"} title2={"SignUp"} onPress={() => navigation.replace('Signup')}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Make sure it's transparent to see the background
  },
  headerContainer: {
    position: 'absolute', // Position content above the background
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom:120,
  },
  logo: {
    width: 150,
    height: 150,
    tintColor: Colors.logoColor1,
  },
  companyName:{
    color: Colors.companyName,
    fontWeight:500,
    fontSize: 30,
  },
  heading:{
    marginTop:'5%',
    fontWeight:800,
    color:Colors.headingColor1,
    fontSize: 45,
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
  formContainer: {
    flex: 1,
    marginTop:'100%',
    justifyContent: 'center',
    alignItems:'center'
  },
  scrollViewContent: {
    flexGrow: 1, // Makes the content scrollable
    justifyContent: 'space-between', // Ensures footer stays at the bottom
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Login;

