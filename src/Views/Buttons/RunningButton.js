import React, { useEffect, useRef, useState } from "react";
import { View, Pressable, Text, Animated } from "react-native";
import { Colors } from "../../Constants/Colors";
import { screenWidthNoMargins } from "../../Constants/Screen";
import TextStyles from "../../Constants/TextStyles";
import { triggerHaptics } from "../../Functions/Functions";

export const RunningButton = ({ reset, setReset }) => {
  const buttonDiameter = 50;
  const xCentered = screenWidthNoMargins / 2 - buttonDiameter / 2;
  const buttonX = useRef(new Animated.Value(xCentered)).current;
  const buttonY = useRef(new Animated.Value(0)).current;

  const [xPosition, setXPosition] = useState(
    screenWidthNoMargins / 2 - buttonDiameter / 2
  );
  const [yPosition, setYPosition] = useState(0);
  const animateButton = async () => {
    const toX = await generateRandomX(xPosition);
    const toY = generateRandomY();
    if (toX) {
      Animated.timing(buttonX, {
        toValue: reset == true ? xCentered : toX,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(buttonY, {
        toValue: reset == true ? 0 : toY,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
    triggerHaptics();
  };
  const generateRandomX = (xPosition) => {
    var newX = xPosition;
    while (newX == xPosition) {
      var c = Math.floor(
        Math.random() * (screenWidthNoMargins - buttonDiameter / 2)
      );
      if (
        ((c - xPosition > buttonDiameter &&
          c - xPosition < buttonDiameter * 2) ||
          (c - xPosition > -buttonDiameter * 2 &&
            c - xPosition < -buttonDiameter)) &&
        c > 20 &&
        c < screenWidthNoMargins - buttonDiameter * 2
      ) {
        newX = c;
        break;
      }
    }

    setXPosition(newX);
    return newX;
  };
  const generateRandomY = () => {
    var newValue = Math.floor(
      Math.random() * buttonDiameter - buttonDiameter / 2
    );

    return newValue;
  };
  useEffect(() => {
    if (reset == true) {
      animateButton();
      setReset((prev) => !prev);
    }
  }, [reset]);
  return (
    <View
      style={{
        width: screenWidthNoMargins,
        height: 100,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.white,
        justifyContent: "center",
        marginTop: 20,
      }}
    >
      <Pressable
        onPress={() => {
          setReset(true);
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            alignSelf: "center",
            width: "90%",
          }}
        >
          <Text style={[TextStyles.BoxDescription]}>
            Press anywhere in the box to reset the button position.
          </Text>
        </View>
        <View style={{ width: "100%" }}></View>
        <Animated.View
          style={{
            transform: [{ translateX: buttonX }, { translateY: buttonY }],
          }}
        >
          <Pressable
            style={{
              backgroundColor: "#ff5bd3",
              width: buttonDiameter,
              height: buttonDiameter,
              borderRadius: buttonDiameter / 2,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => animateButton()}
          >
            <View style={{ width: "70%" }}>
              <Text style={TextStyles.DotText}>Tap me</Text>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </View>
  );
};
