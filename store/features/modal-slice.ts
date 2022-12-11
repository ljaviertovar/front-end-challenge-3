import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { Note } from "../../interfaces/notes-interface"
import ContentModal from "../../src/components/notes/ContentModal"

type ContentModal = {
	type: "add" | "update" | "delete" | "no-content"
	content?: Note
}

interface ModalState {
	showModal: boolean
	contentModal: ContentModal
}

const initialState: ModalState = {
	showModal: false,
	contentModal: { type: "no-content" },
}

export const modalSlice = createSlice({
	name: "modal-slice",
	initialState,
	reducers: {
		setShowModal: (state, action: PayloadAction<boolean>) => {
			state.showModal = action.payload
		},
		setContentModal: (state, action: PayloadAction<ContentModal>) => {
			state.contentModal = action.payload
		},
	},
})

export const { setShowModal, setContentModal } = modalSlice.actions

export default modalSlice.reducer
