/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from '../common/Carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const S3_BASE_URL = 'https://freaky-files.s3.ap-south-1.amazonaws.com';

type Banner = {
  id: number;
  name: string;
  mediaURL: string;   // ← THIS matches API
  priority: number;
};

type Props = {
  banners?: Banner[];
  loading?: boolean;
};

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 180;

const DEFAULT_BANNERS = [
  require('../../assets/images/banner.png'),
];

export default function BannerCarousel({
  banners = [],
  loading = false,
}: Props) {

  const images =
    banners.length > 0
      ? banners.map(item => ({
          uri: `${S3_BASE_URL}/${item.mediaURL}`,
        }))
      : DEFAULT_BANNERS;

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

  if (!images.length) return null;

  return (
    <View className="mt-5">
      <Carousel fullWidth images={images} />
    </View>
  );
}