
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

type IntroScreenProps = {
  onFinish: () => void;
};

export default function IntroScreen({ onFinish }: IntroScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar hidden translucent />

      <LottieView
        source={require('../assets/intro.json')}
        autoPlay
        loop={false}
        resizeMode='cover'
        onAnimationFinish={onFinish}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
