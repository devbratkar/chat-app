import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import socketReducer from './slices/socketSlice'
import chatReducer from './slices/chatSlice'
import userReducer from './slices/userSlice'
import errorReducer from './slices/errorSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    socket: socketReducer,
    chat: chatReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const ReduxProvider = ({ children }: { children: JSX.Element }) => (
  <Provider store={store}>
    {children}
  </Provider>
)