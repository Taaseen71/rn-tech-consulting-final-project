import * as Yup from 'yup';

export const emailAndPasswordCheck = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(5, 'Password too short')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      'Minimum eight characters, at least one letter and one number',
    ),
});
