import React, { forwardRef } from 'react';
import { Text, View, Pressable } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';

const FloatingInput = forwardRef<any, any>(
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
      keyboardType,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    return (
      <View className="mb-4">
        <Pressable disabled={!onPress} onPress={onPress}>
          <View className="relative">
            {/* Floating Label */}
            <View className="absolute -top-2 left-4 z-10 bg-white px-1">
              <Text className="text-sm text-orange-500 font-medium">
                {label}
              </Text>
            </View>

            <PaperTextInput
              ref={ref}
              mode="outlined"
              value={value ?? ''}
              placeholder={placeholder}
              editable={editable}
              onFocus={onFocus}
              onBlur={onBlur}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              style={{
                height: 64,
                backgroundColor: 'white',
              }}
              outlineStyle={{
                borderRadius: 16,
              }}
              outlineColor="#FB923C"
              activeOutlineColor="#FB923C"
              textColor="#000000"
              placeholderTextColor="#6B7280"
              right={
                icon
                  ? {
                      icon: () => (
                        <Feather
                          name={icon}
                          size={20}
                          color="#F97316"
                        />
                      ),
                    }
                  : undefined
              }
              {...props}
            />
          </View>
        </Pressable>
      </View>
    );
  }
);

export default FloatingInput;
