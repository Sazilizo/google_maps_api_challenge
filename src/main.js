window.initMap = function() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -33.92584, lng: 18.42322 },
        zoom: 13,
      });
    
      // Set up the input element for the search box
      const input = document.getElementById("search-box");
    
 
      const autocomplete = new google.maps.places.Autocomplete(input);

      autocomplete.bindTo("bounds", map);
    
      autocomplete.addListener("place_changed", function () {
        const place = autocomplete.getPlace();
    
        if (!place.geometry) {
          console.log("No details available for input: '" + place.name + "'");
          return;
        }
    
        // Clear previous marker if it exists
        if (window.marker) {
          window.marker.setMap(null);
        }
    
        // Center the map on the selected place
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
    
        window.marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
        });
    
        const infoWindow = new google.maps.InfoWindow({
            content: `
              <div>
                <strong>Place Name:</strong><br>
                Latitude: ${lat.toFixed(5)}<br>
                Longitude: ${lng.toFixed(5)}<br>
                <img src="${photoUrl}" alt="Place Photo" width="300"><br>
                <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank">Get Directions</a>
            </div>
            `,
        });
    
        // Open the InfoWindow at the marker's position
        infoWindow.open(map, window.marker);
      });
    
      // Add an event listener for when the user clicks anywhere on the map
      google.maps.event.addListener(map, "click", function (event) {
        // Get the clicked location's latitude and longitude
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
    
        // Create a new marker at the clicked location
        const marker = new google.maps.Marker({
          position: event.latLng,
          map: map,
        });
    
        // Create a new InfoWindow with interesting details (in this case, the coordinates)
        const infoWindow = new google.maps.InfoWindow({
          content: `<div>Latitude: ${lat.toFixed(5)}<br>Longitude: ${lng.toFixed(5)}</div>`,
        });
    
        // Open the InfoWindow at the clicked location
        infoWindow.open(map, marker);
        marker.addListener("click", function () {
            marker.setMap(null); // Removes the marker from the map
            infoWindow.close();  // Optionally, close the InfoWindow when the marker is removed
          });
      });
  }
  