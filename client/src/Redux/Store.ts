import { configureStore } from '@reduxjs/toolkit'
import BoardSlice from './BoardSlice'

const store = configureStore({
  reducer: {
    boardData:BoardSlice
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store