// const mapToken = window.mapToken;
// const coordinates = window.coordinates;

const listingLocation = window.listingLocation;

if (!coordinates || coordinates.length !== 2) {
  console.error("Invalid listing coordinates:", coordinates);
} else {
  const map = new maplibregl.Map({
    container: "map",
    style: `https://api.maptiler.com/maps/streets/style.json?key=${mapToken}`,
    center: coordinates,
    zoom: 7,
  });

  const marker = new maplibregl.Marker({
    color: "#7f0e0eff",
    draggable: true,
  }).setLngLat(coordinates)
  .setPopup(
    new maplibregl.Popup({ offset: 25 })
      .setHTML(listingLocation))
  .addTo(map);

  marker.on('dragend', () => {
    const pos = marker.getLngLat();
    // Assuming you have input fields with id 'lat' and 'lng'
    const latInput = document.getElementById('lat');
    const lngInput = document.getElementById('lng');
    if (latInput && lngInput) {
      latInput.value = pos.lat;
      lngInput.value = pos.lng;
    }
  });

  const gc = new maplibreglMaptilerGeocoder.GeocodingControl({
    apiKey: mapToken,
  });

  map.addControl(gc, "top-left");
}