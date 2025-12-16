import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Easing } from 'react-native';
import CategoriesScreen from '../screens/Categories';
import CategoryProducts from '../screens/CategoryProduts';
import ProductDetails from '../screens/ProductDetails';

const Stack = createStackNavigator();

const openConfig = {
  animation: 'timing' as const,
  config: {
    duration: 350,
    easing: Easing.out(Easing.cubic),
  },
};

const closeConfig = {
  animation: 'timing' as const,
  config: {
    duration: 250,
    easing: Easing.in(Easing.cubic),
  },
};

export default function CategoriesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: openConfig,
          close: closeConfig,
        },
        cardStyleInterpolator:
          TransitionPresets.SlideFromRightIOS.cardStyleInterpolator,
      }}
    >
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}
