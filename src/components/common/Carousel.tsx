
import React, { useRef, useState } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type BannerCarouselProps = {
  images: any[];
  height?: number;
  showDots?: boolean;
  fullWidth?: boolean; 
  borderRadius?: number;
  itemSpacing?: number; 
};

export default function BannerCarousel({
  images = [],
  height = 200,
  showDots = true,
  fullWidth = true,
  itemSpacing = 16,
  borderRadius = 0
}: BannerCarouselProps) {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  // Guard AFTER hooks
  if (images.length === 0) {
    return <View style={{ height }} />;
  }

  /* FULL WIDTH VERSION  */

if (fullWidth) {
  return (
    <View
      className="mt-4"
      style={{ width: SCREEN_WIDTH, height, position: 'relative' }}
    >
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={e => {
          const scrollX = e.nativeEvent.contentOffset.x;
          const index = Math.round(scrollX / SCREEN_WIDTH);
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{ width: SCREEN_WIDTH, height }}
            resizeMode="cover"
          />
        )}
      />

      {showDots && (
        <View
          style={{
            position: 'absolute',
            bottom: 12,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Dots count={images.length} activeIndex={activeIndex} />
        </View>
      )}
    </View>
  );
}

  /* CARD / MARGIN VERSION (library-based) */
const ITEM_WIDTH = SCREEN_WIDTH - itemSpacing * 2;

return (
  <View style={{ width: SCREEN_WIDTH, marginTop: 16  }}>
    <View style={{ position: 'relative', width: SCREEN_WIDTH }}>
      <Carousel
        width={ITEM_WIDTH}
        height={height}
        data={images}
        loop={false}
        pagingEnabled
        style={{ width: SCREEN_WIDTH }}
        onProgressChange={(_, absoluteProgress) => {
          const index = Math.round(absoluteProgress);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: SCREEN_WIDTH,
              alignItems: 'center',
            }}
          >
            <Image
              source={item}
              style={{
                width: ITEM_WIDTH,
                height,
                borderRadius,
              }}
              resizeMode="cover"
            />
          </View>
        )}
      />

      {showDots && (
        <View
          style={{
            position: 'absolute',
            bottom: 12,
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Dots count={images.length} activeIndex={activeIndex} />
        </View>
      )}
    </View>
  </View>
);


function Dots({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: count }).map((_, index) => (
        <View
          key={index}
          style={{
            marginHorizontal: 4,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor:
              activeIndex === index ? '#F97316' : '#D1D5DB',
          }}
        />
      ))}
    </View>
  );
}}
