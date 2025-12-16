import { View, Text, Image, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type ReviewCardProps = {
  name: string;
  daysAgo: string;
  rating: number;
  comment: string;
  avatarColor?: string;
  images: any[];
};

export default function ReviewCard({
  name,
  daysAgo,
  rating,
  comment,
  avatarColor = '#111827',
  images,
}: ReviewCardProps) {
  return (
    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-lg">
      {/* HEADER */}
      <View className="flex-row justify-between items-start">
        <View className="flex-row items-center">
          {/* Avatar */}
          <View
            className="w-14 h-14 rounded-full mr-3"
            style={{ backgroundColor: avatarColor }}
          />

          <View>
            <Text className="font-semibold text-lg text-black">
              {name}
            </Text>
            <Text className="text-sm text-gray-400">
              {daysAgo}
            </Text>
          </View>
        </View>

        {/* Rating */}
        <View className="flex-row">
          {Array.from({ length: 5 }).map((_, index) => (
 <AntDesign
  key={index}
  name="star"
  size={16}
  color={index < rating ? '#FACC15' : '#E5E7EB'}
/>
          ))}
        </View>
      </View>

      {/* COMMENT */}
      <Text className="text-lg text-gray-700 mt-3">
        {comment}
      </Text>

      {/* IMAGES */}
      <FlatList
        data={images}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 12 }}
        renderItem={({ item }) => (
          <Image
            source={item}
            className="w-28 h-24 rounded-lg mr-3"
            resizeMode="cover"
          />
        )}
      />
    </View>
  );
}
