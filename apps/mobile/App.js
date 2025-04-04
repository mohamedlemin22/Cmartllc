// apps/mobile/App.js
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BookingScreen from './src/screens/BookingScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BookRide" component={BookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
