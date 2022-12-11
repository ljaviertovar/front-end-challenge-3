import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Note } from "../../../interfaces"

import { addNote, setShowModal, updateNote } from "../../../store/features"
import { RooState } from "../../../store/store"

interface Props {
	note?: Note
}

const INITIAL_NOTE = {
	title: "",
	content: "",
}

const createUpdateNoteContent = ({ note }: Props) => {
	const [newUpdateNote, setNewUpdateNote] = useState<Note>(INITIAL_NOTE as Note)

	const showModal = useSelector((state: RooState) => state.modals.showModal)
	const dispatch = useDispatch()

	useEffect(() => {
		note && setNewUpdateNote(note)
	}, [note])

	const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewUpdateNote({ ...newUpdateNote, [e.currentTarget.name]: e.currentTarget.value })
	}

	const saveNote = () => {
		if (!newUpdateNote?.title && !newUpdateNote?.content) return null

		if (note?.id) dispatch(updateNote(newUpdateNote as Note))
		else dispatch(addNote(newUpdateNote as Note))

		dispatch(setShowModal(false))
	}

	return (
		<>
			<h2>Create / Edit Note</h2>
			<div className='nes-field'>
				<label htmlFor='name_field'>Title</label>
				<input
					type='text'
					id='name_field'
					className='nes-input'
					name='title'
					value={newUpdateNote.title}
					onChange={handleChange}
				/>
			</div>
			<label htmlFor='textarea_field'>Content</label>
			<textarea
				id='textarea_field'
				className='nes-textarea'
				name='content'
				value={newUpdateNote.content}
				onChange={handleChange}
			/>
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
				<button type='button' className='nes-btn is-primary' onClick={() => saveNote()}>
					{note?.id ? "update" : "Save"}
				</button>
			</div>
		</>
	)
}

export default createUpdateNoteContent
