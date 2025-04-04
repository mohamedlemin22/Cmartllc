// apps/web/src/components/Booking/VehicleCard.jsx
export default function VehicleCard({ vehicle, selected, onClick }) {
    const vehicles = {
      suburban: {
        name: "Chevrolet Suburban 2023",
        image: "/images/suburban.jpg",
        capacity: "8 passengers",
        features: ["WiFi", "Premium Seats", "Spacious"]
      },
      sedona: {
        name: "Kia Sedona 2020",
        image: "/images/sedona.jpg",
        capacity: "7 passengers",
        features: ["Child Seats", "Comfortable"]
      }
    }
  
    const current = vehicles[vehicle]
  
    return (
      <div 
        className={`vehicle-card ${selected === vehicle ? 'selected' : ''}`}
        onClick={() => onClick(vehicle)}
      >
        <img src={current.image} alt={current.name} />
        <h3>{current.name}</h3>
        <p>{current.capacity}</p>
        <ul>
          {current.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>
    )
  }