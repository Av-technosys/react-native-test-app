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
  banners?: Banner[];
  loading?: boolean;
};

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 180;

// ✅ Default local banners (fallback)
const DEFAULT_BANNERS = [
  require('../../assets/images/banner.png'),
  require('../../assets/images/banner.png'),
  require('../../assets/images/banner.png'),
  require('../../assets/images/banner.png'),
];

export default function BannerCarousel({
  banners = [],
  loading = false,
}: Props) {
  // ✅ Prefer API banners, fallback to local
  const images =
    banners.length > 0
      ? banners.map(item => ({ uri: item.mediaURL }))
      : DEFAULT_BANNERS;

  // ⏳ Loading state
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

  // ❌ No banners at all (should rarely happen)
  if (!images.length) {
    return null;
  }

  return (
    <View className="mt-5">
      <Carousel fullWidth images={images} />
    </View>
  );
}
