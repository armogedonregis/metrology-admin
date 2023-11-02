import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { IUser } from '../../types/user'

type AuthState = {
  user: IUser | undefined
  token: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: typeof window !== 'undefined' ? window.localStorage.getItem('token') : null,
    user: undefined
  } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCredentialsNull: (state: AuthState) => {
      state.token = null
      window.localStorage.clear();
    },
  },
})

export const { setCredentials, setCredentialsNull, setUser } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.token
