import { configureStore } from "@reduxjs/toolkit"
import { noteReducer } from "./features"

export const store = configureStore({
	reducer: {
		notes: noteReducer,
	},
})

export type RooState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
