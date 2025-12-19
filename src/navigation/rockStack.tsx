
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './Tabs';
import FlowStack from '../navigation/Screens/FlowStack';


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
     {/* Auth Stack */}
      {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
      
      {/* TAB APP */}
      <Stack.Screen name="MainTabs" component={Tabs} />

      {/* FULL SCREEN PAGES */}
      <Stack.Screen name="FlowStack" component={FlowStack} />

    </Stack.Navigator>
  );
}
