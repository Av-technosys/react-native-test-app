/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View, Dimensions } from 'react-native';
import Carousel from '../common/Carousel';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Config from 'react-native-config';

const S3_BASE_URL = Config.AWS_IMAGE_URL;

type Banner = {
  id: number;
  name: string;
  mediaURL: string;
  priority: number;
};

type Props = {
  banners?: Banner[] | null;   // null = not fetched yet
  loading?: boolean;
};

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 180;

const DEFAULT_BANNERS = [
  require('../../assets/images/banner.png'),
];

export default function BannerCarousel({
  banners = null,
  loading,
}: Props) {

 
  if (loading && banners === null) {
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


  const images =
    banners && banners.length > 0
      ? banners.map(item => ({
          uri: `${S3_BASE_URL}/${item.mediaURL}`,
        }))
      : [];


  if (!loading && banners && images.length === 0) {
    return (
      <View className="mt-5">
        <Carousel fullWidth images={DEFAULT_BANNERS} />
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
