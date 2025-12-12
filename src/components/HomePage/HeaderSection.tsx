/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown, MapPin, Bell, Search } from 'lucide-react-native';
import LinearGradient from 'react-native-linear-gradient';


export default function HeaderSection({bottomSheetRef}: {bottomSheetRef: any}) {

  return (
    <View className="px-4 mt-4">
      <View className="flex-row justify-between items-center">
        <View className="flex flex-col gap-2 my-2">
          <Text className="text-2xl font-normal text-gray-900">
            Hi, Angelina 👋
          </Text>
          <Text className="text-3xl font-semibold text-black">
            Welcome back
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
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
            style={{ color: '#000' }} // EXACT black
            numberOfLines={1}
          >
            Akshya Nagar 1st Block Ahmedabad
          </Text>

          {/* Right arrow */}
          <ChevronDown size={18} color="#F97316" />
        </TouchableOpacity>
      </LinearGradient>


    </View>
  );
}
