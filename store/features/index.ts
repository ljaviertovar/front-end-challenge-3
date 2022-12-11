import { getNotes, addNote, updateNote, deleteNote, archivedNote, getNotesArchived, unarchivedNote } from "./note-slice"
import { setShowModal, setContentModal } from "./modal-slice"

export { default as noteReducer } from "./note-slice"
export { default as modalReducer } from "./modal-slice"

export {
	getNotes,
	addNote,
	updateNote,
	deleteNote,
	setShowModal,
	setContentModal,
	archivedNote,
	getNotesArchived,
	unarchivedNote,
}
