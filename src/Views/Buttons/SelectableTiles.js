import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import TextStyles from "../../Constants/TextStyles";
import {
  checkNotificationPermissions,
  triggerHaptics,
} from "../../Functions/Functions";
import { BigButton } from "./BigButton";
import * as Notifications from "expo-notifications";

export const SelectableTiles = () => {
  const [selected, setSelected] = useState();
  const contentArray = [1, 5, 10];
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <Text style={[TextStyles.Header2, { marginBottom: 16 }]}>
        Select preferable time and schedule your notification :)
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {contentArray.map((item, itemIndex) => {
          return (
            <SelectableTile
              key={itemIndex}
              selected={selected}
              setSelected={setSelected}
              content={item}
              tileIndex={itemIndex}
            />
          );
        })}
      </View>
      <BigButton
        ready={selected != undefined}
        text={
          selected != undefined
            ? `Send notification (in ${contentArray[selected]} ${
                selected == 0 ? "second" : "seconds"
              })`
            : "No tile selected."
        }
        toExecute={() => {
          checkNotificationPermissions().then((notificationsAllowed) => {
            if (notificationsAllowed) {
              triggerHaptics();
              Notifications.scheduleNotificationAsync({
                content: {
                  title: "Great job!",
                  body: "Tap here to present modal.",
                  sound: true,
                  vibrate: true,
                  data: {
                    showModal: true,
                  },
                  ios: { sound: true },
                },
                trigger: { seconds: contentArray[selected] },
              });
            } else {
              alert(
                "Please enable notifications from Expo Go in your system settings."
              );
            }
          });
        }}
      />
    </View>
  );
};
const SelectableTile = ({ selected, setSelected, content, tileIndex }) => {
  const animation = useRef(new Animated.Value(0)).current;
  const animateTile = () =>
    Animated.timing(animation, {
      toValue: selected == tileIndex ? 1 : 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
  useEffect(() => {
    animateTile();
  }, [selected == tileIndex]);
  const borderColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "#ff31b6"],
  });
  return (
    <Animated.View
      style={{
        height: 100,
        width: 100,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: borderColor,
        transform: [
          {
            scale: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.9, 1],
            }),
          },
        ],
      }}
    >
      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
        onPress={() => {
          triggerHaptics();

          tileIndex == selected ? setSelected() : setSelected(tileIndex);
        }}
      >
        <Animated.Text style={[TextStyles.Header3, { color: borderColor }]}>
          {content}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};
