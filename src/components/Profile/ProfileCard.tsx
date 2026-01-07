import { Image, Pressable, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Props = {
  name?: string;
  phone?: string;
  email?: string;
  profileImage?: string | null;
  onEdit?: () => void;
  loading?: boolean;
};

export function ProfileInfoCard({
  name,
  phone,
  email,
  profileImage,
  onEdit,
  loading = false,
}: Props) {
  const S3_BASE_URL = 'https://freaky-files.s3.ap-south-1.amazonaws.com';

  /* ---------------- SKELETON ---------------- */
  if (loading) {
    return (
      <View className="mx-2 bg-white rounded-2xl px-6 py-6 shadow-lg flex-row items-center">
        <SkeletonPlaceholder borderRadius={16}>
          {/* Avatar */}
          <SkeletonPlaceholder.Item
            width={80}
            height={80}
            borderRadius={40}
            marginRight={16}
          />

          {/* Info */}
          <SkeletonPlaceholder.Item flex={1}>
            <SkeletonPlaceholder.Item width="60%" height={18} />
            <SkeletonPlaceholder.Item marginTop={8} width="70%" height={14} />
            <SkeletonPlaceholder.Item marginTop={6} width="80%" height={14} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </View>
    );
  }

  /* ---------------- DATA ---------------- */
  return (
    <View className="mx-2 bg-white rounded-2xl px-6 py-6 shadow-lg flex-row items-center">
      {/* AVATAR */}
      <Image
        source={
          profileImage
            ? { uri: `${S3_BASE_URL}/${profileImage}` }
            : require('../../assets/images/default-avtar.jpg')
        }
        className="w-20 h-20 rounded-full mr-4"
      />

      {/* INFO */}
      <View className="flex-1">
        <Text className="text-lg font-bold text-gray-900">
          {name}
        </Text>

        <View className="flex-row items-center mt-1">
          <Feather name="phone" size={16} color="#6B7280" />
          <Text className="ml-2 text-md text-gray-500">
            {phone}
          </Text>
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
      {onEdit && (
        <Pressable
          onPress={onEdit}
          className="absolute top-3 right-3"
        >
          <Feather name="edit-2" size={18} color="#6B7280" />
        </Pressable>
      )}
    </View>
  );
}
