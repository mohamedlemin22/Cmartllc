const GMAPS_API_KEY = 'AIzaSyBV4a94wRik5Mqpot-IJqVCPSvqayb1sos';
let map;
let marker;
let pickupAutocomplete;
let dropoffAutocomplete;

function initApp() {
    initMap();
    initAutocomplete();
    setupEventListeners();
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 29.9941, lng: -90.2417 },
        zoom: 12
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true
    });

    marker.addListener('dragend', (e) => {
        reverseGeocode(e.latLng);
    });
}

function initAutocomplete() {
    const options = {
        bounds: {
            north: 30.1,
            south: 29.8,
            east: -89.9,
            west: -90.3
        },
        types: ['address'],
        componentRestrictions: { country: 'us' }
    };

    pickupAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('pickup_location'),
        options
    );

    dropoffAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('dropoff_location'),
        options
    );

    pickupAutocomplete.addListener('place_changed', () => handlePlaceChange('pickup'));
    dropoffAutocomplete.addListener('place_changed', () => handlePlaceChange('dropoff'));
}

function handlePlaceChange(type) {
    const autocomplete = type === 'pickup' ? pickupAutocomplete : dropoffAutocomplete;
    const errorElement = document.getElementById(`${type}Error`);
    const place = autocomplete.getPlace();

    if (!place.geometry) {
        errorElement.textContent = 'Please select a valid address from the suggestions';
        errorElement.style.display = 'block';
        return;
    }

    errorElement.style.display = 'none';
    updateMap(place.geometry.location);
    calculateFare();
}

function updateMap(location) {
    map.panTo(location);
    marker.setPosition(location);
}

async function reverseGeocode(latLng) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
            document.getElementById('pickup_location').value = results[0].formatted_address;
            calculateFare();
        }
    });
}

async function calculateFare() {
    const pickup = document.getElementById('pickup_location').value;
    const dropoff = document.getElementById('dropoff_location').value;
    const vehicle = document.getElementById('vehicle').value;

    if (!pickup || !dropoff || !vehicle) return;

    try {
        // Simulated fare calculation
        const baseFares = {
            'Chevrolet Suburban 2023': 50,
            'Kia Sedona 2020': 35
        };
        const distance = Math.floor(Math.random() * 45) + 5;
        const fare = baseFares[vehicle] + (distance * 2.5);

        document.getElementById('responseMessage').innerHTML = `
            <strong>Estimated Fare:</strong> $${fare.toFixed(2)}
            <small>(approx ${distance} miles)</small>
        `;
        document.getElementById('responseMessage').className = 'success';
        document.getElementById('responseMessage').style.display = 'block';
    } catch (error) {
        showError('Failed to calculate fare. Please try again.');
    }
}

function setupEventListeners() {
    document.getElementById('vehicle').addEventListener('change', calculateFare);
    
    document.getElementById('bookingForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('submitBtn');
        const spinner = document.getElementById('spinner');
        const responseMessage = document.getElementById('responseMessage');

        submitBtn.disabled = true;
        spinner.style.display = 'inline-block';
        responseMessage.style.display = 'none';

        try {
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                vehicle: document.getElementById('vehicle').value,
                pickup_time: document.getElementById('pickup_time').value,
                pickup_location: document.getElementById('pickup_location').value,
                dropoff_location: document.getElementById('dropoff_location').value,
                special_requests: document.getElementById('special_requests').value
            };

            // Simulated API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            responseMessage.innerHTML = `
                <strong>Booking Confirmed!</strong><br>
                Your ${formData.vehicle} will arrive at ${formatDateTime(formData.pickup_time)}<br>
                <small>Confirmation #: ${Math.random().toString(36).substr(2, 9).toUpperCase()}</small>
            `;
            responseMessage.className = 'success';
            responseMessage.style.display = 'block';
            document.getElementById('bookingForm').reset();
        } catch (error) {
            responseMessage.textContent = 'Booking failed. Please try again.';
            responseMessage.className = 'error';
            responseMessage.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            spinner.style.display = 'none';
        }
    });
}

function formatDateTime(datetimeStr) {
    const options = { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit'
    };
    return new Date(datetimeStr).toLocaleDateString('en-US', options);
}


window.initApp = initApp;