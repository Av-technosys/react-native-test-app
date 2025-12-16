import React, { useRef, useState } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type BannerCarouselProps = {
  images: any[];
  height?: number;
  showDots?: boolean;
  fullWidth?: boolean; 

};

export default function BannerCarousel({
  images,
  height = 200,
  showDots = true,
}: BannerCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: any) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollX / width);
    setActiveIndex(index);
  };

  return (
    <View className="mt-4">
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image
              source={item}
              style={{ width, height }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {/* DOT INDICATORS */}
      {showDots && (
        <View className="absolute bottom-3 w-full flex-row justify-center">
          {images.map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-2 w-2 rounded-full ${
                activeIndex === index
                  ? 'bg-orange-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </View>
      )}
    </View>
  );
}
