import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import socketReducer from './slices/socketSlice'
import chatReducer from './slices/chatSlice'


export const store = configureStore({
  reducer: {
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