import React from "react";
import { Pressable, Text } from "react-native";
import { Colors } from "../../Constants/Colors";
import { triggerHaptics } from "../../Functions/Functions";

export const SmallButton = ({ type, text = "placeholder", toExecute }) => {
  return (
    <Pressable
      style={{
        height: 40,
        width: 100,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: type == 0 ? Colors.black : Colors.white,
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {
        triggerHaptics();
        toExecute();
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "400",
          color: type == 0 ? Colors.black : Colors.white,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};
