import React from 'react';
import { Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ButtonVariant = 'primary' | 'outline' | 'text' | 'inline';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize; // New size prop
  prefix?: string;
  className?: string;
  disabled?: boolean;
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'medium', // Defaulting to medium
  prefix,
  className = '',
  disabled = false,
}: ButtonProps) {
  
  // Configuration for height and font sizing
  const sizeConfig = {
    small: { height: 36, fontSize: 'text-sm', padding: 'py-1' },
    medium: { height: 48, fontSize: 'text-lg', padding: 'py-2' },
    large: { height: 56, fontSize: 'text-base', padding: 'py-3' },
  };

  const currentSize = sizeConfig[size];
  const baseTextStyles = `text-center font-semibold ${currentSize.fontSize}`;

  /* ---------------- TEXT BUTTON ---------------- */
  if (variant === 'text') {
    return (
      <Pressable onPress={onPress} disabled={disabled} className={currentSize.padding}>
        <Text className={`text-orange-500 font-semibold ${currentSize.fontSize}`}>
          {label}
        </Text>
      </Pressable>
    );
  }

  /* ---------------- INLINE BUTTON ---------------- */
  if (variant === 'inline') {
    return (
      <View className={`flex-row justify-center items-center ${className}`}>
        {prefix && (
          <Text className={`text-gray-700 mr-1 ${currentSize.fontSize}`}>
            {prefix}
          </Text>
        )}
        <Pressable onPress={onPress} disabled={disabled}>
          <Text className={`text-orange-500 font-semibold ${currentSize.fontSize}`}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  /* ---------------- OUTLINE BUTTON ---------------- */
  if (variant === 'outline') {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={{ height: currentSize.height }}
        className={`rounded-xl border border-orange-400 justify-center ${className} ${disabled ? 'opacity-50' : ''}`}
      >
        <Text className={`${baseTextStyles} text-orange-500`}>
          {label}
        </Text>
      </Pressable>
    );
  }

  /* ---------------- PRIMARY BUTTON ---------------- */
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{ height: currentSize.height }}
      className={`rounded-xl overflow-hidden ${className} ${disabled ? 'opacity-50' : ''}`}
    >
      <LinearGradient
        colors={['#FACC15', '#F97316']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="flex-1 justify-center"
      >
        <Text className={`${baseTextStyles} text-white`}>
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}