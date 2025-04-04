// apps/mobile/screens/DriverScreen.js
import { View, Text } from 'react-native'
import MapView from 'react-native-maps'

export default function DriverScreen() {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 29.9941, // Kenner, LA
          longitude: -90.2417,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <View style={{ padding: 20 }}>
        <Text>Current Bookings</Text>
        {/* Booking list would go here */}
      </View>
    </View>
  )
}
