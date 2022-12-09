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

const NoteCard = ({ note }: Props) => {
	return (
		<div className='nes-container is-dark'>
			<div>
				<h3>{note.title}</h3>
				<p>Last edited: {note.lastEdited}</p>
			</div>
			<div className='notes__btns'>
				<button type='button' className='nes-btn is-error'>
					Delete
				</button>
				<button type='button' className='nes-btn is-warning'>
					Archive
				</button>
				<button type='button' className='nes-btn is-success'>
					Edit
				</button>
			</div>
		</div>
	)
}

export default NoteCard
