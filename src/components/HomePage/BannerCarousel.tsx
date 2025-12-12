/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const data = [
  require('../../assets/images/banner.png'),
  require('../../assets/images/banner.png'),
  require('../../assets/images/banner.png'),
  require('../../assets/images/banner.png'),
];

export default function BannerCarousel() {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef(null);

  const handleScroll = (event: any) => {
    const position = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(position / width);
    setIndex(currentIndex);
  };

  return (
    <View className="mt-5">
      {/* BANNER CAROUSEL */}
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width: width, position: 'relative' }}>
            <Image
              source={item}
              style={{
                width: width,
                height: 200,
              }}
              resizeMode="cover"
            />

            {/* DOT INDICATORS INSIDE IMAGE */}
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                left: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {data.map((_, i) => (
                <View
                  key={i}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 4,
                    backgroundColor: index === i ? '#f97316' : '#d1d5db', // orange-500 vs gray-300
                  }}
                />
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}