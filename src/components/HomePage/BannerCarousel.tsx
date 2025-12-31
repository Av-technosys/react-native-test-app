/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View } from 'react-native';
import Carousel from '../common/Carousel';

type Banner = {
  id: number;
  name: string;
  mediaURL: string;
  priority: number;
};

type Props = {
  banners: Banner[];
};

export default function BannerCarousel({ banners }: Props) {
  // Convert API banners into carousel-compatible images
  const images = banners.map(item => ({
    uri: item.mediaURL,
  }));

  if (!images.length) {
    return null; // or a loader / skeleton
  }

  return (
    <View className="mt-5">
      <Carousel
        fullWidth={true}
        images={images}
      />
    </View>
  );
}
