/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../../components/common/ScreenHeader';
import ReviewCard from '../../components/common/cards/ReviewCard';
import { getAllReviews } from '../../api/review';
import { getProductsByProductId } from '../../api/product';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type ReviewUIModel = {
  id: number;
  productTitle: string;
  daysAgo: string;
  rating: number;
  comment: string;
  media: {
    url: string;
    type: 'image' | 'video';
  }[];
};

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewUIModel[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await getAllReviews();

      const mapped = await Promise.all(
        res.data.map(async (review: any) => {
          let productTitle = 'Event Review';

          if (review.productId) {
            try {
              const p = await getProductsByProductId(review.productId);
              productTitle = p.product?.title ?? productTitle;
            } catch {}
          }

          return {
            id: review.reviewId,
            productTitle,
            rating: review.rating,
            comment: review.description,
            daysAgo: dayToGO(review.createdAt),
            media:
              review.review_media?.[0]?.map((m: any) => ({
                url: m.mediaUrl,
                type: m.mediaType,
              })) ?? [],
          };
        }),
      );

      setReviews(mapped);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('reviews', reviews);
  }, [reviews]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScreenHeader title="Reviews" rightType="notification" showBack />

      <ScrollView
        className="flex-1 m-4"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))
          : reviews.map(item => (
              <ReviewCard key={item.id} {...item} />
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const dayToGO = (date: string) => {
  const d = new Date(date);

  return d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};



  const ReviewCardSkeleton = () => {
    return (
      <SkeletonPlaceholder borderRadius={12}>
        <View style={{ marginBottom: 16, padding: 16 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                marginRight: 12,
              }}
            />
            <View style={{ flex: 1 }}>
              <View style={{ width: 180, height: 18, marginBottom: 6 }} />
              <View style={{ width: 60, height: 14 }} />
            </View>
          </View>

          {/* Rating */}
          <View style={{ flexDirection: 'row', marginTop: 12 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  marginRight: 4,
                }}
              />
            ))}
          </View>

          {/* Comment */}
          <View style={{ marginTop: 16 }}>
            <View
              style={{ width: SCREEN_WIDTH - 80, height: 16, marginBottom: 8 }}
            />
            <View style={{ width: SCREEN_WIDTH - 120, height: 16 }} />
          </View>

          {/* Media */}
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: 112,
                  height: 96,
                  borderRadius: 12,
                  marginRight: 12,
                }}
              />
            ))}
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }
