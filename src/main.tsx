import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App"

import { store } from "../store"

import "nes.css/css/nes.min.css"
import "./App.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<Provider store={store}>
		<App />
	</Provider>
)
