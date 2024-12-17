export const authTokenSelector = (state) => state.auth.token;
export const authUserSelector = (state) => state.auth.user;
export const authErrorSelector = (state) => state.auth.error;
export const getProfileState = (state) => state.auth.getProfileState;
