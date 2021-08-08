import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Pressable, Text } from "react-native";
import { Colors } from "../../Constants/Colors";
import { screenWidthNoMargins } from "../../Constants/Screen";
import TextStyles from "../../Constants/TextStyles";

export const BigButton = ({ ready, text, toExecute, type = 0 }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const animateOpacity = () =>
    Animated.timing(animation, {
      toValue: ready ? 1 : 0.6,
      duration: 100,
      useNativeDriver: false,
    }).start();
  useEffect(() => {
    animateOpacity();
  }, [ready]);
  return (
    <Animated.View
      style={[
        {
          borderColor: type == 0 ? Colors.white : Colors.black,
          opacity: animation,
          backgroundColor: type == 0 ? "transparent" : Colors.black,
        },
        styles.container,
      ]}
    >
      <Pressable
        style={styles.contentAlignment}
        onPress={() => {
          if (ready) {
            toExecute();
          } else {
            alert("No tile selected.");
          }
        }}
      >
        <Text style={TextStyles.ButtonText}>{text}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidthNoMargins,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    marginVertical: 16,
  },
  contentAlignment: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
