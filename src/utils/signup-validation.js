import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('required field'),
  email: yup
    .string()
    .email('Wrong Email')
    .required('required field'),
  password: yup
    .string()
    .matches(/^[a-z0-9]+$/, 'Enter string and number')
    .min(8, 'Enter least 8 characters')
    .required('required field'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password must match'),
});

export default schema;
