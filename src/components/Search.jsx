import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
function Search(onSelectAddress) {
	const [address, setAddress] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [selectedSuggestion, setSelectedSuggestion] = useState(null);
	const apiKey =
		"pk.eyJ1IjoiZ3RvcnJlY2lsbGFzMTAzIiwiYSI6ImNsbXg5bWwzczBqdjcycmxjcDNxYXRtOHUifQ.lQ60nbkIs-QipRbvlgD46Q";
	useEffect(() => {
		if (address.trim() === "") {
			setSuggestions([]);
			return;
		}
		const suggestEndpoint = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${address}&language=en&session_token=03d62894-7fd0-4fd1-88ac-6a1c9440cdc3&access_token=${apiKey}`;

		axios
			.get(suggestEndpoint)
			.then((response) => {
				setSuggestions(response.data.suggestions);
				console.log(suggestions);
			})
			.catch((error) => {
				console.error(error);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address]);

	const handleSelectSuggestion = (suggestion) => {
		setSelectedSuggestion(suggestion);
		setAddress(suggestion.name);
	};

	const handleSearch = () => {
		if (selectedSuggestion) {
			const mapboxId = selectedSuggestion.mapbox_id;
			const retreiveEndpoint = `https://api.mapbox.com/search/searchbox/v1/retrieve/${mapboxId}?session_token=03d62894-7fd0-4fd1-88ac-6a1c9440cdc3&access_token=${apiKey}`;
			axios
				.get(retreiveEndpoint)
				.then((response) => {
					console.log(response.properties);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<div>
			<button onClick={handleSearch}>Search</button>
			<input
				type="text"
				placeholder="Type an address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
			/>
			<ul>
				{suggestions.map((suggestion) => (
					<li
						key={suggestion.mapbox_id}
						onClick={() => handleSelectSuggestion(suggestion)}
					>
						{suggestion.name || "No Name Available"}{" "}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Search;
