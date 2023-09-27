import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useLocation } from "react-router-dom";

const Map = () => {
	const location = useLocation();
	const selectedAddress = location.state.selectedAddress;

	useEffect(() => {
		mapboxgl.accessToken =
			"pk.eyJ1IjoiZ3RvcnJlY2lsbGFzMTAzIiwiYSI6ImNsbXg5bWwzczBqdjcycmxjcDNxYXRtOHUifQ.lQ60nbkIs-QipRbvlgD46Q";

		let map;
		let marker;
		const initializeMap = () => {
			map = new mapboxgl.Map({
				container: "map",
				style: "mapbox://styles/mapbox/streets-v12",
				center: [
					selectedAddress.coordinates.longitude,
					selectedAddress.coordinates.latitude,
				],
				zoom: 15,
			});

			marker = new mapboxgl.Marker({})
				.setLngLat([
					selectedAddress.coordinates.longitude,
					selectedAddress.coordinates.latitude,
				])
				.addTo(map);

			map.on("load", () => {
				map.addSource("custom-tileset", {
					type: "vector",
					url: "mapbox://gtorrecillas103.cln0qusx123pm2cque4t72n9o-0ifvy",
				});

				map.addLayer({
					id: "custom-tileset-layer",
					type: "fill",
					source: "custom-tileset",
					"source-layer": "test",
					paint: {
						"fill-color": "rgba(255, 0, 0, 0.5)",
						"fill-opacity": 0.5,
					},
				});
			});
		};

		if (!map) {
			initializeMap();
		}

		return () => {
			if (map) {
				map.remove();
			}
		};
	}, [selectedAddress]);

	return (
		<div>
			<div id="map" style={{ width: "100%", height: "500px" }}></div>
		</div>
	);
};

export default Map;
