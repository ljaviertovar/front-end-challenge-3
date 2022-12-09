import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import api from "../../api"

import { Note } from "../../interfaces"

interface NoteState {
	value: Note[]
}

const initialState: NoteState = {
	value: [
		{
			id: "nota",
			title: "Title note",
			lastEdited: "18/18/10",
			archived: false,
			content: "come coantent",
		},
		{
			id: "nota",
			title: "Title note",
			lastEdited: "18/18/10",
			archived: false,
			content: "come coantent",
		},
	],
}

export const noteSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		getNotes: state => {
			state.value = api.notes.list()
		},
		addNote: (state, action: PayloadAction<Partial<Note>>) => {
			console.log(action.payload)
		},
	},
})

export const { getNotes, addNote } = noteSlice.actions

export default noteSlice.reducer
