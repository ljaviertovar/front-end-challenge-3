import { useSelector } from "react-redux"
import { CreateUpdateNoteContent } from "."
import { RooState } from "../../../store/store"
import DeleteNote from "./DeleteNote"

const ContentModal = () => {
	const modals = useSelector((state: RooState) => state.modals)

	console.log(modals.contentModal)

	if (modals.contentModal.type === "add") {
		return <CreateUpdateNoteContent />
	}

	if (modals.contentModal.type === "update") {
		return <CreateUpdateNoteContent note={modals.contentModal.content} />
	}

	if (modals.contentModal.type === "delete") {
		return (
			<DeleteNote id={modals.contentModal.content?.id as string} title={modals.contentModal.content?.title as string} />
		)
	}

	return null
}

export default ContentModal
