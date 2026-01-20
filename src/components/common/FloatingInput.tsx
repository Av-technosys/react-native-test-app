import React, { forwardRef } from 'react';
import { Text, TextInput, View, Pressable } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const FloatingInput = forwardRef<TextInput, any>(
  (
    {
      label,
      icon,
      value,
      placeholder,
      editable = true,
      onPress,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    return (
      <View className="mb-4">
        <Pressable
          disabled={!onPress}
          onPress={onPress}
        >
          <View className="relative border mt-3 border-orange-400 rounded-xl px-3 pt-3 pb-2">
            <View className="absolute -top-3 left-3 bg-white px-1">
              <Text className="text-mds text-orange-500">
                {label}
              </Text>
            </View>

            <View className="flex-row items-center">
              <TextInput
                ref={ref}
                value={value ?? ''}
                placeholder={placeholder}
                editable={editable}
                onFocus={onFocus}
                onBlur={onBlur}
                textAlignVertical="center"
                style={{ paddingRight: icon ? 40 : 16 }}
                className="flex-1 text-black text-sm pt-2"
                {...props}
              />

              {icon && (
                <Feather
                  name={icon}
                  size={20}
                  color="#F97316"
                />
              )}
            </View>
          </View>
        </Pressable>
      </View>
    );
  }
);

export default FloatingInput;
