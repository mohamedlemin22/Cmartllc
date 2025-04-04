// apps/web/src/components/Map/LocationPicker.jsx
import { useEffect, useRef, useState } from 'react'
import './LocationPicker.css'

export default function LocationPicker({ onLocationChange }) {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [marker, setMarker] = useState(null)
  const [location, setLocation] = useState('')

  useEffect(() => {
    // Initialize map
    const mapInstance = new window.google.maps.Map(mapRef.current, {
      center: { lat: 29.9941, lng: -90.2417 }, // Kenner, LA
      zoom: 13
    })
    
    const mapMarker = new window.google.maps.Marker({
      map: mapInstance,
      draggable: true
    })
    
    mapMarker.addListener('dragend', (e) => {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      }
      onLocationChange(newLocation)
    })
    
    setMap(mapInstance)
    setMarker(mapMarker)
    
    // Load Google Maps script
    if (!window.google) {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GMAPS_KEY}&libraries=places`
      document.head.appendChild(script)
    }
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!map || !window.google) return
    
    const service = new window.google.maps.places.PlacesService(map)
    service.textSearch({ query: location }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results[0]) {
        const place = results[0]
        map.panTo(place.geometry.location)
        marker.setPosition(place.geometry.location)
        onLocationChange({
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        })
      }
    })
  }

  return (
    <div className="location-picker">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter pickup location"
        />
        <button type="submit">Search</button>
      </form>
      <div ref={mapRef} className="map-container"></div>
    </div>
  )
}