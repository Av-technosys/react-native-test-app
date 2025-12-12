import React from "react";
import { Text, TextInput } from "react-native";

export const applyGlobalFont = () => {
  
  const oldTextRender = (Text as any).render;
  (Text as any).render = function (...args: any[]) {
    const element = oldTextRender.call(this, ...args);
    return React.cloneElement(element, {
      style: [{ fontFamily: "Poppins-Regular" }, element.props.style],
    });
  };

  const oldInputRender = (TextInput as any).render;
  (TextInput as any).render = function (...args: any[]) {
    const element = oldInputRender.call(this, ...args);
    return React.cloneElement(element, {
      style: [{ fontFamily: "Poppins-Regular" }, element.props.style],
    });
  };
};
