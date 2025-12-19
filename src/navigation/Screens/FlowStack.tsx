import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Easing } from 'react-native';
import eventDetails from '../../screens/event/EventDetails';
import CategoryProducts from '../../screens/category/CategoryProduts';
import ProductDetails from '../../screens/category/ProductDetails';
import eventProduct from '../../screens/event/EventProducts';
import reviewScreen from '../../screens/event/Reviews'; 

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

export default function FlowStack() {
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
      {/* Categories Stack Screens */}
        {/* Defined in Tab Navigation   <Stack.Screen name="Categories" component={CategoriesScreen} /> */}
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />

      {/* Event Stack Screens */}
      <Stack.Screen name="eventDetails" component={eventDetails} />
      <Stack.Screen name="eventProducts" component={eventProduct} />
      <Stack.Screen name="reviews" component={reviewScreen} />
      {/* Cart Stack Sreen */}

      {/* Profile Stack Screens */}
    </Stack.Navigator>
  );
}
