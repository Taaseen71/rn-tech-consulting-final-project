import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {},
    userData: {},
    isFetching: false,
    failure: false,
    errorMessage: undefined,
    statusCode: undefined,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.userData = action.payload;
    },
    logInUser: (state, action) => {
      state.data = action.payload;
    },
    logOutUser: (state, action) => {
      (state.isFetching = false),
        (state.failure = false),
        (state.errorMessage = undefined),
        (state.statusCode = undefined);
      state.data = {};
    },
    signUpUser: (state, action) => {
      state.data = action.payload;
    },
    request: state => {
      state.isFetching = true;
    },
    success: (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.failure = action.payload?.error ? true : false;
      state.errorMessage = action.payload?.error?.message;
      state.statusCode = action.payload?.error?.statusCode;
    },
    failure: (state, action) => {
      state.isFetching = false;
      state.failure = true;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  logInUser,
  logOutUser,
  signUpUser,
  request,
  success,
  failure,
  setCurrentUser,
} = userSlice.actions; //Export Reducer Functions

export default userSlice.reducer;
