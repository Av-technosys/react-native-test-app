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
import FAQScreen from '../../screens/profile/Faq';
import ProfileEditScreen from '../../screens/profile/UserProfileUpdate';
import OrdersScreen from '../../screens/profile/OrderScreen';
import OrderDetailsScreen from '../../screens/profile/OrderDetailScreen';
import PermissionScreen from '../../screens/profile/PermissionScreen';
import NotificationsScreen from '../../screens/Common/Notification';
import ManageBookings from '../../screens/profile/ManageBookings';
import CartProductDetail from '../../screens/cart/CartProductDetail';
import FlowStackBackHandler from '../../utils/FlowStackBackHandler';
import AddReview from '../../screens/profile/AddReviews';
import TestingPayment from '../../screens/event/TestingPayment'

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
    <>
    <FlowStackBackHandler/>
   
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
      <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
      {/* Categories Stack Screens */}
      {/* Defined in Tab Navigation   <Stack.Screen name="Categories" component={CategoriesScreen} /> */}
      <Stack.Screen name="CategoryProducts" component={CategoryProducts} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />

      {/* Event Stack Screens */}
      <Stack.Screen name="eventDetails" component={eventDetails} />
      <Stack.Screen name="eventProducts" component={eventProduct} />
      <Stack.Screen name="TestingPayment" component={TestingPayment} />
      <Stack.Screen name="reviews" component={reviewScreen} />
      {/* Cart Stack Sreen */}

      {/* Profile Stack Screens */}
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="ProfileEditScreen" component={ProfileEditScreen} />
      <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
      <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
      <Stack.Screen name="AddReviewsScreen" component={AddReview} />
      <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
      <Stack.Screen name="ManageBookings" component={ManageBookings} />

       {/* Cart Stack Screens */}
      <Stack.Screen name="CartProductDetail" component={CartProductDetail} />

    </Stack.Navigator>
     </>
  );
}
