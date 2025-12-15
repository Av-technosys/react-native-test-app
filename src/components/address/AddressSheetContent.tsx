/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  Search,
  Plus,
  Home,
  Briefcase,
  Edit,
  Trash2,
} from 'lucide-react-native';
import Feather from 'react-native-vector-icons/Feather';
import Geolocation from 'react-native-geolocation-service';
import { useState } from 'react';

export default function AddressSheetContent() {
  const [currentAddress, setCurrentAddress] = useState<any>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const fetchCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      console.log('Location permission denied');
      return;
    }

    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;

        setCurrentAddress({ latitude, longitude });
      },
      err => {
        console.log('Location error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  return (
    <>
      {/* HEADER */}
      <View className="flex-row items-center gap-2 mb-6">
        <Feather name="map-pin" size={20} color="#000" />
        <Text className="text-xl font-semibold text-black">Address</Text>
      </View>

      {/* Search Bar */}
      <View className="border border-gray-200 rounded-xl flex-row items-center px-3 h-[45px]">
        <Search size={18} color="#555" />
        <TextInput
          placeholder="Enter Your Location"
          className="ml-2 flex-1 text-black "
          placeholderTextColor="#777"
        />
      </View>

      {/* Current Location */}
      <TouchableOpacity
        onPress={fetchCurrentLocation}
        className="flex-row items-center gap-2 mt-4 pb-[15px] border-b border-gray-300"
      >
        <Feather name="navigation" size={18} color="#2563eb" />
        <Text className="text-blue-500 text-base">Use My Current Location</Text>
      </TouchableOpacity>

      {/* Add New */}
      <TouchableOpacity className="flex-row items-center mt-3 pb-[15px] border-b border-gray-300">
        <Plus size={18} color="#2b6ef2" />
        <Text className="ml-1.5 text-blue-500 text-base">Add New Address</Text>
      </TouchableOpacity>

      <Text className="mt-5 mb-4 text-sm text-gray-500">Saved Addresses</Text>

      <View className="flex flex-col gap-4 ">
        {/* Home Address */}
        <View className="flex-row justify-between ">
          <View>
            <View className="flex-row items-center">
              <Home size={18} />
              <Text className="ml-2 text-base font-semibold">Home</Text>
            </View>

            <Text className="text-gray-500 ml-6 mt-1 text-sm">
              269, Church Gate, Jaipur
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <Edit size={18} color="#f97316" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Trash2 size={18} color="#f43f5e" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Work Address */}
        <View className="flex-row justify-between ">
          <View>
            <View className="flex-row items-center">
              <Briefcase size={18} />
              <Text className="ml-2 text-base font-semibold">Work</Text>
            </View>

            <Text className="text-gray-500 ml-6 mt-1 text-sm">
              269, Vaishali Nagar, Jaipur
            </Text>
          </View>

          <View className="flex-row items-center gap-4">
            <TouchableOpacity>
              <Edit size={18} color="#f97316" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Trash2 size={18} color="#f43f5e" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
