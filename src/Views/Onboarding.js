import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { triggerHaptics } from "../Functions/Functions";
import TextStyles from "../Constants/TextStyles";
import { screenWidthNoMargins } from "../Constants/Screen";

const screenWidth = Dimensions.get("screen").width;

export const OnboardingView = ({ navigation }) => {
  const TextSegment = ({ text }) => (
    <View style={styles.textContainer}>
      <View style={{ width: screenWidthNoMargins }}>
        <Text style={TextStyles.Header1}>{text}</Text>
      </View>
    </View>
  );
  const ScrollIndicatorSegment = ({ navigation }) => {
    const [shownIndex, setShownIndex] = useState(0);
    useEffect(() => {
      colorAnimation.addListener(({ value }) => {
        const roundedValue = Math.round(value / screenWidth);
        if (roundedValue != shownIndex) {
          setShownIndex(roundedValue);
        }
      });
    });
    useEffect(() => {
      if (shownIndex == 1) {
        setTimeout(() => animateOpacity(1), 1000);
      } else {
        animateOpacity(0);
      }
    }, [shownIndex]);
    const animatedOpacity = useRef(new Animated.Value(0)).current;
    const animateOpacity = (toValue) =>
      Animated.timing(animatedOpacity, {
        toValue: toValue,
        duration: 180,
        useNativeDriver: false,
      }).start();
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          bottom: 50,
        }}
      >
        <View style={styles.scrollIndicatorContainer}>
          {textData.map((_, itemIndex) => (
            <View
              key={itemIndex}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    itemIndex == shownIndex ? "white" : "#c9c1c1",
                },
              ]}
            />
          ))}
        </View>
        <Animated.View style={{ opacity: animatedOpacity }}>
          <Pressable
            style={styles.continueButton}
            onPress={() => {
              triggerHaptics();
              navigation.navigate("Buttons");
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
              Continue
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  };
  const colorAnimation = useRef(new Animated.Value(0)).current;

  const firstColor = colorAnimation.interpolate({
    inputRange: [0, screenWidth],
    outputRange: ["#09bbdd", "#9d09dd"],
  });
  return (
    <Animated.View style={[styles.container, { backgroundColor: firstColor }]}>
      <View style={styles.textContainer}>
        <ScrollView
          style={{ height: "100%" }}
          contentContainerStyle={{ alignItems: "center" }}
          snapToInterval={screenWidth}
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: colorAnimation } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {textData.map((item, key) => (
            <TextSegment text={item} key={key} />
          ))}
        </ScrollView>
      </View>
      <ScrollIndicatorSegment navigation={navigation} />
    </Animated.View>
  );
};
const textData = [
  "Welcome and thank you for taking interest in my portfolio!\n\n This app is meant to serve as a proof of my coding skills. \n\n Swipe to proceed.",
  "I tried to include as many features as possible, but please note that my capabilities go beyond the content of this app. \n\nHopefully it is enough to convince you in regards to my coding :)",
];
const dotDiameter = 10;
const styles = StyleSheet.create({
  background: {
    position: "absolute",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: screenWidth,
    alignItems: "center",
  },

  scrollIndicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 80,
  },
  dot: {
    width: dotDiameter,
    height: dotDiameter,
    borderRadius: dotDiameter / 2,
    marginHorizontal: 6,
  },
  continueButton: {
    height: 48,
    width: 120,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
