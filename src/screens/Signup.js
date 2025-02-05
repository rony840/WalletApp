import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { signupUserAction } from '../store/slices/userSlice'; // Import signup action
import { FormButton, FormField, Background } from '../components/Components';
import Heading from '../components/Heading';
import FormFooter from '../components/FormFooter';
import { SignupSchema } from '../schemas/SignupSchema';

const Signup = () => {
  const dispatch = useDispatch(); // Redux dispatch hook
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { signup } = useSelector((state) => state.user);

  useEffect(() => {
      if (signup) {
        Alert.alert('User profile created!')
        navigation.replace('Login');  // Navigate to the logged-in screen
      }
    }, [signup, navigation]); // Trigger effect when isAuthenticated changes

  // Handle form submission
  const handleSubmit = (values) => {
    try {
      // Extract values from the form
      const { firstName, lastName, username, email, contact, password } = values;

      // Prepare user data for signup
      const userData = {
        firstname: firstName,
        lastname: lastName,
        username,
        email,
        contact,
        password,
      };

      // Dispatch the signupUserAction to trigger the saga
      dispatch(signupUserAction(userData));

    } catch (error) {
      console.log(error);
      Alert.alert('Error', error.message || 'Something went wrong');
    }
  };

  // Initialize form values for Signup
  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background Component */}
      <Background />
      <View style={[styles.contentContainer, { paddingTop: insets.top }]}>
        <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
          <Heading showWalletIcon={true} heading={'Signup Form'} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Formik
            initialValues={initialValues}  // Setting initial values for Signup
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true} // Enable re-initialization when values change
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.formContainer}>
                <FormField
                  title={'First Name'}
                  placeholder={'John'}
                  onChange={handleChange('firstName')}
                  error={errors.firstName} 
                />
                <FormField
                  title={'Last Name'}
                  placeholder={'Doe'}
                  onChange={handleChange('lastName')}
                  error={errors.lastName} 
                />
                <FormField
                  title={'Username'}
                  placeholder={'johndoe678'}
                  onChange={handleChange('username')}
                  error={errors.username} 
                />
                <FormField
                  title={'Email'}
                  placeholder={'johndoe@example.com'}
                  onChange={handleChange('email')}
                  error={errors.email} 
                />
                <FormField
                  title={'Contact'}
                  placeholder={'+1 123 456 7890'}
                  onChange={handleChange('contact')}
                  error={errors.contact} 
                />
                <FormField
                  title={'Password'}
                  placeholder={'*******'}
                  onChange={handleChange('password')}
                  error={errors.password}
                  secure={true} 
                />
                <FormField
                  title={'Confirm Password'}
                  placeholder={'*******'}
                  onChange={handleChange('confirmPassword')}
                  error={errors.confirmPassword}
                  secure={true} 
                />
                <FormButton title={'Sign Up'} onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
        <FormFooter title1={"Already have an account?"} title2={"Login"} onPress={() => navigation.replace('Login')} />
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
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
    zIndex: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: '25%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});

export default Signup;
