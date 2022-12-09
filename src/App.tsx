import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import NoteCard from "./components/notes/NoteCard"

import "./App.css"
import { RooState } from "../store/store"

function App() {
	const notes = useSelector((state: RooState) => state.notes.value)

	return (
		<main className='notes'>
			<section className='notes__add'>
				<h1>My Notes</h1>
				<button type='button' className='nes-btn is-primary'>
					Add note
				</button>
			</section>
			<section className='notes__grid'>
				{notes.map(note => (
					<NoteCard key={note.id} note={note} />
				))}
			</section>
		</main>
	)
}

export default App
