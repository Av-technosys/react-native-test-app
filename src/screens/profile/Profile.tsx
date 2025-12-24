import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
const Stack = createNativeStackNavigator();

const UserProfileStack = () => {
  return (
    <SafeAreaView className="flex-1 border border-red-500">

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="ProfileHome"
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />

        {/* <Stack.Screen name="FAQ" component={FAQScreen} /> */}
        {/* <Stack.Screen name="Orders" component={OrdersScreen} />
      <Stack.Screen name="YourReviews" component={YourReviewsScreen} />
      <Stack.Screen name="ManageBooking" component={ManageBookingScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} /> */}
      </Stack.Navigator>
    </SafeAreaView>
  );
};


type RootStackParamList = {
  FAQ: undefined;
};


export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const userProfileItems = [
    {
      title: 'Manage',
      items: [
        {
          icon: "star",
          title: 'Your Reviews',
          component: 'YourReviews',
          navigate: "ProfileEditScreen"
        },
        {
          icon: "star",
          title: 'Your Reviews',
          component: 'YourReviews',
        },
        {
          icon: "list",
          title: 'Orders',
          component: 'Orders',
          navigate: "OrdersScreen"
        },
        {
          icon: "bookmark",

          title: 'Manage Booking',
          component: 'ManageBooking',
        },
        {
          icon: "credit-card",

          title: 'Payment Method',
          component: 'PaymentMethod',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: "help-circle",
          title: 'Frequently Asked Question',
          component: 'YourReviews',
          navigate: 'FAQ',
        },
        {
          icon: "message-square",

          title: 'Share Feedback',
          component: 'Orders',
        },
      ],
    },
    {
      title: 'More',
      items: [
        {
          icon: "bell",

          title: 'Notification Settings',
          component: 'YourReviews',
        },
        {
          icon: "settings",
          title: 'Permisson',
          component: 'Orders',
          navigate: "PermissionScreen"
        },
      ],
    },
  ];
  return (
    <ScrollView className=" ">
      <View
        style={{
          experimental_backgroundImage:
            'linear-gradient(to right, #FFCE59, #FFAE7D)',
        }}
        className="w-full h-20 items-center justify-center bg-gradient-to-r from-[#FFCE59] to-[#FFAE7D]"
      >
        <Text className="text-xl text-black">Profile asdf Screen</Text>
      </View>
      <View className=" p-4 gap-6 ">
        {userProfileItems.map((userProfileItem, index) => (
          <View className="gap-2" key={index}>
            <Text className=" font-semibold text-gray-700 text-2xl pl-2">
              {userProfileItem.title}
            </Text>
            <View className=" border border-gray-300 rounded-2xl p-3">
              {userProfileItem.items.map((item, index: number) => (
                <Pressable key={index} onPress={() => item.navigate ?
                  navigation.getParent()?.navigate('FlowStack', {
                    screen: item.navigate,
                  })
                  : null}>
                  <View className=' flex items-center flex-row gap-3 p-0.5 justify-between'>
                    <View className=' flex flex-row items-center gap-2'>
                      <Feather name={item.icon} size={18} color="orange" />

                      <Text className=" font-semibold text-gray-500 py-2">
                        {item.title}
                      </Text>
                    </View>
                    <Feather name={"chevron-right"} size={18} color="orange" />

                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </View>
      <Button className=" my-3" text="Logout" />
    </ScrollView>
  );
}



const Button = ({ disabled, onPress, text, className }: {
  disabled?: boolean,
  onPress?: () => void,
  text: string,
  className?: string
}) => {
  return (
    <Pressable
      disabled={disabled}
      className={`w-full items-center ${className}`}
      onPress={onPress}
    >
      <View style={{ borderRadius: 18, overflow: 'hidden', width: '92%' }}>
        <LinearGradient
          colors={
            disabled ? ['#E5E7EB', '#E5E7EB'] : ['#F97316', '#FACC15']
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            height: 48,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text className="text-white text-xl font-bold">{text}</Text>
        </LinearGradient>
      </View>
    </Pressable>
  )
}



