import { Image, Pressable, Text, View } from "react-native";
import Feather from "react-native-vector-icons/Feather";

type Props = {
  name: string;
  city: string;
  phone: string;
  email: string;
  onEdit?: () => void;
};

export function ProfileInfoCard({
  name,
  city,
  phone,
  email,
  onEdit,
}: Props) {
  return (
    <View className="mx-2 bg-white rounded-2xl px-6 py-6 shadow-lg flex-row items-center">
      
      {/* AVATAR */}
      <Image
        source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
        className="w-20 h-20 rounded-full mr-4"
      />

      {/* INFO */}
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-900">
          {name}
        </Text>

        <View className="flex-row items-center mt-1">
          <Feather name="map-pin" size={16} color="#6B7280" />
          <Text className="ml-2 text-md text-gray-500">{city}</Text>
        </View>

        <View className="flex-row items-center mt-1">
          <Feather name="phone" size={16} color="#6B7280" />
          <Text className="ml-2 text-md text-gray-500">{phone}</Text>
        </View>

        <View className="flex-row items-center mt-1">
          <Feather name="mail" size={16} color="#6B7280" />
          <Text
            className="ml-2 text-md text-gray-500"
            numberOfLines={1}
          >
            {email}
          </Text>
        </View>
      </View>

      {/* EDIT */}
      <Pressable
        onPress={onEdit}
        className="absolute top-3 right-3"
      >
        <Feather name="edit-2" size={18} color="#6B7280" />
      </Pressable>
    </View>
  );
}
