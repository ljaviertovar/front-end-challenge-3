import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"

import api from "../../api"

import { Note } from "../../interfaces"

interface NoteState {
	value: Note[]
	showModal: boolean
	contentModal: React.ReactNode | React.ReactNode[] | null
}

const initialState: NoteState = {
	value: [],
	showModal: false,
	contentModal: null,
}

export const noteSlice = createSlice({
	name: "notes",
	initialState,
	reducers: {
		getNotes: state => {
			state.value = api.notes.list()
		},
		addNote: (state, action: PayloadAction<Note>) => {
			const today = new Date()
			const newNote = {
				...action.payload,
				id: uuid(),
				lastEdited: `${today.getDay()}/${today.getMonth()}/${today.getFullYear()}`,
			}

			localStorage.setItem("notes", JSON.stringify([...state.value, newNote]))

			state.value.push(newNote)
		},
		deleteNote: (state, action: PayloadAction<string>) => {
			const notes = api.notes.delete(action.payload)
			state.value = notes
		},
		setShowModal: (state, action: PayloadAction<boolean>) => {
			state.showModal = action.payload
		},
		setContentModal: (state, action: PayloadAction<React.ReactNode | React.ReactNode[] | null>) => {
			state.contentModal = action.payload
		},
	},
})

export const { getNotes, addNote, deleteNote, setShowModal, setContentModal } = noteSlice.actions

export default noteSlice.reducer
