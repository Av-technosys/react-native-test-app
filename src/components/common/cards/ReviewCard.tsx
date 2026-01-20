import { View, Text, Image, FlatList, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

type ReviewCardProps = {
  title: string;
  rating: number;
  comment: string;
  createdAt: string;
  images: { uri: string }[];
  videos: string[];
};



export default function ReviewCard({
  title,
  rating,
  comment,
  createdAt,
  images,
  videos,
}: ReviewCardProps) {
  return (
    <View className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
      {/* HEADER */}
      <View className="flex-row justify-between items-start">
        <View className="flex-1 pr-2">
          <Text className="text-lg font-semibold text-black">
            {title}
          </Text>
          <Text className="text-sm text-gray-400 mt-1">
{new Date(createdAt).toLocaleDateString()}          </Text>
        </View>

        {/* RATING */}
        <View className="flex-row">
          {[...Array(5)].map((_, i) => (
            <AntDesign
              key={i}
              name="star"
              size={14}
              color={i < rating ? '#FACC15' : '#E5E7EB'}
            />
          ))}
        </View>
      </View>

      {/* COMMENT */}
      <Text className="text-base text-gray-700 mt-3">
        {comment}
      </Text>

      {/* IMAGE MEDIA */}
      {images.length > 0 && (
        <FlatList
          data={images}
          horizontal
          keyExtractor={(_, i) => `img-${i}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 12 }}
          renderItem={({ item }) => (
            <Image
              source={item}
              className="w-28 h-24 rounded-lg mr-3 bg-gray-100"
              resizeMode="cover"
            />
          )}
        />
      )}

      {/* VIDEO MEDIA */}
      {videos.length > 0 && (
        <FlatList
          data={videos}
          horizontal
          keyExtractor={(_, i) => `vid-${i}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: 12 }}
          renderItem={({  }) => (
            <Pressable className="w-28 h-24 rounded-lg mr-3 bg-black justify-center items-center">
              <AntDesign
                name="playcircleo"
                size={32}
                color="#fff"
              />
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
