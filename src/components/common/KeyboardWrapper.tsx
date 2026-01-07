import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleProp, ViewStyle } from 'react-native';

interface KeyboardWrapperProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const keyboardVerticalOffset: number = Platform.OS === 'ios' ? 40 : 64;

const KeyboardWrapper: React.FC<KeyboardWrapperProps> = ({
  children
}) => {
  return (
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}>

      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardWrapper;
