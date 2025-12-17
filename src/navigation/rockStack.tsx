import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
// import CategoryProducts from '../screens/CategoryProduts';
// import ProductDetails from '../screens/ProductDetails';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        animationDuration: 350,
        gestureEnabled: true,
      }}
    >
      {/* TAB APP */}
      <Stack.Screen name="MainTabs" component={Tabs} />

      {/* FULL SCREEN PAGES */}
      {/* <Stack.Screen
        name="CategoryProducts"
        component={CategoryProducts}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
      /> */}
    </Stack.Navigator>
  );
}
