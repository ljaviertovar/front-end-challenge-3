import { useDispatch } from "react-redux"
import { NoteCategogry } from "../../../interfaces"
import {
	archivedNote,
	getNotes,
	getNotesArchived,
	setContentModal,
	setShowModal,
	unarchivedNote,
} from "../../../store/features"
interface Note {
	id: string
	title: string
	lastEdited: string
	archived: boolean
	content: string
	category: NoteCategogry
}

interface Props {
	note: Note
	archiveList: boolean
}

const NoteCard = ({ note, archiveList }: Props) => {
	const dispatch = useDispatch()

	const handleDelete = (id: string, title: string) => {
		dispatch(
			setContentModal({
				type: "delete",
				content: note,
			})
		)
		dispatch(setShowModal(true))
	}

	const handleUpdate = () => {
		dispatch(
			setContentModal({
				type: "update",
				content: note,
			})
		)
		dispatch(setShowModal(true))
	}

	const handleArchive = () => {
		dispatch(archivedNote(note.id))
		dispatch(getNotes())
	}

	const handleUnarchive = () => {
		dispatch(unarchivedNote(note.id))
		dispatch(getNotesArchived())
	}

	return (
		<>
			<div className='nes-container is-dark'>
				<div>
					<h3 className='nes-text is-primary'>{note.title}</h3>
					<p style={{ fontSize: "12px" }}>Last edited: {note.lastEdited}</p>
				</div>
				<div className='notes__btns'>
					{archiveList ? (
						<>
							<button type='button' className='nes-btn is-error' onClick={() => handleDelete(note.id, note.title)}>
								Delete
							</button>
							<button type='button' className='nes-btn is-warning' onClick={() => handleUnarchive()}>
								Unarchive
							</button>
						</>
					) : (
						<>
							<button type='button' className='nes-btn is-error' onClick={() => handleDelete(note.id, note.title)}>
								Delete
							</button>
							<button type='button' className='nes-btn is-warning' onClick={() => handleArchive()}>
								Archive
							</button>
							<button type='button' className='nes-btn is-success' onClick={() => handleUpdate()}>
								Edit
							</button>
						</>
					)}
				</div>
			</div>
		</>
	)
}

export default NoteCard
