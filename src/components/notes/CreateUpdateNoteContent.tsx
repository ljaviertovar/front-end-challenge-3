import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Note } from "../../../interfaces"

import { addNote, getNotes, getNotesArchived, setShowModal, updateNote } from "../../../store/features"
import { RooState } from "../../../store/store"
import { NoteCategogry, NoteCategories } from "../../../interfaces/notes-interface"

interface Props {
	note?: Note
	archiveList: boolean
	category: NoteCategories
}

const INITIAL_NOTE: Partial<Note> = {
	title: "",
	content: "",
	category: "Unclassified",
}

const CATEGORIES: NoteCategogry[] = ["Unclassified", "Develop", "Planning", "Idea"]

const createUpdateNoteContent = ({ note, archiveList, category }: Props) => {
	const [newUpdateNote, setNewUpdateNote] = useState<Note>(INITIAL_NOTE as Note)
	const [typeCategory, setTypeCategory] = useState<NoteCategogry>(note ? note.category : CATEGORIES[0])

	const showModal = useSelector((state: RooState) => state.modals.showModal)
	const dispatch = useDispatch()

	useEffect(() => {
		note && setNewUpdateNote(note)
	}, [note])

	const handleChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setNewUpdateNote({ ...newUpdateNote, [e.currentTarget.name]: e.currentTarget.value })
	}

	const handleCategory = (e: React.FormEvent<HTMLSelectElement>) => {
		const category: NoteCategogry = e.currentTarget.value as NoteCategogry
		setTypeCategory(category)
		setNewUpdateNote({ ...newUpdateNote, category })
	}

	const saveNote = (e: React.SyntheticEvent) => {
		e.preventDefault()

		if (!newUpdateNote?.title && !newUpdateNote?.content) return null

		if (note?.id) dispatch(updateNote(newUpdateNote as Note))
		else dispatch(addNote(newUpdateNote as Note))

		console.log({ category })

		if (archiveList) dispatch(getNotesArchived(category))
		else dispatch(getNotes(category))

		dispatch(setShowModal(false))
	}

	return (
		<form onSubmit={saveNote}>
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
			<label htmlFor='default_select'>Category</label>
			<div className='nes-select'>
				<select required id='default_select' onChange={handleCategory}>
					<option value={typeCategory} disabled selected hidden>
						{typeCategory}
					</option>
					{CATEGORIES.map((category: NoteCategogry) => (
						<option value={category}>{category}</option>
					))}
				</select>
			</div>
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
				<button type='submit' className='nes-btn is-primary'>
					{note?.id ? "update" : "Save"}
				</button>
			</div>
		</form>
	)
}

export default createUpdateNoteContent
