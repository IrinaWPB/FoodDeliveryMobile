import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RestaurantScreen from './src/screens/RestaurantScreen';
import BasketScreen from './src/screens/BasketScreen';
import PreparingOrderScreen from './src/screens/PreparingOrderScreen';
import DeliveryScreen from './src/screens/DeliveryScreen';
import { store } from './src/store';
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Restaurant" component={RestaurantScreen}/>
          <Stack.Screen name="Delivery" component={DeliveryScreen}
                        options={{ presentation: "fullScreenModal", headerShown: false }}/>
          <Stack.Screen name="Preparing Order" component={PreparingOrderScreen}
                        options={{ presentation: "fullScreenModal", headerShown: false }}/>
          <Stack.Screen name="Basket" component={BasketScreen}
                        options={{ presentation: "modal", headerShown: false }}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

