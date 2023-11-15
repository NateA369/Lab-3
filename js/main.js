mapboxgl.accessToken = 'pk.eyJ1IjoibmF0ZWEzNjkiLCJhIjoiY2xvejhldmUxMDltdDMybXB6ZGNwdXh0MSJ9.dhamz50QtURIQ_BhPS78aw';

let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-v9', // style URL
    zoom: 5.5, // starting zoom
    center: [138, 38] // starting center
});

let earthquakes, japan;

async function geojsonFetch(callback) {
    try {
        let response = await fetch('assets/earthquakes.geojson');
        earthquakes = await response.json();

        response = await fetch('assets/japan.json');
        japan = await response.json();

        // Call the callback function once data is loaded
        callback();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function loadingData() {
    map.on('load', function () {
        map.addSource('earthquakes', {
            type: 'geojson',
            data: earthquakes
        });

        map.addLayer({
            'id': 'earthquakes-layer',
            'type': 'circle',
            'source': 'earthquakes',
            'paint': {
                'circle-radius': 8,
                'circle-stroke-width': 2,
                'circle-color': 'red',
                'circle-stroke-color': 'white'
            }
        });

        map.addSource('japan', {
            type: 'geojson',
            data: japan
        });

        map.addLayer({
            'id': 'japan-layer',
            'type': 'fill',
            'source': 'japan',
            'paint': {
                'fill-color': '#0080ff',
                'fill-opacity': 0.5
            }
        });
    });
}

// Pass the loadingData function as a callback to geojsonFetch
geojsonFetch(loadingData);

