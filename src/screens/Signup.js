import { StyleSheet, SafeAreaView, View, ScrollView } from 'react-native';
import { FormButton, FormField, Background } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import Heading from '../components/Heading';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FormFooter from '../components/FormFooter';
import { SignupSchema } from '../schemas/SignupSchema';
import { Formik } from 'formik';
import { signUpUser } from '../services/UserAPI';

const Signup = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  // Handle form submission
  const handleSubmit = async (values) => {
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

      // Make the API call to sign up the user
      const response = await signUpUser(userData);

      // Handle the response (e.g., show success message or navigate)
      if (response && response.message === 'User added successfully!') {
        alert('Your account has been created successfully! Please login using the credentials.');
        navigation.replace('Login'); // Navigate to the login page
      } else {
        console.log(response.message)
        alert('Error1', response.message || 'Something went wrong');
      }
    } catch (error) {
      // Handle errors
      console.log(error)
      alert('Error2', error.message || 'Something went wrong');
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
                  placeholder={'johndoe678'}
                  onChange={handleChange('firstName')}
                  error={errors.firstName} 
                  />
                <FormField
                  title={'Last Name'}
                  placeholder={'johndoe678'}
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
                  placeholder={'johndoe678'}
                  onChange={handleChange('email')}
                  error={errors.email} 
                  />
                <FormField
                  title={'Contact'}
                  placeholder={'johndoe678'}
                  onChange={handleChange('contact')}
                  error={errors.contact} 
                  />
                <FormField
                  title={'Password'}
                  placeholder={'johndoe678'}
                  onChange={handleChange('password')}
                  error={errors.password}
                  secure={true} 
                  />
                <FormField
                  title={'Password'}
                  placeholder={'johndoe678'}
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
