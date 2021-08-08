import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { OnboardingView } from "./src/Views/Onboarding";
import { ButtonsView } from "./src/Views/Buttons/ButtonsView";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { addNotificationResponseReceivedListener } from "expo-notifications";
import { CustomModalView } from "./src/Views/CustomModal/CustomModalView";

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const responseListener = useRef();
  const [presentModal, setPresentModal] = useState(false);
  useEffect(() => {
    responseListener.current = addNotificationResponseReceivedListener(
      (response) => {
        if (response) {
          if (response.notification) {
            if (response.notification.request) {
              if (response.notification.request.content) {
                if (response.notification.request.content.data) {
                  if (response.notification.request.content.data.showModal) {
                    setPresentModal(true);
                  }
                }
              }
            }
          }
        }
      }
    );
    return () =>
      Notifications.removeNotificationSubscription(responseListener.current);
  }, []);
  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: "#9d09dd" }}>
        <CustomModalView
          presentModal={presentModal}
          setPresentModal={setPresentModal}
        />
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            component={OnboardingView}
            name="Landing"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            component={ButtonsView}
            name="Buttons"
            options={{ headerShown: false, gestureEnabled: false }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
