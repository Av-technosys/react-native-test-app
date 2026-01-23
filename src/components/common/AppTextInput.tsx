import React from 'react';
import { TextInput } from 'react-native-paper';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  secureTextEntry?: boolean;
 right?: {
    icon: string;
    onPress?: () => void;
  };
};

export default function AppTextInput({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = 'none',
  secureTextEntry,
  right,
}: Props) {
  return (
    <TextInput
      mode="outlined"
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      secureTextEntry={secureTextEntry}
      style={{ height: 56, backgroundColor: 'white' }}
      outlineStyle={{ borderRadius: 16 }}
      outlineColor="#FB923C"
      activeOutlineColor="#FB923C"
      textColor="#000000"
      placeholderTextColor="#6B7280"
      right={right}
    />
  );
}
