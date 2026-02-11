import { Text, TextInput, TextStyle } from 'react-native';

type TextComponentWithDefault = typeof Text & {
  defaultProps?: {
    style?: TextStyle | TextStyle[];
  };
};

type TextInputComponentWithDefault = typeof TextInput & {
  defaultProps?: {
    style?: TextStyle | TextStyle[];
  };
};

export default function applyGlobalFont() {
  const defaultFont = 'SpaceMono-Regular';

  const TextWithDefaults :any = Text as TextComponentWithDefault;
  const TextInputWithDefaults :any = TextInput as TextInputComponentWithDefault;

  // TEXT
  TextWithDefaults.defaultProps = TextWithDefaults.defaultProps || {};
  TextWithDefaults.defaultProps.style = [
    { fontFamily: defaultFont },
    TextWithDefaults.defaultProps.style,
  ];

  // TEXT INPUT
  TextInputWithDefaults.defaultProps =
    TextInputWithDefaults.defaultProps || {};
  TextInputWithDefaults.defaultProps.style = [
    { fontFamily: defaultFont },
    TextInputWithDefaults.defaultProps.style,
  ];
}
