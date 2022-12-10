import React, { ReactNode } from "react"
import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import { RooState } from "../../../store/store"

interface Props {
	children: ReactNode | ReactNode[]
}

const Modal = ({ children }: Props) => {
	const showModal = useSelector((state: RooState) => state.notes.showModal)

	if (!showModal) return null

	return createPortal(
		<div className='overlay'>
			<section className='nes-container is-dark'>{children}</section>
		</div>,
		document.body
	)
}

export default Modal
