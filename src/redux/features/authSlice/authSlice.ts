import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  email: string;
  role: string;
  id: string;
}

interface UserInfo {
  name: string;
  phone: string;
  profileImage: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  user: User | null;
  userInfo: UserInfo | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  accessToken: null,
  user: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: { email: string; role: string; id: string };
      }>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    setuserInfo: (
      state,
      action: PayloadAction<{
        accessToken: string;
        users: { name: string; phone: string; profileImage: string };
      }>
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.users;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setUser, setuserInfo, logout } = authSlice.actions;

export default authSlice.reducer;
