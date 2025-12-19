import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  name: string | null;
  isLoggedIn: boolean;
};


// just defined initial user state will update it later 

const initialState: UserState = {
  name: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
