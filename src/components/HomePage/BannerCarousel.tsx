/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Carousel from '../common/Carousel';
import { View } from 'react-native';

export default function BannerCarousel() {
  return (
    <View className="mt-5">
      {/* BANNER CAROUSEL */}
      <Carousel
        images={[
          require('../../assets/images/banner.png'),
          require('../../assets/images/banner.png'),
          require('../../assets/images/banner.png'),
          require('../../assets/images/banner.png'),
        ]}
      />
    </View>
  );
}
