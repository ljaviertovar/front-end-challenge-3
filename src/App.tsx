import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import NoteCard from "./components/notes/NoteCard"

import "./App.css"
import { RooState } from "../store/store"
import { Modal } from "./components/layout"
import { getNotes, getNotesArchived, setContentModal, setShowModal } from "../store/features"
import { NoNotes } from "./components/notes"
import ContentModal from "./components/notes/ContentModal"
import { Note } from "../interfaces/notes-interface"

function App() {
	const [archiveList, setArchiveList] = useState(false)

	const notes = useSelector((state: RooState) => state.notes)
	const modals = useSelector((state: RooState) => state.modals)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getNotes())
	}, [])

	const handleAdd = () => {
		dispatch(
			setContentModal({
				type: "add",
			})
		)
		dispatch(setShowModal(!modals.showModal))
	}

	const handleList = () => {
		dispatch(getNotes())
		setArchiveList(false)
	}

	const handleArchivedList = () => {
		dispatch(getNotesArchived())
		setArchiveList(true)
	}

	return (
		<>
			<main className='notes'>
				<section className='notes__add'>
					<h1>My Notes</h1>
					<button type='button' className='nes-btn is-primary' onClick={() => handleAdd()}>
						Add note
					</button>
					{archiveList ? (
						<button type='button' className='nes-btn' onClick={() => handleList()}>
							See Notes
						</button>
					) : (
						<button type='button' className='nes-btn' onClick={() => handleArchivedList()}>
							See Archived
						</button>
					)}
				</section>
				<section className='notes__grid'>
					{!notes.value.length ? (
						<NoNotes archiveList={archiveList} />
					) : (
						<>
							{notes.value.map(note => (
								<NoteCard key={note.id} note={note} archiveList={archiveList} />
							))}
						</>
					)}
				</section>
			</main>
			<Modal>
				<ContentModal />
			</Modal>
		</>
	)
}

export default App
