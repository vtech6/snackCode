import React from "react";
import { View, Text } from "react-native";
import Modal from "react-native-modal";
import { Colors } from "../../Constants/Colors";
import { screenWidthNoMargins } from "../../Constants/Screen";
import { BigButton } from "../Buttons/BigButton";

export const CustomModalView = ({ presentModal, setPresentModal }) => {
  return (
    <Modal
      isVisible={presentModal}
      onBackdropPress={() => setPresentModal((prev) => !prev)}
      style={{ margin: 0, justifyContent: "flex-end" }}
      swipeDirection={["down"]}
      onSwipeComplete={() => setPresentModal(false)}
      useNativeDriver={false}
      backdropTransitionOutTiming={0}
    >
      <View
        style={{
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          backgroundColor: Colors.white,
          minHeight: "35%",
          alignItems: "center",
        }}
      >
        <View style={{ width: screenWidthNoMargins, alignItems: "center" }}>
          <Text style={{ marginTop: 16, fontSize: 21, fontWeight: "bold" }}>
            This is a modal
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            And here there would usually be some modal content but I can't come
            up with anything for now so this is just placeholder text.
          </Text>
          <Text
            style={{ fontSize: 12, marginVertical: 30, textAlign: "center" }}
          >
            You can dismiss this modal by swiping down, tapping on the
            background or using the button below.
          </Text>
          <BigButton
            ready={true}
            text={"Tap here to dismiss"}
            type={1}
            toExecute={() => setPresentModal((prev) => !prev)}
          />
        </View>
      </View>
    </Modal>
  );
};
