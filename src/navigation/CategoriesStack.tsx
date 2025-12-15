import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/Categories';
//import CategoryDetailsScreen from '../screens/CategoryDetails';

const Stack = createNativeStackNavigator();

export default function CategoriesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CategoriesMain" component={CategoriesScreen} />
      {/* <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} /> */}
    </Stack.Navigator>
  );
}
