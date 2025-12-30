import React from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import ScreenHeader from '../../components/common/ScreenHeader';

export default function ProfileEditScreen() {

  return (
    <SafeAreaView className="flex-1 bg-white">
  

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

             {/* HEADER ON GRADIENT */}
       <View className="absolute top-0 left-0 right-0 z-20">
  <ScreenHeader title="Profile" rightType="notification" />

       </View>
{/* AVATAR */}
<View className="items-center mt-16 mb-8">
  <View className="bg-white rounded-full border-4 border-orange-400 p-[3px]">
    <Image
      source={{
        uri: 'https://randomuser.me/api/portraits/men/32.jpg',
      }}
      className="w-28 h-28 rounded-full"
    />
  </View>



          {/* PLUS BUTTON */}
          <Pressable className="absolute bottom-1 right-[38%] bg-blue-600 w-7 h-7 rounded-full items-center justify-center border-2 border-white">
            <Feather name="plus" size={14} color="#fff" />
          </Pressable>
        </View>

        {/* FORM */}
        <View className="px-5 gap-5">
          {/* USERNAME */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Username
            </Text>
            <TextInput
              placeholder="Michael Chen"
              placeholderTextColor="#9CA3AF"
              className="h-12 border border-gray-300 rounded-xl px-4 text-black"
            />
          </View>

          {/* EMAIL */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Email
            </Text>
            <View className="flex-row items-center h-12 border border-gray-300 rounded-xl px-4 gap-2">
              <Feather name="mail" size={16} color="#9CA3AF" />
              <TextInput
                placeholder="xyz@gmail.com"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-black"
              />
            </View>
          </View>

          {/* CONTACT */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Contact No.
            </Text>
            <View className="flex-row items-center h-12 border border-gray-300 rounded-xl px-4">
              <Feather name="phone" size={16} color="#9CA3AF" />
              <TextInput
                placeholder="+91 XXXXXXXX789"
                placeholderTextColor="#9CA3AF"
                className="flex-1 ml-2 text-black"
              />
              <Pressable>
                <Text className="text-orange-500 font-semibold">
                  Verify
                </Text>
              </Pressable>
            </View>
          </View>

          {/* LOCATION */}
          <View>
            <Text className="text-sm font-medium text-gray-700 mb-1">
              Location
            </Text>
            <View className="flex-row items-center h-12 border border-gray-300 rounded-xl px-4 gap-2">
              <Feather name="map-pin" size={16} color="#9CA3AF" />
              <TextInput
                placeholder="Jaipur"
                placeholderTextColor="#9CA3AF"
                className="flex-1 text-black"
              />
            </View>
          </View>

          {/* ACTION BUTTONS */}
          <View className="flex-row gap-4 mt-6">
            {/* CANCEL */}
            <Pressable className="flex-1 h-12 rounded-xl border border-orange-500 items-center justify-center">
              <Text className="text-orange-500 font-semibold">
                Cancel
              </Text>
            </Pressable>

            {/* SAVE */}
            <View className="flex-1 h-12 rounded-xl overflow-hidden">
              <LinearGradient
                colors={['#F97316', '#FACC15']}
                className="flex-1 items-center justify-center"
              >
                <Text className="text-white font-semibold">
                  Save
                </Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
