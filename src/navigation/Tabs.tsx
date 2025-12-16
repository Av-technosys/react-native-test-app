/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/TabBar';

import HomeScreen from '../screens/HomeScreen';
import CategoriesStack from '../navigation/CategoriesStack';
import EventScreen from '../screens/Event';
import CartScreen from '../screens/Cart';
import ProfileScreen from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesStack} />
      <Tab.Screen name="Event" component={EventScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
