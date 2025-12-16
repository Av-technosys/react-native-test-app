import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* TAB BAR APP */}
      <Stack.Screen name="MainTabs" component={Tabs} />

      {/* 
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Payment" component={Payment} />
      */}

    </Stack.Navigator>
  );
}
