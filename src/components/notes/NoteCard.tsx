import { useState } from "react"
import { useDispatch } from "react-redux"
import { CreateUpdateNoteContent } from "."
import { deleteNote, setContentModal, setShowModal } from "../../../store/features"
import { Modal } from "../layout"
interface Note {
	id: string
	title: string
	lastEdited: string
	archived: boolean
	content: string
	// categories: string[]
}

interface Props {
	note: Note
}

type ContentModal = React.ReactNode | React.ReactNode[] | null

const NoteCard = ({ note }: Props) => {
	const dispatch = useDispatch()

	const handleDelete = (id: string, title: string) => {
		dispatch(
			setContentModal(
				<>
					<p>Are you sure you want to delete this note?</p>
					<span className='nes-text is-primary'>{title}</span>
					<div className='modal__btns' style={{ fontSize: "12px" }}>
						<button type='button' className='nes-btn' onClick={() => dispatch(setShowModal(false))}>
							Cancel
						</button>
						<button type='button' className='nes-btn is-error' onClick={() => dispatch(deleteNote(id))}>
							Delete
						</button>
					</div>
				</>
			)
		)
		dispatch(setShowModal(true))
	}

	const handleUpdate = (note: Note) => {
		setContentModal(<CreateUpdateNoteContent note={note} />)
	}

	return (
		<>
			<div className='nes-container is-dark'>
				<div>
					<h3>{note.title}</h3>
					<p>Last edited: {note.lastEdited}</p>
				</div>
				<div className='notes__btns'>
					<button type='button' className='nes-btn is-error' onClick={() => handleDelete(note.id, note.title)}>
						Delete
					</button>
					<button type='button' className='nes-btn is-warning'>
						Archive
					</button>
					<button type='button' className='nes-btn is-success' onClick={() => handleUpdate(note)}>
						Edit
					</button>
				</div>
			</div>
		</>
	)
}

export default NoteCard
