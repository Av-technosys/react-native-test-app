import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { TextInput as PaperTextInput, DefaultTheme } from 'react-native-paper';

interface FloatingInputProps {
  label?: string;
  icon?: string;
  value?: string;
  editable?: boolean;
  size?: 'small' | 'medium' | 'large'; // Added size prop
  [key: string]: any;
}


const FloatingInput = forwardRef<any, FloatingInputProps>(
  ({ label, icon, value, editable = true, size = 'medium', style, ...props }: FloatingInputProps, ref) => {
    
    // Configuration based on size prop
    const sizeConfig = {
      small: { height: 36, fontSize: 13, iconMargin: 12, labelSize: 12 },
      medium: { height: 48, fontSize: 15, iconMargin: 6, labelSize: 14 },
      large: { height: 56, fontSize: 16, iconMargin: 0, labelSize: 16 },
    };

    const current = sizeConfig[size];

    return (
      <View style={{ marginBottom: 8 }}>
        <PaperTextInput
          ref={ref}
          mode="outlined"
          label={label}
          value={value ?? ''}
          editable={editable}
          dense={size === 'small'} // Only use dense for the smallest version
          outlineColor="#FB923C"
          activeOutlineColor="#FB923C"
          textColor="#000000"
          placeholderTextColor="#9CA3AF"
          theme={{
            ...DefaultTheme,
            fonts: {
              ...DefaultTheme.fonts,
              bodyLarge: { ...DefaultTheme.fonts.bodyLarge, fontSize: current.labelSize }, 
            },
          }}
          style={[{
            height: current.height,
            backgroundColor: 'white',
            fontSize: current.fontSize,
            textAlignVertical: 'center',
            marginBottom:6
          }, style]}
          outlineStyle={{
            borderRadius: 12,
          }}
          contentStyle={{
            height: current.height,
          }}
          right={
            props.right ? props.right : (icon ? (
              <PaperTextInput.Icon
                icon={icon}
                size={size === 'small' ? 18 : 22}
                color="#F97316"
                style={{ 
                   height: current.height,
                   marginTop: current.iconMargin, // Dynamic centering
                }}
              />
            ) : null)
          }
          {...props}
        />
      </View>
    );
  }
);

export default FloatingInput;