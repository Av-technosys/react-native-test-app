/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown, MapPin, Bell, Search } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';
import { userDetails } from '../../api/user';
import { useEffect, useState } from 'react';
import { fetchCurrentAddress } from '../../api/user';
import { DeviceEventEmitter } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function HeaderSkeleton() {
  return (
    <View className="px-4 mt-4">
      <SkeletonPlaceholder borderRadius={12}>
        {/* Top Row */}
        <SkeletonPlaceholder.Item
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Left text */}
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={140} height={22} marginBottom={8} />
            <SkeletonPlaceholder.Item width={180} height={32} />
          </SkeletonPlaceholder.Item>

          {/* Right icons */}
          <SkeletonPlaceholder.Item flexDirection="row" gap={12}>
            <SkeletonPlaceholder.Item width={48} height={48} borderRadius={24} />
            <SkeletonPlaceholder.Item width={48} height={48} borderRadius={24} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        {/* Address Bar */}
        <SkeletonPlaceholder.Item
          marginTop={20}
          width="100%"
          height={54}
          borderRadius={30}
        />
      </SkeletonPlaceholder>
    </View>
  );
}

export default function HeaderSection({
  bottomSheetRef,
}: {
  bottomSheetRef: any;
}) {
  const navigation = useNavigation<NavigationProp<any>>();
  const [userData, setUserData] = useState<any>(null);
  const [currentAddress, setCurrentAddress] = useState<any>(null);
  const [loading, setLoading] = useState(true);

const fetchUserDetails = async () => {
  try {
    setLoading(true);

    const res = await userDetails();
    setUserData(res.data);

    const addressId = res.data.currentAddressId;
    if (addressId) {
      const addressRes = await fetchCurrentAddress(addressId);
      setCurrentAddress(addressRes.data);
    }
  } catch (error) {
    showMessage({
      type: 'danger',
      message: 'Failed to fetch user details',
    });
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchUserDetails();

  const subscription = DeviceEventEmitter.addListener(
    'RELOAD_USER',
    () => {
      fetchUserDetails(); // 🔁 re-fetch user + current address
      bottomSheetRef.current?.close(); // ⬇️ close bottom sheet
    }
  );

  return () => subscription.remove();
}, [bottomSheetRef])

if (loading) {
  return <HeaderSkeleton />;
}

  return (
    <View className="px-4 mt-4">
      <View className="flex-row justify-between items-center">
        <View className="flex flex-col gap-1 my-2">
          <Text className="text-xl font-semibold text-gray-900">
            Hi, {userData?.firstName || 'Guest'} 👋
          </Text>
          <Text className="text-3xl font-semibold text-black">
            Welcome back
          </Text>
        </View>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            className="w-12 h-12 rounded-full bg-white items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Search size={22} color="#5e5e5e" />
          </TouchableOpacity>

          {/* Bell Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.getParent()?.navigate('FlowStack', {
                screen: 'NotificationsScreen',
              });
            }}
            className="w-12 h-12 rounded-full bg-white items-center justify-center"
            style={{
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 4,
            }}
          >
            <Bell size={22} color="#5e5e5e" />
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient
        colors={['#FBBF24', '#F97316']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 40,
          padding: 2,
          marginTop: 16,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="bg-white rounded-full flex-row items-center justify-between"
          onPress={() => bottomSheetRef.current?.expand()}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 14,
            borderRadius: 40,
          }}
        >
          {/* Left icon container */}
          <View
            className="bg-white mr-3 items-center justify-center"
            style={{
              width: 30,
              height: 30,
              borderRadius: 15, // circle EXACT
            }}
          >
            <MapPin size={16} color="#999" />
          </View>

          {/* Text */}
          <Text
            className="flex-1 text-sm"
            style={{ color: '#000' }}
            numberOfLines={1}
          >
            {currentAddress?.addressLineOne || 'Select delivery address'}
          </Text>

          {/* Right arrow */}
          <ChevronDown size={18} color="#F97316" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}


