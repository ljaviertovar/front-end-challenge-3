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
	},
}

export default api
