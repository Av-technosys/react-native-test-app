/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyTabBar from '../components/TabBar';

import HomeScreen from '../screens/home/HomeScreen';
import Categories from '../screens/category/Categories';
import EventScreen from '../screens/event/EventSelector';
import CartScreen from '../screens/cart/Cart';
import ProfileScreen from '../screens/profile/Profile';
//import TabsBackHandler from './TabBackHandeler';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <>   
         {/* <TabsBackHandler /> */}

    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Event" component={EventScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    </>
  );
}
