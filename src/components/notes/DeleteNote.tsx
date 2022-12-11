import React from "react"
import { useDispatch } from "react-redux"
import { deleteNote, setShowModal } from "../../../store/features"

interface Props {
	id: string
	title: string
}

const DeleteNote = ({ id, title }: Props) => {
	const dispatch = useDispatch()

	return (
		<>
			<p>Are you sure you want to delete this note?</p>
			<span className='nes-text is-primary'>{title}</span>
			<div className='modal__btns' style={{ fontSize: "12px" }}>
				<button type='button' className='nes-btn' onClick={() => dispatch(setShowModal(false))}>
					Cancel
				</button>
				<button
					type='button'
					className='nes-btn is-error'
					onClick={() => {
						dispatch(deleteNote(id))
						dispatch(setShowModal(false))
					}}
				>
					Delete
				</button>
			</div>
		</>
	)
}

export default DeleteNote
