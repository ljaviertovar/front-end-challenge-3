import { v4 as uuid } from "uuid"

import { Note, NoteCategories } from "./interfaces"

const api = {
	notes: {
		list: (category: NoteCategories): Note[] => {
			try {
				const notes = JSON.parse(localStorage.getItem("notes") || "[]")
				if (category === "All Categories") return notes.filter((n: Note) => !n.archived)
				return notes.filter((n: Note) => !n.archived && n.category === category)
			} catch (error) {
				return []
			}
		},
		listArchived: (category: NoteCategories): Note[] => {
			try {
				const notes = JSON.parse(localStorage.getItem("notes") || "[]")
				if (category === "All Categories") return notes.filter((n: Note) => n.archived)
				return notes.filter((n: Note) => n.archived && n.category === category)
			} catch (error) {
				return []
			}
		},
		set: (notes: Note[]) => {
			localStorage.setItem("notes", JSON.stringify(notes))
		},
		add: (note: Note) => {
			try {
				const today = new Date()
				const lastEdited = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} - ${today.getHours()}:${today.getMinutes()}:${today.getUTCSeconds()}`
				const newNote: Note = {
					...note,
					id: uuid(),
					lastEdited,
					archived: false,
				}

				const notes = JSON.parse(localStorage.getItem("notes") || "[]")
				notes.push(newNote)

				localStorage.setItem("notes", JSON.stringify(notes))

				return newNote
			} catch (error) {
				console.log(error)
			}
		},
		update: (note: Note) => {
			try {
				const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]")
				const today = new Date()
				const lastEdited = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} - ${today.getHours()}:${today.getMinutes()}:${today.getUTCSeconds()}`

				let updatedNote = {}
				const updatetdNotes = notes.map(oldNote => {
					if (oldNote.id === note.id) {
						updatedNote = { ...oldNote, ...note, lastEdited }
						return updatedNote
					}
					return oldNote
				})

				localStorage.setItem("notes", JSON.stringify(updatetdNotes))

				return updatedNote
			} catch (error) {
				console.log(error)
			}
		},
		delete: (id: string) => {
			try {
				const notes = JSON.parse(localStorage.getItem("notes") || "[]")
				const updatetdNotes = notes.filter((n: Note) => n.id !== id)

				localStorage.setItem("notes", JSON.stringify(updatetdNotes))

				return id
			} catch (error) {
				console.log(error)
			}
		},
		archive: (id: string) => {
			try {
				const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]")
				const today = new Date()
				const lastEdited = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} - ${today.getHours()}:${today.getMinutes()}:${today.getUTCSeconds()}`

				let updatedNote = {}
				const updatetdNotes = notes.map(oldNote => {
					if (oldNote.id === id) {
						updatedNote = { ...oldNote, archived: true, lastEdited }
						return updatedNote
					}
					return oldNote
				})

				localStorage.setItem("notes", JSON.stringify(updatetdNotes))

				return updatedNote
			} catch (error) {
				console.log(error)
			}
		},
		unarchive: (id: string) => {
			try {
				const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]")
				const today = new Date()
				const lastEdited = `${today.getDay()}/${today.getMonth()}/${today.getFullYear()} - ${today.getHours()}:${today.getMinutes()}:${today.getUTCSeconds()}`

				let updatedNote = {}
				const updatetdNotes = notes.map(oldNote => {
					if (oldNote.id === id) {
						updatedNote = { ...oldNote, archived: false, lastEdited }
						return updatedNote
					}
					return oldNote
				})

				localStorage.setItem("notes", JSON.stringify(updatetdNotes))

				return updatedNote
			} catch (error) {
				console.log(error)
			}
		},
	},
}

export default api
