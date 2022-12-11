import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import api from "../../api"

import { Note } from "../../interfaces"

interface NoteState {
	value: Note[]
}

const initialState: NoteState = {
	value: [],
}

export const noteSlice = createSlice({
	name: "note-slice",
	initialState,
	reducers: {
		getNotes: state => {
			state.value = api.notes.list()
		},
		getNotesArchived: state => {
			state.value = api.notes.listArchived()
		},
		addNote: (state, action: PayloadAction<Note>) => {
			const newNote = api.notes.add(action.payload)
			state.value.push(newNote as Note)
		},
		updateNote: (state, action: PayloadAction<Note>) => {
			const updatedNote = api.notes.update(action.payload) as Note
			if (updatedNote.id) {
				state.value = state.value.map((note: Note) => {
					if (note.id === updatedNote.id) {
						return updatedNote
					}
					return note
				})
			}
		},
		deleteNote: (state, action: PayloadAction<string>) => {
			const noteDeleted = api.notes.delete(action.payload)
			state.value = state.value.filter((note: Note) => note.id !== noteDeleted)
		},
		archivedNote: (state, action: PayloadAction<string>) => {
			const updatedNote = api.notes.archive(action.payload) as Note
			if (updatedNote.id) {
				state.value = state.value.map((note: Note) => {
					if (note.id === updatedNote.id) {
						return updatedNote
					}
					return note
				})
			}
		},
		unarchivedNote: (state, action: PayloadAction<string>) => {
			const updatedNote = api.notes.unarchive(action.payload) as Note
			if (updatedNote.id) {
				state.value = state.value.map((note: Note) => {
					if (note.id === updatedNote.id) {
						return updatedNote
					}
					return note
				})
			}
		},
	},
})

export const { getNotes, addNote, updateNote, deleteNote, archivedNote, getNotesArchived, unarchivedNote } =
	noteSlice.actions

export default noteSlice.reducer
