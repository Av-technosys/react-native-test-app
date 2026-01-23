import { View, Text, Pressable } from 'react-native';
import ReviewCard from '../common/cards/ReviewCard';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  CategoryProducts: undefined;
  ProductDetails: any;
};

type ReviewSectionProps = {
  reviews: {
    reviewId: number;
    rating: number;
    title: string;
    description: string;
    createdAt: string;
    reviewMedia: {
      mediaUrl: string;
      mediaType: 'image' | 'video';
    }[];
  }[];
  loading: boolean;
};

const S3_BASE_URL =
  'https://freaky-files.s3.ap-south-1.amazonaws.com';

export default function CustomerReviewsSection({
  reviews,
  loading,
}: ReviewSectionProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  if (loading) {
    return null; // skeleton can be added later
  }

  if (!reviews || reviews.length === 0) {
    return null; // hide section if no reviews
  }

  return (
    <View className="mt-6 px-4">
      {/* HEADER */}
      <View className="flex-row mb-6 justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-black">
            Customer Reviews
          </Text>
          <Text className="text-lg mt-1 text-gray-400">
            What our customers say
          </Text>
        </View>

<Pressable
  onPress={() =>
    navigation.getParent()?.navigate('FlowStack', {
      screen: 'reviews',
      params: { reviews },
    })
  }
>
          <Text className="text-lg text-gray-500">See All</Text>
        </Pressable>
      </View>

      {/* REVIEWS */}
{reviews?.slice(0, 2).map((review) => {
  const images =
    review.reviewMedia
      ?.filter(m => m.mediaType === 'image')
      ?.map(m => ({
        uri: `${S3_BASE_URL}/${m.mediaUrl}`,
      })) ?? [];

  const videos =
    review.reviewMedia
      ?.filter(m => m.mediaType === 'video')
      ?.map(m => `${S3_BASE_URL}/${m.mediaUrl}`) ?? [];

  return (
    <ReviewCard
      key={review.reviewId}
      title={review.title}
      rating={review.rating}
      comment={review.description}
      createdAt={review.createdAt}
      images={images}
      videos={videos}
    />
  );
})}
    </View>
  );
}
