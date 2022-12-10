import { Note } from "./interfaces"

const api = {
	notes: {
		list: (): Note[] => {
			try {
				return JSON.parse(localStorage.getItem("notes") || "[]")
			} catch (error) {
				return []
			}
		},
		set: (notes: Note[]) => {
			localStorage.setItem("notes", JSON.stringify(notes))
		},
		delete: (id: string) => {
			try {
				const notes = JSON.parse(localStorage.getItem("notes") || "[]")
				const updatetdNotes = notes.filter((n: Note) => n.id !== id)
				localStorage.setItem("notes", JSON.stringify(updatetdNotes))

				return updatetdNotes
			} catch (error) {
				console.log(error)
			}
		},
	},
}

export default api
