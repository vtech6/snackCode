import { View, Text, Animated, StyleSheet, SafeAreaView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../../Constants/Colors";
import TextStyles from "../../Constants/TextStyles";
import { screenWidthNoMargins } from "../../Constants/Screen";
import { RunningButton } from "./RunningButton";
import { DraggableButton } from "./DraggableButton";
import { SelectableTiles } from "./SelectableTiles";
import { SmallButton } from "./SmallButton";

export const ButtonsView = ({ navigation }) => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const runningButton = useRef(new Animated.Value(0)).current;
  const animateButton = (jumpPosition) =>
    Animated.timing(runningButton, {
      toValue: jumpPosition,
      duration: 180,
      useNativeDriver: false,
    }).start();
  const animateTitle = (opacity) =>
    Animated.timing(animatedOpacity, {
      toValue: opacity,
      duration: 180,
      useNativeDriver: false,
    }).start();
  useEffect(() => {
    setTimeout(() => animateTitle(1), 500);
  }, []);
  const [resetRunningButton, setResetRunningButton] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.background, StyleSheet.absoluteFill]} />
      <Animated.View
        style={[
          {
            opacity: animatedOpacity,
          },
          styles.contentContainer,
        ]}
      >
        <Text style={[TextStyles.Header1, { marginBottom: 16 }]}>
          Look at the buttons below
        </Text>
        <Text style={TextStyles.Header3}>Play with them to your liking :)</Text>

        <RunningButton
          reset={resetRunningButton}
          setReset={setResetRunningButton}
        />
        <DraggableButton />
        <SelectableTiles />
      </Animated.View>

      <Animated.View
        style={[
          {
            opacity: animatedOpacity,
          },
          styles.buttonContainer,
        ]}
      >
        <SmallButton
          type={0}
          text={"Back"}
          toExecute={() => navigation.goBack()}
        />
        <SmallButton
          type={1}
          text={"Next"}
          toExecute={() =>
            alert(
              "That's it for now. Thank you for checking out this small snack."
            )
          }
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  background: {
    backgroundColor: "#9d09dd",
  },
  title: { color: Colors.white },
  contentContainer: {
    marginTop: 16,
    width: screenWidthNoMargins,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidthNoMargins,
    position: "absolute",
    bottom: 30,
  },
});
