import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import ScreenHeader from '../../components/common/ScreenHeader';
import { ProfileInfoCard } from '../../components/Profile/ProfileCard';
import Button from '../../components/common/Button';

type RootStackParamList = {
  FAQ: undefined;
};

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const userProfileItems = [
    {
      title: 'Manage',
      items: [
        { icon: 'star', title: 'Your Reviews', navigate: 'reviews' },
        { icon: 'list', title: 'Orders', navigate: 'OrdersScreen' },
        { icon: 'bookmark', title: 'Manage Booking', navigate: 'ManageBookings' },
      //  { icon: 'credit-card', title: 'Payment Method' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle', title: 'Frequently Asked Question', navigate: 'FAQ' },
        { icon: 'message-square', title: 'Share Feedback' },
      ],
    },
    {
      title: 'More',
      items: [
       // { icon: 'bell', title: 'Notification Settings' },
        { icon: 'settings', title: 'Permission', navigate: 'PermissionScreen' },
      ],
    },
  ];

  function handleEdit() {
              navigation.getParent()?.navigate('FlowStack', {
                screen: 'ProfileEditScreen',
              })
            }

  return (
  <SafeAreaView className="flex-1 bg-white">
    
    {/* ===== TOP GRADIENT ===== */}
    <View className="relative z-20">
      <LinearGradient
        colors={['#FFCE59', '#FFAE7D']}
        className="h-40"
      />

      {/* HEADER ON GRADIENT */}
      <View className="absolute top-0 left-0 right-0 z-20">
  <ScreenHeader title="Profile" rightType="notification" />

      </View>

      {/* PROFILE CARD POSITIONED RELATIVE TO GRADIENT */}
      <View className="absolute -bottom-16 left-0 right-0 z-30 px-4">
        <ProfileInfoCard
          name="Michael Chen"
          city="Jaipur"
          phone="+91 1212121212"
          email="xyz@gmail.com"
          onEdit={() => handleEdit()}
        />
      </View>
    </View>

    {/* ===== CONTENT ===== */}
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
      className="pt-16" // Add padding top to make space for the profile card
    >

      {/* MENU SECTIONS */}
      <View className="px-4 mt-6 gap-6">
        {userProfileItems.map((section, index) => (
          <View key={index} className="gap-2">
            <Text className="text-lg font-semibold text-gray-700 pl-2">
              {section.title}
            </Text>

            <View className="border border-gray-200 rounded-2xl px-3">
              {section.items.map((item, idx) => (
                <Pressable
                  key={idx}
                  onPress={() =>
                    item.navigate
                      ? navigation.getParent()?.navigate('FlowStack', {
                          screen: item.navigate,
                        })
                      : null
                  }
                >
                  <View className="flex-row items-center justify-between py-3">
                    <View className="flex-row items-center gap-3">
                      <Feather name={item.icon} size={18} color="#F97316" />
                      <Text className="text-gray-600 font-medium">
                        {item.title}
                      </Text>
                    </View>
                    <Feather name="chevron-right" size={18} color="#F97316" />
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* LOGOUT */}
   <Button
  label="Log Out"
  className="mt-10 w-[82%] self-center"
  onPress={()=> {}}
/>

    </ScrollView>
  </SafeAreaView>
);
  
}
