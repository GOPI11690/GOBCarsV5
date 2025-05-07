import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isCheckingUserAuthenticated: true,
    isUserAuthenticated: false,
    loading: false,
    error: null
  },
  reducers: {
    loginStart(state) {
      (state.loading = true), (state.error = null)
    },
    loginSuccessful(state, action) {
      (state.user = action.payload),
        (state.isCheckingUserAuthenticated = false),
        (state.isUserAuthenticated = true),
        (state.loading = false)
    },
    loginFailed(state, action) {
      (state.loading = false), (state.isCheckingUserAuthenticated = false)
      state.error = action.payload
    },
    logout(state) {
      (state.user = null),
        (state.isCheckingUserAuthenticated = true),
        (state.isUserAuthenticated = false),
        (state.loading = false),
        (state.error = null)
    }
  }
})

export const {
  loginStart,
  loginSuccessful,
  loginFailed,
  logout
} = userSlice.actions




export default userSlice.reducer;

