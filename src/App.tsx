import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import NoteCard from "./components/notes/NoteCard"

import "./App.css"
import { RooState } from "../store/store"
import { Modal } from "./components/layout"
import { getNotes, setContentModal, setShowModal } from "../store/features"
import { CreateUpdateNoteContent, NoNotes } from "./components/notes"

function App() {
	const notes = useSelector((state: RooState) => state.notes)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getNotes())
	}, [])

	const handleAdd = () => {
		dispatch(setContentModal(<CreateUpdateNoteContent />))
		dispatch(setShowModal(!notes.showModal))
	}

	return (
		<>
			<main className='notes'>
				<section className='notes__add'>
					<h1>My Notes</h1>
					<button type='button' className='nes-btn is-primary' onClick={() => handleAdd()}>
						Add note
					</button>
				</section>
				<section className='notes__grid'>
					{!notes.value.length ? (
						<NoNotes />
					) : (
						<>
							{notes.value.map(note => (
								<NoteCard key={note.id} note={note} />
							))}
						</>
					)}
				</section>
			</main>
			<Modal>{notes.contentModal}</Modal>
		</>
	)
}

export default App
