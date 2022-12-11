interface Props {
	archiveList: boolean
}

const NoNotes = ({ archiveList }: Props) => {
	return (
		<div className='nes-container is-rounded'>
			{archiveList ? <p>No notes archived.</p> : <p>No notes added yet. Add one!</p>}
		</div>
	)
}

export default NoNotes
