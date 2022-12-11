import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import NoteCard from "./components/notes/NoteCard"

import "./App.css"
import { RooState } from "../store/store"
import { Modal } from "./components/layout"
import { getNotes, getNotesArchived, setContentModal, setShowModal } from "../store/features"
import { NoNotes } from "./components/notes"
import ContentModal from "./components/notes/ContentModal"
import { NoteCategories } from "../interfaces"

const CATEGORIES: NoteCategories[] = ["All Categories", "Develop", "Planning", "Idea", "Unclassified"]

function App() {
	const [archiveList, setArchiveList] = useState(false)
	const [typeCategory, setTypeCategory] = useState<NoteCategories>(CATEGORIES[0])

	const notes = useSelector((state: RooState) => state.notes)
	const modals = useSelector((state: RooState) => state.modals)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getNotes(typeCategory))
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
		dispatch(getNotes(typeCategory))
		setArchiveList(false)
	}

	const handleArchivedList = () => {
		dispatch(getNotesArchived(typeCategory))
		setArchiveList(true)
	}

	const handleCategory = (e: React.FormEvent<HTMLSelectElement>) => {
		const category: NoteCategories = e.currentTarget.value as NoteCategories
		setTypeCategory(category)
		if (archiveList) dispatch(getNotesArchived(category))
		else dispatch(getNotes(category))
	}

	return (
		<>
			<main className='notes'>
				<section>
					<h1>My Notes</h1>
					<div className='notes__mainActions'>
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

						<div className='nes-select'>
							<select title='Categories' required id='default_select' onChange={handleCategory}>
								<option value={typeCategory} disabled selected hidden>
									{typeCategory}
								</option>
								{CATEGORIES.map((category: NoteCategories) => (
									<option value={category}>{category}</option>
								))}
							</select>
						</div>
					</div>
				</section>
				<section className='notes__grid'>
					{!notes.value.length ? (
						<NoNotes archiveList={archiveList} />
					) : (
						<>
							{notes.value.map(note => (
								<NoteCard
									key={note.id}
									note={note}
									archiveList={archiveList}
									category={typeCategory as NoteCategories}
								/>
							))}
						</>
					)}
				</section>
			</main>
			<Modal>
				<ContentModal archiveList={archiveList} category={typeCategory as NoteCategories} />
			</Modal>
		</>
	)
}

export default App
