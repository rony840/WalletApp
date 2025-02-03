import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
    username: yup
    .string()
    .min(3,({min})=>`must have atleast ${min} characters`)
    .required('Enter a Valid Username'),
    password: yup
    .string()
    .min(6,({min})=>`must have atleast ${min} characters`)
    .required('Please enter the password!'),
});