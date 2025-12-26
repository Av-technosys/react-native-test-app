import React from 'react';
import { Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type ButtonVariant =
  | 'primary'
  | 'outline'
  | 'text'
  | 'inline';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;

  /** inline-only */
  prefix?: string;

  /** style overrides */
  className?: string;
  disabled?: boolean;
};

export default function Button({
  label,
  onPress,
  variant = 'primary',
  prefix,
  className = '',
  disabled = false,
}: ButtonProps) {
  /* ---------------- TEXT BUTTON ---------------- */
  if (variant === 'text') {
    return (
      <Pressable onPress={onPress} disabled={disabled}>
        <Text className="text-orange-500 font-semibold">
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
          <Text className="text-gray-700 mr-1">
            {prefix}
          </Text>
        )}
        <Pressable onPress={onPress} disabled={disabled}>
          <Text className="text-blue-500 font-semibold">
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
        className={`h-14 rounded-full border border-gray-300 justify-center ${className}`}
      >
        <Text className="text-center font-semibold text-lg text-black">
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
      className={`h-14 rounded-full overflow-hidden ${className}`}
    >
      <LinearGradient
        colors={['#FACC15', '#F97316']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className="flex-1 justify-center"
      >
        <Text className="text-center font-bold text-lg text-white">
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
