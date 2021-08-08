import React, { useRef } from "react";
import { Text, Animated, View, PanResponder, StyleSheet } from "react-native";
import { Colors } from "../../Constants/Colors";
import { screenWidthNoMargins } from "../../Constants/Screen";
import TextStyles from "../../Constants/TextStyles";

export const DraggableButton = () => {
  const xPosition = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        xPosition.extractOffset();
      },
      onPanResponderMove: (e, gestureState) => {
        Animated.event([null, { dx: xPosition.x }], {
          useNativeDriver: false,
        })(e, gestureState);
      },
      onPanResponderRelease: () => {
        xPosition.flattenOffset();
        if (xPosition.x._value > screenWidthNoMargins) {
          Animated.timing(xPosition, {
            toValue: screenWidthNoMargins - buttonDiameter - 10,
            duration: 1,
            useNativeDriver: false,
          }).start();
        }
        if (xPosition.x._value < 0) {
          Animated.timing(xPosition, {
            toValue: 0,
            duration: 1,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const buttonDiameter = 50;
  return (
    <View style={styles.sliderContainer} {...panResponder.panHandlers}>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          width: buttonDiameter,
          height: buttonDiameter,
          borderRadius: buttonDiameter / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: xPosition.x.interpolate({
            inputRange: [0, screenWidthNoMargins - buttonDiameter - 10],
            outputRange: ["#f255db", "#ffa415"],
            extrapolate: "clamp",
          }),
          transform: [
            {
              translateX: xPosition.x.interpolate({
                inputRange: [0, screenWidthNoMargins - buttonDiameter - 10],
                outputRange: [0, screenWidthNoMargins - buttonDiameter - 10],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View style={{ width: "70%" }}>
          <Text style={TextStyles.DotText}>Drag me</Text>
        </View>
      </Animated.View>
      <View
        style={{
          width: "90%",
          position: "absolute",
          alignSelf: "center",
          zIndex: -1,
        }}
      >
        <Text style={[{}, TextStyles.BoxDescription]}>
          Swipe your finger across this area to change the dot's color.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    width: screenWidthNoMargins,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 1,
    marginVertical: 16,
    borderColor: Colors.white,
  },
});
