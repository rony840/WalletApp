import { StyleSheet, SafeAreaView, View, ScrollView, ActivityIndicator } from 'react-native';
import { FormButton, FormField, Background } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import FormFooter from '../components/FormFooter';
import { Formik } from 'formik';
import { UpdateUserSchema } from '../schemas/UpdateUserSchema';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { fetchUserData, updateUserProfile } from '../services/UserAPI';

const EditProfile = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  const { user } = useContext(UserContext); // Get logged-in user from context
  const [initialValues, setInitialValues] = useState({
    firstName: 'abc',
    lastName: '',
    username: '',
    email: '',
    contact: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [loading, setLoading] = useState(true); // Loading state to wait for data fetch
  console.log('initial form values1: ',initialValues)
  useEffect(() => {
    // Fetch user data when the screen loads
    const fetchData = async () => {
      try {
        const response = await fetchUserData(user.username); // Assuming user.username is available in the context
        console.log('fetchuser response in edit: ', response);
        if (response && response.data) {
          setInitialValues({
            firstName: response.data.firstname,
            lastName: response.data.lastname,
            username: user.username,  // The username should be non-editable
            email: response.data.email,
            contact: response.data.contact,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          });
        }
        alert('data fetched!')
        console.log('initial form values2: ',initialValues)
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [user.username]); // Re-run this effect if username changes

  // Handle form submission
  const handleUpdateProfile = async (values) => {
    try {
      const updatedData = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        contact: values.contact,
        oldPassword: values.oldPassword,
        password: values.newPassword,
      };
      console.log('updated data in edit: ', updatedData);
      console.log('username:', user.username);
      // Call API to update profile
      const response = await updateUserProfile(user.username, updatedData);
      console.log('message after update: ',response.message)
      if (response.message === 'User profile updated successfully!') {
        setUser({
          firstName: values.firstName,
          lastName: values.lastName,})
        
        // Navigate to the logged-in screen after updating
        navigation.replace('LoggedIn');
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // If data is still loading, show a loading indicator
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Background />
        <View style={styles.contentContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Component */}
      <Background />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Formik
            initialValues={initialValues} // Setting initial values for the form
            validationSchema={UpdateUserSchema}
            onSubmit={handleUpdateProfile}
            enableReinitialize={false} // Enable re-initialization when values change
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <View style={styles.formContainer}>
                <FormField
                  title={'First Name'}
                  placeholder={'John'}
                  onChange={handleChange('firstName')}
                  value1={values.firstName}
                  error={errors.firstName}
                />
                <FormField
                  title={'Last Name'}
                  placeholder={'Doe'}
                  onChange={handleChange('lastName')}
                  value1={values.lastName}
                  error={errors.lastName}
                />
                {/* Disable username field */}
                <FormField
                  title={'Username'}
                  placeholder={'johndoe678'}
                  onChange={handleChange('username')}
                  value1={values.username}
                  editable={false}  // Make the username field non-editable
                  error={errors.username}
                />
                <FormField
                  title={'Email'}
                  placeholder={'johndoe@gmail.com'}
                  onChange={handleChange('email')}
                  value1={values.email}
                  error={errors.email}
                />
                <FormField
                  title={'Contact'}
                  placeholder={'1234567890'}
                  onChange={handleChange('contact')}
                  value1={values.contact}
                  error={errors.contact}
                />
                <FormField
                  title={'Old Password'}
                  placeholder={'********'}
                  onChange={handleChange('oldPassword')}
                  value1={values.oldPassword}
                  error={errors.oldPassword}
                  secure={true}
                />
                <FormField
                  title={'New Password'}
                  placeholder={'********'}
                  onChange={handleChange('newPassword')}
                  value1={values.newPassword}
                  error={errors.newPassword}
                  secure={true}
                />
                <FormField
                  title={'Confirm New Password'}
                  placeholder={'********'}
                  onChange={handleChange('confirmNewPassword')}
                  value1={values.confirmNewPassword}
                  error={errors.confirmNewPassword}
                  secure={true}
                />
                <FormButton title={'Update Profile'} onPress={handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
        <FormFooter title1={'Changed your mind?'} title2={'Go back!'} onPress={() => navigation.replace('LoggedIn')} />
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

export default EditProfile;
