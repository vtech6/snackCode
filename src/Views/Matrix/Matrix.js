import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Colors } from "../../Constants/Colors";
import { screenWidthNoMargins } from "../../Constants/Screen";

export const MatrixView = () => {
  const characters = "アイウエオカキクケコサシスセソナニヌネオ";
  const animationDuration = 1000;
  const columnCount = screenWidthNoMargins / 40;
  const [runMatrix, setRunMatrix] = useState(false);

  const scrambleAray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    console.log(`Randomized: ${array}`);
  };
  const generateColumns = () => {
    var columns = [];
    for (var i = 0; i < columnCount; i++) {
      columns.push(i);
    }
    scrambleAray(columns);
    return columns;
  };
  const generateArray = () => {
    const arr = [];
    for (var i = 0; i < characters.length - 1; i++) {
      arr.push(Math.floor(Math.random() * characters.length));
    }
    return arr;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.black,
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      {generateColumns().map((item, columnIndex) => {
        return (
          <View key={columnIndex}>
            {generateArray().map((character, rowIndex) => {
              const timeout = useRef();
              const timer = (item + 1) * 300 + (rowIndex + 1) * 100;
              const generateEffect = (timer) => {
                timeout.current = setTimeout(() => {
                  triggerEffect();
                  generateEffect(animationDuration);
                }, timer);
              };
              const triggerEffect = async (timer) => {
                animateCharacter(1).start(() => animateCharacter(0).start());
              };

              const charIndex = Math.floor(Math.random() * characters.length);
              const textAnimation = useRef(new Animated.Value(0)).current;

              const animateCharacter = (toValue) =>
                Animated.timing(textAnimation, {
                  toValue: runMatrix == undefined ? 0 : toValue,
                  duration: toValue == 1 ? 0 : animationDuration,
                  useNativeDriver: false,
                });
              useEffect(() => {
                if (runMatrix == true) {
                  generateEffect(timer);
                } else {
                  clearTimeout(timeout.current);
                }
              }, [runMatrix]);
              return (
                <Animated.View
                  key={rowIndex}
                  style={{
                    opacity: textAnimation,
                  }}
                >
                  <Text style={{ color: Colors.matrix, fontSize: 44 }}>
                    {characters[charIndex]}
                  </Text>
                </Animated.View>
              );
            })}
          </View>
        );
      })}
      <View style={{ position: "absolute", bottom: 160, flexDirection: "row" }}>
        <MatrixButton
          text={runMatrix ? "Stop" : "Start"}
          toExecute={() => setRunMatrix((prev) => !prev)}
        />
      </View>
    </View>
  );
};

const MatrixButton = ({ text = "Placeholder", toExecute }) => {
  return (
    <Pressable
      style={{
        height: 50,
        borderRadius: 4,
        marginHorizontal: 10,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        borderColor: Colors.matrix,
        borderWidth: 1,
        paddingHorizontal: 10,
      }}
      onPress={() => toExecute && toExecute()}
    >
      <Text style={{ color: Colors.matrix }}>{`${text}`}</Text>
    </Pressable>
  );
};
