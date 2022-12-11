import { configureStore } from "@reduxjs/toolkit"

import { noteReducer, modalReducer } from "./features"

export const store = configureStore({
	reducer: {
		notes: noteReducer,
		modals: modalReducer,
	},
})

export type RooState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
