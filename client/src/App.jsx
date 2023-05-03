import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Chatroom from "./pages/Chatroom";

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/chatroom" element={<Chatroom />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
