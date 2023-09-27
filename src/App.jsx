import "./App.css";
import Search from "./components/Search";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./components/Map";

function App() {
	return (
		<Router>
			<h1>Mapbox Exercisae</h1>
			<Routes>
				<Route path="/" element={<Search />} />
				<Route path="/map" element={<Map />} />
			</Routes>
		</Router>
	);
}
export default App;
