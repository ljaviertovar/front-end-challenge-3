import { useSelector } from "react-redux"
import { CreateUpdateNoteContent, DeleteNote } from "."

import { RooState } from "../../../store/store"

import { NoteCategories } from "../../../interfaces"

interface Props {
	archiveList: boolean
	category: NoteCategories
}

const ContentModal = ({ archiveList, category }: Props) => {
	const modals = useSelector((state: RooState) => state.modals)

	if (modals.contentModal.type === "add") {
		return <CreateUpdateNoteContent archiveList={archiveList} category={category} />
	}

	if (modals.contentModal.type === "update") {
		return <CreateUpdateNoteContent note={modals.contentModal.content} archiveList={archiveList} category={category} />
	}

	if (modals.contentModal.type === "delete") {
		return (
			<DeleteNote id={modals.contentModal.content?.id as string} title={modals.contentModal.content?.title as string} />
		)
	}

	return null
}

export default ContentModal
