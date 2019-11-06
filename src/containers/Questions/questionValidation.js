import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required(),
  content: yup.string().required(),
});

export default schema;
