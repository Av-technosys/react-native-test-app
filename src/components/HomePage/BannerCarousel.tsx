/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from '../common/Carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type Banner = {
  id: number;
  name: string;
  mediaURL: string;
  priority: number;
};

type Props = {
  banners: Banner[];
  loading?: boolean;
};

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 180; // adjust to match your carousel

export default function BannerCarousel({ banners, loading }: Props) {
  // Convert API banners into carousel-compatible images
  const images = banners.map(item => ({
    uri: item.mediaURL,
  }));

  if (loading) {
    return (
      <View className="mt-5 px-4">
        <SkeletonPlaceholder borderRadius={16}>
          <SkeletonPlaceholder.Item
            width={width - 32}
            height={BANNER_HEIGHT}
          />
        </SkeletonPlaceholder>
      </View>
    );
  }

  if (!images.length) {
    return null;
  }

  return (
    <View className="mt-5">
      <Carousel
        fullWidth
        images={images}
      />
    </View>
  );
}
