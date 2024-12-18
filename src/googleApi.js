const apiKey = process.env.GOOGLE_API_KEY;

const script = document.createElement('script');
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
script.async = true;
script.defer = true;
document.head.appendChild(script);