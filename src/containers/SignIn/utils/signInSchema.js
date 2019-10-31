import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('mast be a valid email')
    .required('email is required'),
  password: yup
    .string()
    .matches(/^[a-z0-9]+$/, 'password must contain both characters and numbers')
    .min(8, 'password must be at least 8 characters')
    .required('password is required'),
});

export default schema;
