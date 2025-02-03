import * as yup from 'yup';

export const SignupSchema = yup.object().shape({
    firstName: yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   lastName: yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
  username: yup
    .string()
    .min(3, ({ min }) => `Must have at least ${min} characters`)
    .required('Enter a valid username'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter the email!'),
  contact: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Enter a valid 10 digit number')
    .required('Please enter the contact'),
  password: yup
    .string()
    .min(6, ({ min }) => `Must have at least ${min} characters`)
    .required('Please enter the password!'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});
