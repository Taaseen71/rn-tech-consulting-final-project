import * as Yup from 'yup';

export const emailAndPasswordCheck = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email Required'),
  password: Yup.string()
    .required('Password Required')
    .min(5, 'Password too short')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      'Minimum eight characters, at least one letter and one number',
    ),
});
export const emailCheck = Yup.object().shape(
  Yup.string().email('Invalid email').required('Email Required'),
);
