import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/common/Button';
const NoInternetScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRetry = async () => {
    setLoading(true);
    setError('');

    const state = await NetInfo.fetch();

    const isOnline =
      state.isConnected === true &&
      state.isInternetReachable !== false;

    setLoading(false);

    if (!isOnline) {
      setError('Still no internet connection');
    }
  };

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">

      {/* Icon Container */}
      <LinearGradient
        colors={['#FACC15', '#F97316']}
        className="w-28 h-28 rounded-full items-center justify-center mb-6"
      >
        <Icon name="wifi-off" size={60} color="#fff" />
      </LinearGradient>

      {/* Title */}
      <Text className="text-gray-900 text-2xl font-bold mb-2">
        No Internet
      </Text>

      {/* Subtitle */}
      <Text className="text-gray-500 text-center mb-8">
        You’re offline right now.
        Please check your internet connection and try again.
      </Text>

      {/* Retry Button */}
        <Button
      label={loading ? 'Checking...' : 'Reload'}
      variant="paper"
      icon="refresh"
      className="mb-6 w-28 h-10"
      onPress={handleRetry}
      disabled={loading}
      />

     
    </View>
  );
};

export default NoInternetScreen;