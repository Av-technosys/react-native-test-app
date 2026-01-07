import { View, Text, Image, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type ReviewCardProps = {
  productTitle: string;
  daysAgo: string;
  rating: number;
  comment: string;
  media: {
    url: string;
    type: 'image' | 'video';
  }[];
};

export default function ReviewCard({
  productTitle,
  daysAgo,
  rating,
  comment,
  media,
}: ReviewCardProps) {
  const avatarImage =
    media.find(m => m.type === 'image')?.url ?? null;

  return (
    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 shadow-lg">
      {/* HEADER */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {avatarImage ? (
            <Image
              source={{ uri: avatarImage }}
              className="w-14 h-14 rounded-full mr-3"
            />
          ) : (
            <View className="w-14 h-14 rounded-full mr-3 bg-gray-300" />
          )}

          <View>
            <Text className="font-semibold text-lg text-black">
              {productTitle}
            </Text>
            <Text className="text-sm text-gray-400">{daysAgo}</Text>
          </View>
        </View>

        {/* Rating */}
        <View className="flex-row">
          {Array.from({ length: 5 }).map((_, i) => (
            <AntDesign
              key={i}
              name="star"
              size={16}
              color={i < rating ? '#FACC15' : '#E5E7EB'}
            />
          ))}
        </View>
      </View>

      {/* COMMENT */}
      <Text className="text-lg text-gray-700 mt-3">{comment}</Text>

      {/* MEDIA */}
      {media.length > 0 && (
        <FlatList
          data={media}
          horizontal
          keyExtractor={(_, i) => i.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 12 }}
          renderItem={({ item }) =>
            item.type === 'image' ? (
              <Image
                source={{ uri: item.url }}
                className="w-28 h-24 rounded-lg mr-3"
              />
            ) : (
              <View className="w-28 h-24 rounded-lg mr-3 bg-black justify-center items-center">
                <AntDesign name="playcircleo" size={28} color="#fff" />
              </View>
            )
          }
        />
      )}
    </View>
  );
}
