import { StyleSheet, SafeAreaView, View, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { FormButton, FormField, Background } from '../components/Components';
import { useNavigation } from '@react-navigation/native';
import FormFooter from '../components/FormFooter';
import { Formik } from 'formik';
import { UpdateUserSchema } from '../schemas/UpdateUserSchema';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserProfile } from '../services/UserAPI';
import { fetchUserAction, updateUserAction, startLoading, stopLoading, setError } from '../store/slices/userSlice';
import { Colors } from '../assets/colors/Colors';

const EditProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const navigation = useNavigation();

  // Fetch user data once when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoading());
        const response = await fetchUserData(user.username); // Fetch user data
        if (response && response.data) {
          dispatch(fetchUserAction(response.data)); // Store the fetched user data in Redux
        }
      } catch (error) {
        dispatch(setError('Failed to fetch user data'));
        console.error('Error fetching user data:', error);
      } finally {
        dispatch(stopLoading());
      }
    };

    fetchData();
  }, [dispatch, user.username]);

  const handleUpdateProfile = async (values) => {
    try {
      dispatch(startLoading());
      const updatedData = {
        firstname: values.firstName,
        lastname: values.lastName,
        email: values.email,
        contact: values.contact,
        oldPassword: values.oldPassword,
        password: values.newPassword,
      };

      const response = await updateUserProfile(user.username, updatedData);
      if (response.message === 'User profile updated successfully!') {
        dispatch(updateUserAction(updatedData)); // Only update the changed fields
        Alert.alert('Your profile has been updated!');
        navigation.replace('LoggedIn');
      } else {
        console.error('Error updating profile');
      }
    } catch (error) {
      dispatch(setError('Failed to update user data'));
      console.error('Error updating profile:', error);
    } finally {
      dispatch(stopLoading());
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Background />
        <View style={styles.contentContainer}>
          <ActivityIndicator size="large" color={Colors.companyName} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Background />
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Formik
            initialValues={{
              firstName: user?.firstname || '',
              lastName: user?.lastname || '',
              username: user?.username || '',
              email: user?.email || '',
              contact: user?.contact || '',
              oldPassword: '',
              newPassword: '',
              confirmNewPassword: '',
            }}
            validationSchema={UpdateUserSchema}
            onSubmit={handleUpdateProfile}
            enableReinitialize={true} // Ensure the form is reinitialized with the fetched data
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
                <FormField
                  title={'Username'}
                  placeholder={'johndoe678'}
                  onChange={handleChange('username')}
                  value1={values.username}
                  editable={false}
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
