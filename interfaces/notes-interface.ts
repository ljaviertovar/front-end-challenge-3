export type NoteCategogry = "Develop" | "Planning" | "Idea" | "Unclassified"

export interface Note {
	id: string
	title: string
	content: string
	lastEdited: string
	archived: boolean
	category: NoteCategogry
}
