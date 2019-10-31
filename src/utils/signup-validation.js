import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  password: yup
    .string('password must be string')
    .matches(/^[a-z0-9]+$/, 'password should contain from letters and numbers')
    .min(8, 'password should be at least 8 characters')
    .required('password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export default schema;
