import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { useLocation } from "react-router-dom";

const Map = () => {
	const location = useLocation();
	const selectedAddress = location.state.selectedAddress;
	const mapContainer = useRef(null);
	const map = useRef(null);
	const marker = useRef(null);

	useEffect(() => {
		mapboxgl.accessToken =
			"pk.eyJ1IjoiZ3RvcnJlY2lsbGFzMTAzIiwiYSI6ImNsbXg5bWwzczBqdjcycmxjcDNxYXRtOHUifQ.lQ60nbkIs-QipRbvlgD46Q";

		if (!map.current) {
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v11",
				center: [
					selectedAddress.coordinates.longitude,
					selectedAddress.coordinates.latitude,
				],
				zoom: 15,
			});

			marker.current = new mapboxgl.Marker()
				.setLngLat([
					selectedAddress.coordinates.longitude,
					selectedAddress.coordinates.latitude,
				])
				.addTo(map.current);

			map.current.on("load", () => {
				map.current.addSource("custom-tileset", {
					type: "vector",
					url: "mapbox://gtorrecillas103.cln0qusx123pm2cque4t72n9o-0ifvy",
				});

				map.current.addLayer({
					id: "custom-tileset-layer",
					type: "fill",
					source: "custom-tileset",
					"source-layer": "test",
					paint: {
						"fill-color": "black",
						"fill-opacity": 0.5,
					},
				});
			});
		}
	}, [selectedAddress]);

	return (
		<div>
			<div ref={mapContainer} style={{ width: "100%", height: "500px" }}></div>
		</div>
	);
};

export default Map;
