import { PreloadedState, configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import { useMemo } from 'react'
import { createWrapper } from 'next-redux-wrapper'
import { adminApi } from '../services/adminApi'

let store: AppState

const initialState = {};

export function makeStore(preloadedState = initialState) {
  return configureStore({
  reducer: {
    auth: authReducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminApi.middleware),
})
}

export const initializeStore = (preloadedState: PreloadedState<RootState>) => {
  let _store = store ?? makeStore(preloadedState)

  if (preloadedState && store) {
    _store = makeStore({ ...store.getState(), ...preloadedState })
  }

  if (typeof window === 'undefined') return _store
  if (!store) store = _store

  return _store
}

export function useStore(initialState: RootState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export type AppState = ReturnType<typeof makeStore>

export type AppDispatch = AppState['dispatch']

export type RootState = ReturnType<AppState['getState']>

export const wrapper = createWrapper<AppState>(makeStore, { debug: false })