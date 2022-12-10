import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Note } from "../../../interfaces"

import { addNote, setShowModal } from "../../../store/features"
import { RooState } from "../../../store/store"

interface Props {
	note?: Note
}

const createUpdateNoteContent = ({ note }: Props) => {
	const [newUpdateNote, setNewUpdateNote] = useState<Partial<Note> | null>(null)

	const showModal = useSelector((state: RooState) => state.notes.showModal)
	const dispatch = useDispatch()

	const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewUpdateNote({ ...newUpdateNote, [e.currentTarget.name]: e.currentTarget.value })
	}

	const saveNewNote = () => {
		if (!newUpdateNote?.title && !newUpdateNote?.content) return null
		dispatch(addNote(newUpdateNote as Note))
		dispatch(setShowModal(false))
	}

	return (
		<>
			<h2>Create / Edit Note</h2>
			<div className='nes-field'>
				<label htmlFor='name_field'>Title</label>
				<input type='text' id='name_field' className='nes-input' name='title' onChange={handleChange} />
			</div>
			<label htmlFor='textarea_field'>Content</label>
			<textarea id='textarea_field' className='nes-textarea' name='content' onChange={handleChange} />
			<div className='modal__btns'>
				<button
					type='button'
					className='nes-btn'
					onClick={() => {
						dispatch(setShowModal(!showModal))
					}}
				>
					Cancel
				</button>
				<button type='button' className='nes-btn is-primary' onClick={() => saveNewNote()}>
					Save
				</button>
			</div>
		</>
	)
}

export default createUpdateNoteContent
